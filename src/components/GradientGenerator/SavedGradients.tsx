import useLocalStorage from "@/hooks/use-localstorage";
import { Button } from "@/components/ui/button";
import { RxCross2 } from "react-icons/rx";
import { Label } from "@radix-ui/react-label";
import { Schema } from "@/lib/types";
import GradientCard from "./GradientCard";

export default function SavedGradients({
  setIsOpen,
  favoriteRef,
  setGradient,
}: {
  setIsOpen: (value: boolean) => void;
  favoriteRef: React.RefObject<HTMLDivElement>;
  setGradient: (value: Schema) => void;
}) {
  const [savedGradients, setSavedGradients] = useLocalStorage({
    defaultValue: [],
    key: "saved-gradients",
  });

  const removeSavedGradient = (index: number) => {
    setSavedGradients((prev: Schema[]) =>
      prev.filter((_, i: number) => i !== index)
    );
  };

  const setSavedAsCurrent = (index: number) => {
    setGradient(savedGradients[index]);
  };

  return (
    <div
      ref={favoriteRef}
      className="flex flex-col gap-6 p-3 md:max-w-md h-full w-full min-w-[28rem] overflow-y-auto no-scrollbar border border-px rounded-md"
    >
      <div className="flex flex-col gap-4">
        <div className="flex w-full justify-between items-center gap-2">
          <Label
            className="font-semibold text-neutral-800 dark:text-neutral-100 text-sm leading-none"
            htmlFor="saved-selector"
          >
            <span>Favorites</span>
          </Label>
          <Button
            variant="ghost"
            className="h-0 w-0 hover:bg-transparent"
            onClick={() => setIsOpen(false)}
          >
            <RxCross2 />
          </Button>
        </div>
        <span className="text-xs text-neutral-400">
          Favorited gradients are stored in your local storage so they're pretty
          volatile, you can either clear them singularly from here or by block
          removing data from your browser local storage settings.
        </span>
      </div>

      <div className="flex flex-col gap-2" id="saved-selector">
        {savedGradients.length === 0 ? (
          <p className="font-semibold text-sm text-neutral-500">
            No gradients saved yet
          </p>
        ) : (
          savedGradients.map((gradient: Schema, index: number) => (
            <GradientCard
              key={index}
              gradient={gradient}
              onRemove={() => removeSavedGradient(index)}
              onSelect={() => setSavedAsCurrent(index)}
            />
          ))
        )}
      </div>
    </div>
  );
}
