import * as React from "react";

interface LocalStorageHook {
  defaultValue: string[] | string | null;
  key: string;
}

export default function useLocalStorage({
  defaultValue,
  key,
}: LocalStorageHook) {
  const [value, setValue] = React.useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, key, setValue];
}
