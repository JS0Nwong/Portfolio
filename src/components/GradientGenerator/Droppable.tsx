import * as React from "react";
import { useDroppable } from "@dnd-kit/core";

interface DroppableProps {
  children: React.ReactNode;
  id: string;
}

export default function Droppable(props: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {};
  return (
      <div
        className="relative h-96 w-full bg-neutral-900/40 rounded-lg p-2 max-h-full overflow-auto justify-between flex flex-col"
        ref={setNodeRef}
        style={style}
        id="colors-selector"
      >
        {props.children}
      </div>
  );
}
