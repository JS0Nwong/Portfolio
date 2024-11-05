import { useState } from "react";
import useLocalStorage from "@/hooks/use-localstorage";
import chroma from "chroma-js";
import Toolbar from "@/components/GradientGenerator/Toolbar";
import Menubar from "@/components/GradientGenerator/Menubar";

export default function GradientGenerator() {
  const colorTypes = [
    "rgb",
    "hsl",
    "hsv",
    "hsi",
    "lab",
    "oklab",
    "lch",
    "oklch",
    "hcl",
    "lrgb",
  ];
  const gradientTypes = ["linear", "radial", "conic"];
  const easingCurves = ["linear", "ease", "fun"];
  const interpolationDistance = [
    "shorter",
    "longer",
    "increasing",
    "decreasing",
  ];

  const [gradientType, setGradientType] = useState<string>("linear");
  const [interpolation, setInterpolation] =
    useState<chroma.InterpolationMode>("lch");
  const [hueInterpolation, setHueInterpolation] = useState<
    "shorter" | "longer" | "increasing" | "decreasing"
  >("shorter");
  const [precision, setPrecision] = useState<number>(8);
  const [angle, setAngle] = useState<number>(45);
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(50);
  const [colors, key, setValue] = useLocalStorage({
    defaultValue: ["#fbc2eb", "#a6c1ee"],
    key: "default-gradient-colors",
  });
  const [grain, setGrain] = useState<number>(0);
  const [baseFrequency, setBaseFrequency] = useState<number>(0);

  const handleColorChange = (index: number, value: string) => {
    setValue((prevColors: string[]) => {
      const newColors = [...prevColors];
      newColors[index] = value;
      return newColors;
    });
  };

  const removeColor = (index: number) => {
    setValue((prevColors: string[]) => {
      const newColors = [...prevColors];
      newColors[index] = "";
      return newColors;
    });
  };

  const addColor = () => {
    const newColor = chroma.random().hex();
    if (chroma(newColor).luminance() >= 0.5) {
      setValue(() => [newColor, ...colors]);
    } else {
      setValue(() => [chroma(newColor).brighten().hex(), ...colors]);
    }
  };

  return (
    <div className="flex flex-col w-full h-dvh max-h-screen overflow-hidden font-geist">
      <Menubar
        gradientType={gradientType}
        angle={angle}
        x={x}
        y={y}
        colors={colors}
        interpolation={interpolation}
        precision={precision}
      />
      <div className="flex flex-1 min-h-0 gap-4 p-4 overflow-hidden relative">
        <div className="flex-1 self-auto w-full h-96 md:h-full p-2 border border-neutral-200 dark:border-zinc-700 rounded-2xl">
          <div
            id="gradient"
            className="block w-full h-full rounded-lg relative"
            style={{
              backgroundImage: `${gradientType}-gradient(${
                gradientType === "linear"
                  ? `${angle}deg, `
                  : gradientType === "radial"
                  ? `circle at ${x}% ${y}%, `
                  : `from ${angle}deg at ${x}% ${y}%, `
              }${chroma.scale(colors).mode(interpolation).colors(precision)}`,
              backgroundColor: "red",
            }}
          >
            <svg
              className="absolute inset-0 w-full h-full rounded-lg pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <filter id="noise">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency={baseFrequency}
                  numOctaves={grain}
                  stitchTiles="stitch"
                  filter="contrast(150%) brightness(250%)"
                />
                {/* <feColorMatrix type="saturate" values="0" /> */}
                {/* <feComponentTransfer>
                  <feFuncA type="linear" slope="1" />
                </feComponentTransfer> */}
              </filter>
              <rect width="100%" height="100%" filter="url(#noise)" />
            </svg>
          </div>
        </div>
        <div className="overflow-hidden">
          <Toolbar
            colors={colors}
            gradientTypes={gradientTypes}
            gradientType={gradientType}
            interpolation={interpolation}
            precision={precision}
            angle={angle}
            x={x}
            y={y}
            easingCurves={easingCurves}
            colorTypes={colorTypes}
            interpolationDistance={interpolationDistance}
            grain={grain}
            baseFrequency={baseFrequency}
            setGradientType={setGradientType}
            setInterpolation={setInterpolation}
            setHueInterpolation={setHueInterpolation}
            setPrecision={setPrecision}
            setAngle={setAngle}
            setX={setX}
            setY={setY}
            setColors={setValue}
            handleColorChange={handleColorChange}
            removeColor={removeColor}
            addColor={addColor}
            setGrain={setGrain}
            setBaseFrequency={setBaseFrequency}
          />
        </div>
      </div>
    </div>
  );
}
