import * as React from "react";

type Timer = ReturnType<typeof setTimeout>;
type Function = (...args: any[]) => void;

export default function useDebounce<Func extends Function>(
  func: Func,
  delay: number = 350
) {
  const timer = React.useRef<Timer>();

  React.useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);
  const debouncedValue = ((...args: any[]) => {
    const newTimer = setTimeout(() => {
      func(...args);
    }, delay);
    clearTimeout(timer.current);
    timer.current = newTimer;
  }) as Func;

  return debouncedValue;
}
