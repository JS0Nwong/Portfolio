import { Schema, Color } from "@/lib/types";
import chroma from "chroma-js";

interface KeyframeData {
  [key: string]: {
    [key: string]: string | number;
  };
}

export function mapGradientToKeyframes(schema: Schema, numKeyframes: number = 3): KeyframeData {
  const keyframes: KeyframeData = {};

  for (let i = 0; i < numKeyframes; i++) {
    const percentage = (i / (numKeyframes - 1)) * 100;
    const frame: { [key: string]: string | number } = {};

    schema.colors.forEach((color: Color, index: number) => {
      const hue = Math.round(chroma(color.color).get("hsl.h"));
      const saturation = Math.round(chroma(color.color).get("hsl.s") * 100);
      const lightness = Math.round(chroma(color.color).get("hsl.l") * 100);

      frame[`--c-${index}`] = `hsla(${hue}, ${saturation}%, ${lightness}%, 1)`;
      frame[`--x-${index}`] = `${Math.round(Math.random() * 100)}%`;
      frame[`--y-${index}`] = `${Math.round(Math.random() * 100)}%`;
      frame[`--s-start-${index}`] = `${Math.round(10 + Math.random() * 20)}%`;
      frame[`--s-end-${index}`] = `${Math.round(40 + Math.random() * 20)}%`;
    });

    keyframes[`${percentage}%`] = frame;
  }

  return keyframes;
}

export function generateCSSKeyframes(schema: Schema, animationName: string = 'meshGradientAnimation'): string {
  const keyframes = mapGradientToKeyframes(schema);
  let cssKeyframes = `@keyframes ${animationName} {\n`;

  for (const [percentage, frame] of Object.entries(keyframes)) {
    cssKeyframes += `  ${percentage} {\n`;
    for (const [prop, value] of Object.entries(frame)) {
      cssKeyframes += `    ${prop}: ${value};\n`;
    }
    cssKeyframes += `  }\n`;
  }

  cssKeyframes += `}\n`;

  // Generate CSS custom properties
  schema.colors.forEach((_, index) => {
    ['c', 'x', 'y', 's-start', 's-end'].forEach(prop => {
      cssKeyframes += `@property --${prop}-${index} {\n`;
      cssKeyframes += `  syntax: "${prop === 'c' ? '<color>' : '<percentage>'}";
  inherits: false;
  initial-value: ${prop === 'c' ? 'black' : '0%'};
}\n`;
    });
  });

  return cssKeyframes;
}

export function generateGradientStyles(schema: Schema): string {
  let gradientStyles = `
    #gradient-container {
      background-color: ${schema.bgColor};
      background-image: `;

      schema.colors.forEach((_, index) => {
        gradientStyles += `
        radial-gradient(
          circle at var(--x-${index}) var(--y-${index}),
          var(--c-${index}) var(--s-start-${index}),
          transparent var(--s-end-${index})
        )${index < schema.colors.length - 1 ? ',' : ';'}`;
      });

      gradientStyles += `
      animation: ${schema.isAnimated ? `meshGradientAnimation ${schema.animationDuration}s ${schema.animationDirection} infinite` : 'none'};
  }`;

  return gradientStyles;
}

