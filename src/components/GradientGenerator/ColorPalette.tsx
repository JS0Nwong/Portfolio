import chroma from "chroma-js";
import { useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  KeyboardSensor,
  TouchSensor,
  PointerSensor,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToFirstScrollableAncestor } from "@dnd-kit/modifiers";
import { Video, Plus, Image, Lock } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import Draggable from "./Draggable";
import { Button } from "@/components/ui/button";
import ToolTip from "@/components/ToolTip";
import { ColorPaletteProps } from "@/lib/types";
import { ColorInput } from "./ColorInput";

export default function ColorPalette({
  colors,
  meshBackground,
  isAnimated,
  setColors,
  removeColor,
  handleColorChange,
  setMeshBackground,
  lockColor,
  hideColor,
  addColor,
  toggleAnimation,
}: ColorPaletteProps): JSX.Element {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const [open, setOpen] = useState(Array((colors || []).length).fill(false));
  const [openMesh, setOpenMesh] = useState(false);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const handleOpenChange = (index: number, isOpen: boolean) => {
    setOpen((prevOpen) => {
      const newOpen = [...prevOpen];
      newOpen[index] = isOpen;
      return newOpen;
    });
  };
  const presetColors = [
    "#FFEF11",
    "#FF7E14",
    "#FF1727",
    "#FF05D1",
    "#6302FF",
    "#0066F5",
    "#00AEE9",
    "#00D5E9",
    "#00EFBB",
    "#05FF1E",
    "#212529",
    "#495057",
    "#ADB5BD",
    "#DEE2E6",
    "#F8F9FA",
  ];

  return (
    <DndContext
      sensors={sensors}
      modifiers={[restrictToFirstScrollableAncestor]}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCenter}
      onDragStart={({ active }) => {
        if (!active) {
          return;
        }
        setActiveId(active.id);
      }}
    >
      <SortableContext
        items={(colors || []).map((color) => color.color)}
        strategy={rectSortingStrategy}
      >
        <ul
          id="colors-selector"
          className="flex flex-col h-full max-h-fit overflow-auto no-scrollbar relative"
        >
          {!!meshBackground && (
            <li key="mesh-bg">
              <Collapsible open={openMesh} onOpenChange={setOpenMesh}>
                <CollapsibleTrigger asChild>
                  <div className="touch-none p-1 h-12 flex items-center gap-2 border-b">
                    <div className="flex items-center justify-between w-full group cursor-pointer">
                      <div className="flex flex-row gap-2 items-center ">
                        <div
                          className="size-6 rounded ml-10"
                          style={{ backgroundColor: meshBackground }}
                        />
                        <span className="font-semibold text-xs">
                          {chroma(meshBackground).css("hsla")}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-row">
                      <ToolTip
                        asChild={true}
                        showInfoIcon={false}
                        tooltipText="Lock color"
                      >
                        <Button variant="ghost" className="h-8 w-8 flex">
                          <Lock
                            size={16}
                            strokeWidth={2.25}
                            className=" text-neutral-600 dark:text-neutral-500"
                          />
                        </Button>
                      </ToolTip>
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="bg-zinc-100 dark:bg-zinc-900 p-2 w-full border-b">
                  <ColorInput
                    defaultValue={meshBackground}
                    setMeshBackground={setMeshBackground}
                    presetColors={presetColors}
                  />
                </CollapsibleContent>
              </Collapsible>
            </li>
          )}
          {colors.map((color, index) => (
            <li key={color.color}>
              <Collapsible
                open={open[index]}
                onOpenChange={() => handleOpenChange(index, !open[index])}
              >
                <Draggable
                  id={color.color}
                  isDisabled={colors?.length === 1}
                  removeColor={removeColor}
                  defaultValue={color.color}
                  index={index}
                  isLocked={color.isLocked}
                  isHidden={color.isHidden}
                  lockColor={lockColor}
                  hideColor={hideColor}
                >
                  <CollapsibleTrigger asChild>
                    <div className="flex items-center justify-between w-full group cursor-pointer">
                      <div className="flex flex-row gap-2 items-center relative z-[2]">
                        <div
                          className={`size-6 rounded transition-transform  group-hover:after:content-[''] group-hover:after:rounded group-hover:after:size-6 group-hover:after:bg-inherit group-hover:after:absolute group-hover:after:scale-125 group-hover:after:opacity-40 group-hover:after:-z-10`}
                          style={{ backgroundColor: color.color }}
                        />
                        <span className="font-semibold text-xs select-none">
                          {chroma(color.color).css("hsla")}
                        </span>
                      </div>
                    </div>
                  </CollapsibleTrigger>
                </Draggable>
                <CollapsibleContent className="bg-zinc-100 dark:bg-zinc-900 p-2 w-full border-b">
                  <ColorInput
                    defaultValue={color.color}
                    handleColorChange={(value: string) =>
                      handleColorChange(index, value)
                    }
                    index={index}
                    presetColors={presetColors}
                  />
                </CollapsibleContent>
              </Collapsible>
            </li>
          ))}
          <div className="flex justify-end items-center">
            {!!meshBackground && (
              <Button
                variant="secondary"
                onClick={toggleAnimation}
                className="my-2 mx-0"
              >
                {isAnimated ? (
                  <Image
                    size={12}
                    strokeWidth={2.25}
                    className=" text-neutral-400 "
                  />
                ) : (
                  <Video
                    size={12}
                    strokeWidth={2.25}
                    className=" text-neutral-400 "
                  />
                )}
                <span className="text-neutral-600 dark:text-neutral-400 text-xs">
                  {isAnimated ? "Staticize" : "Animate"}
                </span>
              </Button>
            )}
            <Button
              variant="secondary"
              onClick={addColor}
              className="my-2 mr-2 ml-1.5"
            >
              <Plus
                size={12}
                strokeWidth={2.25}
                className=" text-neutral-400 "
              />
              <span className="text-neutral-600 dark:text-neutral-400  text-xs">
                Add color
              </span>
            </Button>
          </div>
        </ul>
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = colors?.findIndex((item) => item.color === active.id);
      const newIndex = colors?.findIndex((item) => item.color === over.id);
      setColors(arrayMove(colors || [], oldIndex || 0, newIndex || 0));
    }
  }
}
