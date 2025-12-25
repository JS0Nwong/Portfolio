import * as React from "react";

type Function = (...args: any[]) => void;

export default function useKeypress<Func extends Function>(
  key: string,
  func: Func
) {
  React.useEffect(() => {
    function handleKeypress(event: KeyboardEvent) {
      if (event.key === key) {
        func();
      }
    }

    window.addEventListener("keyup", handleKeypress);
    return () => {
      window.removeEventListener("keyup", handleKeypress);
    };
  }, [func, key]);
}
