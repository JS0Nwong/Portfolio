import * as React from "react";

export default function useClickAway<T extends Element>(
  cb: (e: Event) => void
): React.MutableRefObject<T | null> {
  const ref = React.useRef<T | null>(null);
  const refCb = React.useRef(cb);

  React.useLayoutEffect(() => {
    refCb.current = cb;
  });

  React.useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent): void => {
      const element = ref.current as T | null;
      if (element && !element.contains(e.target as Node)) {
        refCb.current(e);
      }
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []);

  return ref;
}
