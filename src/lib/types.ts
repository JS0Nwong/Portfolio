import { RoughNotationProps } from "react-rough-notation";
import { InterpolationMode } from "chroma-js";  

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
  colors: string[];
  gradientTypes: string[];
  gradientType: string;
  interpolation: InterpolationMode;
  precision: number;
  angle: number;
  x: number;
  y: number;
  easingCurves: string[];
  colorTypes: string[];
  interpolationDistance: string[];
  grain: number;  
  baseFrequency: number;  
  setGradientType: (value: string) => void;
  setInterpolation: (value: InterpolationMode) => void;
  setHueInterpolation: (value : "shorter" | "longer" | "increasing" | "decreasing") => void;  
  setPrecision: (value: number) => void;
  setAngle: (value: number) => void;
  setX: (value: number) => void;
  setY: (value: number) => void;
  setColors: (value: string[]) => void;
  handleColorChange: (index: number, value: string) => void;
  removeColor: (index: number) => void;
  addColor: () => void; 
  setGrain: (value: number) => void ;
  setBaseFrequency: (value: number) => void ;
}