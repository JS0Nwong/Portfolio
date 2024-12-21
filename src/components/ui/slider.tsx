import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

interface ColorSliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  colorProperty?: "hue" | "saturation" | "lightness";
}

const getBackgroundStyle = (colorProperty: string | undefined) => {
  switch (colorProperty) {
    case "hue":
      return "linear-gradient(to right, hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(360, 100%, 50%))";
    case "saturation":
      return `linear-gradient(to right, hsl(0, 0%, 50%), hsl(360, 100%, 50%))`;
    case "lightness":
      return `linear-gradient(to right, hsl(0, 100%, 0%), hsl(360, 100%, 100%))`;
    default:
      return "";
  }
};

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  ColorSliderProps
>(({ className, colorProperty, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track
      style={{ background: getBackgroundStyle(colorProperty) }}
      className="relative h-1 w-full grow overflow-hidden rounded-full bg-primary/20"
    >
      <SliderPrimitive.Range
        className={`absolute h-full  ${
          Array.isArray(props.defaultValue)
            ? "bg-transparent absolute h-full before:content-[''] before:w-[400px] before:h-1 before:absolute before:right-full before:bg-neutral-300 dark:before:bg-neutral-700 after:content-[''] after:w-[400px] after:h-1 after:absolute after:bg-neutral-300 dark:after:bg-neutral-700 after:left-full"
            : "bg-primary"
        }`}
      />
    </SliderPrimitive.Track>
    {props.defaultValue && Array.isArray(props.defaultValue) ? (
      props.defaultValue.map((_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          className={cn(
            "block h-3 w-3 z-10 rounded-full cursor-grab active:cursor-grabbing active:bg-[#5f58ff] focus-visible:bg-[#5f58ff] bg-accent-foreground shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
            index === 0 ? "left-0 " : "right-0 "
          )}
        />
      ))
    ) : (
      <SliderPrimitive.Thumb className="block h-3 w-3 rounded-full cursor-grab active:cursor-grabbing active:bg-[#5f58ff] focus-visible:bg-[#5f58ff] bg-accent-foreground shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
    )}
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
