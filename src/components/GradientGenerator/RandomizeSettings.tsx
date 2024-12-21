import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function RandomizeSettings({
  generateRandomGradientWithParams,
}: {
  generateRandomGradientWithParams: (
    hue: number[],
    saturation: number[],
    lightness: number[]
  ) => void;
}) {
  const [hue, setHue] = useState<number[]>([0, 360]);
  const [saturation, setSaturation] = useState<number[]>([0, 100]);
  const [lightness, setLightness] = useState<number[]>([0, 100]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-primary text-primary-foreground shadow hover:bg-primary/90 h-full rounded-r px-2 border-l border-l-primary-foreground/40">
        <ChevronDown size={16} strokeWidth={2.25} className=" " />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={5} className="w-96 h-full">
        <DropdownMenuLabel className="p-2">
          Randomizer Settings
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex flex-col gap-2 p-2">
          <div className="flex gap-2 justify-between w-full">
            <DropdownMenuLabel className="text-neutral-700 dark:text-neutral-300 text-xs w-24">
              Hue
            </DropdownMenuLabel>
            <Slider
              onValueChange={(value) => setHue(value)}
              defaultValue={hue}
              max={360}
              min={0}
              step={1}
              colorProperty="hue"
            />
          </div>
          <div className="flex gap-2 justify-between w-full">
            <DropdownMenuLabel className="text-neutral-700 dark:text-neutral-300 text-xs w-24">
              Saturation
            </DropdownMenuLabel>
            <Slider
              onValueChange={(value) => setSaturation(value)}
              defaultValue={saturation}
              max={100}
              min={0}
              step={1}
              colorProperty="saturation"
            />
          </div>
          <div className="flex gap-2 justify-between w-full">
            <DropdownMenuLabel className="text-neutral-700 dark:text-neutral-300 text-xs w-24">
              Lightness
            </DropdownMenuLabel>
            <Slider
              onValueChange={(value) => setLightness(value)}
              defaultValue={lightness}
              max={100}
              min={0}
              step={1}
              colorProperty="lightness"
            />
          </div>
        </div>
        <DropdownMenuSeparator />
        <div className=" flex w-full p-3 z-30 items-center justify-between">
          <Button
            variant="outline"
            onClick={() => {
              setHue([0, 360]);
              setSaturation([0, 100]);
              setLightness([0, 100]);
            }}
          >
            <span>Reset</span>
          </Button>
          <Button
            onClick={() =>
              generateRandomGradientWithParams(hue, saturation, lightness)
            }
          >
            Randomize
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
