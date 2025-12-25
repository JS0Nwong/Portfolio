import { HexColorInput, RgbaStringColorPicker, HslaStringColorPicker } from "react-colorful";
import { Input } from "@/components/ui/input";  
import React from "react";
import chroma from "chroma-js";

interface ColorInputProps {
  defaultValue: string;
  handleColorChange?: (value: string, index?: number | undefined) => void;
  index?: number;
  setMeshBackground?: (value: string) => void;
  presetColors: string[];
}

export const ColorInput = React.memo(
  ({
    defaultValue,
    handleColorChange,
    setMeshBackground,
    index,
    presetColors,
  }: ColorInputProps) => {
    const [color, setColor] = React.useState<string>(defaultValue);
    const handleChange = (color: string) => {
      const convertedColor = chroma(color).css("hsla");
      if (handleColorChange) {
        handleColorChange(convertedColor, index);
      } else if (setMeshBackground) {
        setMeshBackground(convertedColor);
      }
    };

    return (
      <div className="h-full group custom-layout ">
        <HslaStringColorPicker
          color={chroma(color).css("hsla")}
          onChange={handleChange}
        />
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center w-full gap-4">
            <label
              htmlFor="hex-color-input"
              className="text-xs leading-4 ml-4 text-neutral-500 font-semibold select-none"
            >
              Value
            </label>
            <Input
              type="text"
              value={chroma(color).css("hsla")}
              onChange={(e) => handleChange(e.target.value)}
              id="hex-color-input"
              placeholder="Type a color"
              className="w-full flex h-8 my-1 rounded-md border border-input bg-transparent px-2 py-3 text-xs font-medium shadow-sm transition-colors placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="flex flex-grow w-full h-full px-4">
            {presetColors.map((presetColor) => (
              <button
                key={presetColor}
                className="w-5 h-5 rounded-sm m-1 p-0 cursor-pointer outline-none border dark:border-zinc-600 border-zinc-400"
                style={{ background: presetColor }}
                onClick={() => handleChange(presetColor)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
);
