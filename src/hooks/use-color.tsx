import chroma from "chroma-js";
import useHistoryWithLocalStorage from "@/hooks/use-historywithlocalstorage";
import { Schema, Color } from "@/lib/types";

export default function useColor() {
  const initialSchema : Schema = {
    bgColor: "hsl(341, 79%, 95%)",
    gradientType: "linear",
    interpolation: "lch",
    interpolationDistance: "shorter",
    precision: 8,
    grain: 0,
    angle: 45,
    easing: "linear",
    colors: [
      {
        color: chroma("#981f7a").css('hsl'),
        pos: {
          x: 20,
          y: 30,
        },
      },
      {
        color: chroma("#987e9e").css('hsl'),
        pos: {
          x: 50,
          y: 50,
        },
      },
      {
        color: chroma("#98ddc1").css('hsl'),
        pos: {
          x: 80,
          y: 40,
        },
      },
    ],
    x: 50,
    y: 50,
  };

  const randomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const {
    state: schema,
    set: setSchema,
    undo,
    redo,
    clear,
    canUndo,
    canRedo,
  } = useHistoryWithLocalStorage<Schema>("schema", initialSchema) as {
    state: Schema;
    set: (value: Schema) => void;
    undo: () => void;
    redo: () => void;
    clear: () => void;
    canUndo: boolean;
    canRedo: boolean;
  };
    
  const handleColorChange = (index: number, value: string) => {
    setSchema({
      ...schema,
      colors: schema.colors.map((color: Color, i: number) =>
        i === index ? { ...color, color: chroma(value).css('hsla') } : color
      ),
    });
  };

  const removeColor = (index: number) => {
    setSchema({
      ...schema,
      colors: schema.colors.filter((_, i) => i !== index),
    });
  };

  const addColor = () => {
    const newColor = chroma.random().css('hsl');
    const brightenColor = chroma(newColor).luminance() <= 0.5 ? newColor : chroma(newColor).brighten().css('hsl');
    
    setSchema({
      ...schema,
      colors: [
        {
          color: brightenColor,
          pos: {
            x: Math.floor(Math.random() * 100),
            y: Math.floor(Math.random() * 100),
          },
        },
        ...schema.colors,
      ],
    });
  };

  const generateRandomGradient = () => {
    const c1 = chroma.random();
    const c2 = chroma.random();
    const newColors = chroma
      .scale([c1, c2])
      .colors(schema.colors.length)
      .map((color) => chroma(color).css("hsl"));

    setSchema({
      ...schema,
      bgColor: chroma.random().css("hsl"),
      colors: schema.colors.map((color: Color, i: number) => {
        if (!color.isLocked) {
          return {
            ...color,
            color: newColors[i],
            pos: {
              x: color.pos.x,
              y: color.pos.y,
            },
          };
        }
        return color;
      }),
    });
  };

  const generateRandomGradientWithParams = (
    hueRange: number[],
    saturationRange: number[],
    lightnessRange: number[]
  ) => {
    const h1 = randomNumber(hueRange[0], hueRange[1]);
    const h2 = randomNumber(hueRange[0], hueRange[1]);

    const s1 = randomNumber(saturationRange[0], saturationRange[1]) * 0.01;
    const s2 = randomNumber(saturationRange[0], saturationRange[1]) * 0.01;

    const l1 = randomNumber(lightnessRange[0], lightnessRange[1]) * 0.01;
    const l2 = randomNumber(lightnessRange[0], lightnessRange[1]) * 0.01;

    const c1 = chroma.hsl(h1, s1, l1);
    const c2 = chroma.hsl(h2, s2, l2);

    const newColors = chroma.scale([c1, c2]).colors(schema.colors.length).map((color) => chroma(color).css('hsl'));

    setSchema({
      ...schema,
      bgColor: chroma.random().css('hsl'),
      colors: schema.colors.map((color: Color, i: number) => {
        if (!color.isLocked) {
          return {
            ...color,
            color: newColors[i],
            pos: {
              x: color.pos.x,
              y: color.pos.y,
            },
          };
        }
        return color;
      }),
    });
  };

  const lockColor = (index: number) => {
    setSchema({
      ...schema,
      colors: schema.colors.map((color: Color, i: number) =>
        i === index ? { ...color, isLocked: !color.isLocked } : color
      ),
    })
  };

  const hideColor = (index: number) => {
    setSchema({
      ...schema,
      colors: schema.colors.map((color: Color, i: number) =>
        i === index ? { ...color, isHidden: !color.isHidden } : color
      ),
    })
  };

  const setMeshBackground = (value: string) => {
    setSchema({
      ...schema,
      bgColor: chroma(value).css('hsl'),
    });
  }

  const toggleAnimation = () => {
    setSchema({
      ...schema,
      isAnimated: !schema.isAnimated
  })}

  return {
    schema,
    canRedo,
    canUndo,
    undo,
    redo,
    setSchema,
    handleColorChange,
    removeColor,
    addColor,
    generateRandomGradient,
    lockColor,
    hideColor,
    setMeshBackground,
    toggleAnimation,
    generateRandomGradientWithParams,
  };
}
