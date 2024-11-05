import { InterpolationMode } from "chroma-js";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

import ColorInput from "@/components/GradientGenerator/ColorInput";
import AnglePicker from "@/components/GradientGenerator/AnglePicker";
import EasingPicker from "@/components/GradientGenerator/EasingPicker";
import ToolTip from "@/components/ToolTip";
import ColorPalette from "./ColorPalette";
import { ToolbarProps } from "@/lib/types";

export default function Toolbar({
  colors,
  gradientTypes,
  gradientType,
  precision,
  angle,
  x,
  y,
  easingCurves,
  colorTypes,
  interpolationDistance,
  grain,
  baseFrequency,
  setGradientType,
  setInterpolation,
  setHueInterpolation,
  setPrecision,
  setAngle,
  setX,
  setY,
  setColors,
  handleColorChange,
  removeColor,
  addColor,
  setGrain,
  setBaseFrequency,
}: ToolbarProps) {
  return (
    <div className="grid grid-cols-1 gap-6 max-w-sm h-full overflow-y-auto no-scrollbar pr-4 max-h-full">
      {/* COLORS */}
      <div className="flex flex-col gap-2">
        <Label
          className="font-semibold text-neutral-800 dark:text-neutral-100"
          htmlFor="colors-selector"
        >
          Colors
        </Label>
       
        <ColorPalette
          colors={colors}
          setColors={(value) => setColors(value as string[])}
          addColor={addColor} 
          removeColor={removeColor}
        />
      </div>

      {/* GRADIENT TYPE */}
      <div className="flex flex-col gap-2 ">
        <Label
          className="font-semibold text-neutral-800 dark:text-primary"
          htmlFor="gradient-type"
        >
          Gradient Type
        </Label>
        <RadioGroup
          defaultValue={gradientTypes[0]}
          className="flex"
          id={"gradient-type"}
          onValueChange={(value) => setGradientType(value)}
        >
          {gradientTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2 w-full">
              <RadioGroupItem
                value={type}
                className="text-sm font-medium w-full h-8 border-2 border-neutral-200 dark:border-zinc-800 rounded-md inline-flex items-center justify-center hover:border-neutral-300 dark:hover:border-zinc-700"
                id={type}
              >
                {type.toUpperCase()}
              </RadioGroupItem>
              <Label htmlFor={type} className="sr-only">
                {type}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* POSITION SLIDERS */}
      {(gradientType === "radial" || gradientType === "conic") && (
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-col gap-4">
            <Label
              className="font-semibold text-neutral-800 dark:text-neutral-100 flex justify-between"
              htmlFor="x-position"
            >
              <span>X Position</span>
              <span className="text-neutral-300 dark:text-neutral-500">
                {x}%
              </span>
            </Label>
            <Slider
              defaultValue={[x]}
              min={-20}
              max={120}
              step={5}
              id="x-position"
              onValueChange={(e) => setX(e[0])}
            />
          </div>

          <div className="flex flex-col gap-4">
            <Label
              className="font-semibold text-neutral-800 dark:text-neutral-100 flex justify-between"
              htmlFor="y-position"
            >
              <span>Y Position</span>
              <span className="text-neutral-300 dark:text-neutral-500">
                {y}%
              </span>
            </Label>
            <Slider
              defaultValue={[y]}
              min={-20}
              max={120}
              step={5}
              id="y-position"
              onValueChange={(e) => setY(e[0])}
            />
          </div>
        </div>
      )}

      {/* INTERPOLATION MODE */}
      <div className="flex flex-col flex-wrap gap-2">
        <Label
          className=" font-display font-semibold text-neutral-800 dark:text-primary flex items-center gap-2"
          htmlFor="color-type"
        >
          Interpolation Mode
          <ToolTip tooltipText="The color space used to draw the gradient. LCH is visually smoother. HSL and HSV can sometimes be more visually brilliant." />
        </Label>
        <RadioGroup
          defaultValue={colorTypes[1]}
          className="grid grid-cols-5 "
          id={"color-type"}
          onValueChange={(value: InterpolationMode) => setInterpolation(value)}
        >
          {colorTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2 w-full">
              <RadioGroupItem
                value={type}
                className="text-sm font-medium w-16 h-10  border-2 border-neutral-200 dark:border-zinc-800 rounded-md inline-flex items-center justify-center hover:border-neutral-300 dark:hover:border-zinc-700"
                id={type}
              >
                {type.toUpperCase()}
              </RadioGroupItem>
              <Label htmlFor={type} className="sr-only">
                {type}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* INTERPOLATION DISTANCE */}
      <div className="flex flex-col gap-2 ">
        <Label
          className=" font-display font-semibold text-neutral-800 dark:text-primary flex items-center gap-2"
          htmlFor="color-type"
        >
          Interpolation Distance
          <ToolTip tooltipText="Determines which direction around the color wheel the gradient should go." />
        </Label>
        <RadioGroup
          defaultValue={interpolationDistance[1]}
          className="flex"
          id={"color-type"}
          onValueChange={(
            value: "shorter" | "longer" | "increasing" | "decreasing"
          ) => setHueInterpolation(value)}
        >
          {interpolationDistance.map((type) => (
            <div key={type} className="flex items-center space-x-2 w-full">
              <RadioGroupItem
                value={type}
                className="text-xs font-medium w-full h-8 border-2 border-neutral-200 dark:border-zinc-800 rounded-md inline-flex items-center justify-center hover:border-neutral-300 dark:hover:border-zinc-700"
                id={type}
              >
                {type.toUpperCase()}
              </RadioGroupItem>
              <Label htmlFor={type} className="sr-only">
                {type}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* PRECISION SLIDER*/}
      <div className="flex flex-col gap-4">
        <Label
          className="font-semibold text-neutral-800 dark:text-neutral-100 flex justify-between"
          htmlFor="precison"
        >
          <div className="flex items-center gap-2">
            <span>Precision</span>
            <ToolTip tooltipText="The number of in-between colors used to generate the gradient. The higher the number the more visually smooth it will be." />
          </div>
          <span className="text-neutral-300 dark:text-neutral-500">
            {precision}
          </span>
        </Label>
        <Slider
          defaultValue={[precision]}
          max={20}
          step={1}
          id="precision"
          onValueChange={(e) => setPrecision(e[0])}
        />
      </div>

      {/* ANGLE PICKER */}
      <div className="flex justify-between gap-2 ">
        <div className="flex flex-col gap-2 w-full">
          <Label
            className="font-semibold text-neutral-800 dark:text-neutral-100 flex justify-between"
            htmlFor="angle"
          >
            <span>Angle</span>
            <span className="text-neutral-300 dark:text-neutral-500">
              {angle}°
            </span>
          </Label>
          <AnglePicker
            defaultValue={angle}
            onAngleChange={(value) => setAngle(value)}
          />
        </div>
      </div>

      {/* EASING CURVE */}
      <div className="flex justify-between ">
        <div className="flex flex-col gap-2 w-full">
          <Label
            className="font-semibold text-neutral-800 dark:text-neutral-100 flex justify-between"
            htmlFor="easing"
          >
            <span>Easing Curve</span>
            <span className="text-neutral-300 dark:text-neutral-500">
              {angle}°
            </span>
          </Label>
          <EasingPicker />
          <div className="flex flex-col gap-2">
            <RadioGroup
              defaultValue={easingCurves[1]}
              className="flex"
              id={"gradient-type"}
              onValueChange={(value) => setGradientType(value)}
            >
              {easingCurves.map((type) => (
                <div key={type} className="flex items-center space-x-2 w-full">
                  <RadioGroupItem
                    value={type}
                    className="text-sm font-medium w-full h-8 border-2 border-neutral-200 dark:border-zinc-800 rounded-md inline-flex items-center justify-center hover:border-neutral-300 dark:hover:border-zinc-700"
                    id={type}
                  >
                    {type.toUpperCase()}
                  </RadioGroupItem>
                  <Label htmlFor={type} className="sr-only">
                    {type}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>

      {/* GRAIN SLIDER*/}
      <div className="flex flex-col gap-4">
        <Label
          className="font-semibold text-neutral-800 dark:text-neutral-100 flex justify-between"
          htmlFor="precison"
        >
          <div className="flex items-center gap-2">
            <span>Grain</span>
          </div>
          <span className="text-neutral-300 dark:text-neutral-500">
            {grain}
          </span>
        </Label>
        <Slider
          defaultValue={[grain]}
          max={10}
          step={1}
          id="precision"
          onValueChange={(e) => setGrain(e[0])}
        />
      </div>

      <div className="flex flex-col gap-4">
        <Label
          className="font-semibold text-neutral-800 dark:text-neutral-100 flex justify-between"
          htmlFor="precison"
        >
          <div className="flex items-center gap-2">
            <span>Frequency</span>
          </div>
          <span className="text-neutral-300 dark:text-neutral-500">
            {baseFrequency}
          </span>
        </Label>
        <Slider
          defaultValue={[baseFrequency]}
          max={1}
          step={0.01}
          id="precision"
          onValueChange={(e) => setBaseFrequency(e[0])}
        />
      </div>
    </div>
  );
}
