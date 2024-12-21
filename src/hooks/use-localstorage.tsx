import * as React from "react";

interface Color {
  color: string;
  pos: {
    x: number;
    y: number;
  };
}

interface Schema {
  bgColor: string;
  gradientType: string;
  interpolation: string;
  interpolationDistance: string;
  precision: number;
  grain: number;
  angle: number;
  colors: Color[];
  x: 50 | number;
  y: 50 | number;
}

interface LocalStorageHook {
  defaultValue?: string[] | number | string | Schema | null;
  key?: string | "";
}

export default function useLocalStorage({
  defaultValue,
  key,
}: LocalStorageHook) {
  if (!key) {
    throw new Error("useLocalStorage key is required.");
  }
  const [value, setValue] = React.useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}
