import * as React from "react";
import chroma from "chroma-js";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { RxCross2, RxPlus } from "react-icons/rx";
import { MdUndo, MdRedo, MdAdd  } from "react-icons/md";
import { restrictToFirstScrollableAncestor } from "@dnd-kit/modifiers";
import Draggable from "./Draggable";
import Droppable from "./Droppable";

import { Button } from "@/components/ui/button";
import useHistory from "@/hooks/use-history";

interface ColorPaletteProps {
  colors: string[];
  setColors: (value: string[] | ((prevColors: string[]) => string[])) => void;
  addColor: () => void;
  removeColor: (index: number) => void;
}

export default function ColorPalette({
  colors,
  setColors,
  addColor,
  removeColor,
}: ColorPaletteProps): JSX.Element {
  const [parent, setParent] = React.useState<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const history = useHistory();
  const pop = useHistory().pop;
  const push = useHistory().push;

  return (
    <DndContext
      sensors={sensors}
      modifiers={[restrictToFirstScrollableAncestor]}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCenter}
    >
      <Droppable id="droppable">
        <SortableContext items={colors} strategy={verticalListSortingStrategy}>
          <div>
            {colors.map(
              (color, index) =>
                color && (
                  <Draggable key={color} id={color}>
                    <div className="flex items-center justify-between w-full group cursor-text">
                      <div className="flex flex-row gap-2 items-center ">
                        <div
                          className="size-6 rounded"
                          style={{ backgroundColor: color }}
                        />
                        <span className="font-semibold text-xs">
                          rgb({chroma(color).rgb().join(", ")})
                        </span>
                      </div>
                      {colors.length > 2 && (
                        <Button
                          variant="ghost"
                          className="h-6 w-1 hidden group-hover:flex"
                          onClick={() => removeColor(index)}
                        >
                          <RxCross2 className=" text-zinc-500" />
                        </Button>
                      )}
                    </div>
                  </Draggable>
                )
            )}
          </div>
        </SortableContext>
        <div className="font-semibold flex w-full gap-2 p-1.5 rounded-lg items-center justify-between sticky bottom-0 bg-zinc-900">
          <Button variant="ghost" size='sm'>
            <MdUndo className="text-neutral-400" />{" "}
            <span className="font-semibold">Undo</span>
          </Button>
          <Button variant="ghost" size='sm'>
            <MdRedo className="text-neutral-400" />{" "}
            <span className="font-semibold">Redo</span>
          </Button>
          <Button variant="ghost" size='sm' onClick={addColor}>
            <MdAdd  className="text-neutral-300" />{" "}
            <span className="font-semibold">Add color</span>
          </Button>
        </div>
      </Droppable>
    </DndContext>
  );
  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setColors((items: string[]) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}
