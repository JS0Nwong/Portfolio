import { createContext, useMemo } from "react";
import {
  RxCross2,
  RxLockOpen2,
  RxLockClosed,
  RxDragHandleDots2,
} from "react-icons/rx";
import { Eye, EyeClosed, X, Lock, LockOpen } from "lucide-react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { DraggableSyntheticListeners } from "@dnd-kit/core";

import ToolTip from "@/components/ToolTip";
import { Button } from "@/components/ui/button";

interface DraggableProps {
  children: React.ReactNode;
  defaultValue: string;
  isDisabled: boolean;
  id: string;
  index: number;
  isLocked: boolean | undefined;
  isHidden: boolean | undefined;
  removeColor: (index: number) => void;
  lockColor: (index: number) => void;
  hideColor: (index: number) => void;
}

interface Context {
  attributes: Record<string, any>;
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
}

const SortableItemContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() {},
});

export default function Draggable({
  defaultValue,
  removeColor,
  lockColor,
  hideColor,
  isLocked,
  isHidden,
  ...props
}: DraggableProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
  } = useSortable({
    id: props.id,
    transition: {
      duration: 150,
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    },
  });

  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef]
  );

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <SortableItemContext.Provider value={context}>
      <div
        className="touch-none p-1 h-14 flex items-center gap-2 border-b "
        ref={setNodeRef}
        style={style}
      >
        <Button
          ref={setActivatorNodeRef}
          variant="ghost"
          className="h-8 w-8 cursor-row-resize"
          {...listeners}
          {...attributes}
        >
          <RxDragHandleDots2 className="size-4 text-zinc-500 focus:outline-none focus:bg-background/10 rounded h-full" />
        </Button>
        <div className="flex items-center justify-between w-full group cursor-pointer">
          {props.children}
          <div className="flex flex-row gap-1">
            <ToolTip
              asChild={true}
              showInfoIcon={false}
              tooltipText="Lock color"
            >
              <Button
                variant="ghost"
                className={`h-8 w-8 flex ${isLocked ? "bg-zinc-200/70 dark:bg-accent" : ""}`}
                onClick={() => lockColor(props.index)}
              >
                {isLocked ? (
                  <Lock
                    size={16}
                    strokeWidth={2.25}
                    className=" text-neutral-500"
                  />
                ) : (
                  <LockOpen
                    size={16}
                    strokeWidth={2.25}
                    className=" text-neutral-500 "
                  />
                )}
              </Button>
            </ToolTip>

            <ToolTip
              asChild={true}
              showInfoIcon={false}
              tooltipText="Hide color"
            >
              <Button
                variant="ghost"
                className={`h-8 w-8 flex ${isHidden ? "bg-zinc-200/70 dark:bg-accent" : ""}`}
                onClick={() => hideColor(props.index)}
              >
                {isHidden ? (
                  <EyeClosed
                    size={16}
                    strokeWidth={2.25}
                    className=" text-neutral-500"
                  />
                ) : (
                  <Eye
                    size={16}
                    strokeWidth={2.25}
                    className=" text-neutral-500"
                  />
                )}
              </Button>
            </ToolTip>
            <Button
              variant="ghost"
              disabled={props.isDisabled}
              className="h-8 w-8 flex hover:bg-red-500/75 text-zinc-500"
              onClick={() => removeColor(props.index)}
            >
              <X size={16} strokeWidth={2.25} className=" text-neutral-500" />
            </Button>
          </div>
        </div>
      </div>
    </SortableItemContext.Provider>
  );
}
