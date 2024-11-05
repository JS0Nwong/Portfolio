import { Input } from "@/components/ui/input";
import { RxPlus, RxCross1 } from "react-icons/rx";

interface ColorInputProps {
  defaultValue?: string;
  handleColorChange: (value: string) => void;
  removeColor: () => void;  
  disabled?: boolean;
}

export default function ColorInput(props: ColorInputProps) {
  return (
    <div className="relative w-full h-full group ">
      {!props.disabled && (
        <Input
          type="color"
          disabled={props.disabled}
          defaultValue={props.defaultValue}
          onChange={(e) => props.handleColorChange(e.target.value)}
          className="aspect-square border-2 border-neutral-200 dark:border-zinc-800 w-full h-full block cursor-pointer disabled:opacity-50 disabled:border-none disabled:pointer-events-none hover:border-neutral-300 dark:hover:border-zinc-700"
        />
      )}
      {!props.defaultValue && !props.disabled && (
        <RxPlus className="select-none pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-5 " />
      )}
    </div>
  );
}
