import { RoughNotationProps } from "react-rough-notation";
import { InterpolationMode } from "chroma-js";  

export interface Color {
  color: string;
  pos: {
    x: number;
    y: number;
  };
  isLocked?: boolean;
  isHidden?: boolean;
}

export interface Schema {
  bgColor: string;
  gradientType: string;
  interpolation: InterpolationMode | string;
  interpolationDistance: string;
  precision: number;
  grain: number;
  angle: number;
  easing: string;
  colors: Color[];
  x: 50 | number;
  y: 50 | number;
  isAnimated?: boolean;
  animationDuration?: number;
  animationDirection?: string;
}

export type ProjectListItemProps = {
  index: number;
  project: {
    title: string;
    description: string;
    dateCreated: string;
    link?: string;
  };
  setFocused: (index: number) => void;
  focused: number;
  animation: any;
};

export type InputProps = {
  type: string;
  id: string;
  name: string;
  placeholder: string;
};

export type HighlightProps = {
  children: string | JSX.Element;
  type: RoughNotationProps["type"];
  order: string;
};

export type ToolbarProps = {
  data: Schema;
  gradientTypes: string[];
  easingCurves: string[];
  colorTypes: string[];
  interpolationDistance: string[];
  animationDirection: string[];
  canUndo: boolean;
  canRedo: boolean;
  meshBackground?: string;
  isOpen: boolean;
  setSchema: (value: Schema) => void;
  handleColorChange: (index: number, value: string) => void;
  removeColor: (index: number) => void;
  addColor: () => void;
  undo: () => void;
  redo: () => void;
  generateRandomGradient: () => void;
  setMeshBackground: (value: string) => void;
  lockColor: (index: number) => void;
  hideColor: (index: number) => void;
  toggleAnimation: () => void;
  generateRandomGradientWithParams: (
    hue: number[],
    sat: number[],
    light: number[]
  ) => void;
  setIsOpen: (value: boolean) => void;  
};

export interface ColorPaletteProps {
  colors: Color[];
  meshBackground?: string;
  canUndo: boolean;
  canRedo: boolean;
  isAnimated?: boolean;
  setColors: (color: Color[]) => void;
  addColor: () => void;
  undo: () => void;
  redo: () => void;
  removeColor: (index: number) => void;
  generateRandomGradient: () => void;
  handleColorChange: (index: number, value: string) => void;
  setMeshBackground: (value: string) => void;
  lockColor: (index: number) => void;
  hideColor: (index: number) => void;
  toggleAnimation: () => void;  
}

export type GradientProps = {
  angle: number;
  bgColor: string;
  colors: Color[];
  gradientType: string;
  grain: number;
  interpolation: InterpolationMode | "hsl";
  interpolationDistance: string; 
  precision: number;
  x: number;
  y: number;
}
