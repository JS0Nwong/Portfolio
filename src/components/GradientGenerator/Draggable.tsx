import { RxDragHandleDots1 } from "react-icons/rx";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface DraggableProps {
  children: React.ReactNode;
  id: string;
}

export default function Draggable(props: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.id,
    });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition
  };

  return (
    <div
      className="rounded-md bg-neutral-800/50 p-2 my-1 h-10 first:mt-0 flex items-center gap-2 "
      ref={setNodeRef}
      style={style}
    >
      <RxDragHandleDots1
        className="size-4 text-zinc-500 cursor-grab active:cursor-grabbing focus:outline-none focus:bg-background/10 rounded h-full"
        {...listeners}
        {...attributes}
      />
      {props.children}
    </div>
  );
}
