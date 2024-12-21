import * as React from "react";

const MAX_HISTORY_LENGTH = 25;

interface State<T> {
  past: T[];
  present: T | null;
  future: T[];
}

interface Action<T> {
  type: "UNDO" | "REDO" | "SET" | "CLEAR";
  newPresent?: T;
  initialPresent?: T;
}

const useHistoryStateReducer = <T,>(
  state: State<T>,
  action: Action<T>
): State<T> => {
  const { past, present, future } = state;
  if(!present) return state;
  switch (action.type) {
    case "UNDO":
      if (past.length === 0) return state;
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      return {
        past: newPast,
        present: previous,
        future: [present, ...future].slice(0, MAX_HISTORY_LENGTH),
      };
    case "REDO":
      if (future.length === 0) return state;
      const next = future[0];
      const newFuture = future.slice(1);
      return {
        past: [...past, present].slice(-MAX_HISTORY_LENGTH),
        present: next,
        future: newFuture,
      };
    case "SET":
      if (action.newPresent === present) {
        return state;
      }
      return {
        past: [...past, present].slice(-MAX_HISTORY_LENGTH),
        present: action.newPresent || null,
        future: [],
      };
    case "CLEAR":
      return {
        past: [],
        present: action.initialPresent || null,
        future: [],
      };
    default:
      throw new Error("Unsupported action type");
  }
};

export default function useHistoryWithLocalStorage<T>(
  key: string,
  initialPresent: T
) {
  const [state, dispatch] = React.useReducer(
    useHistoryStateReducer,
    null,
    () => {
      const storedState = window.localStorage.getItem(key);
      if (storedState) {
        try {
          const parsedState = JSON.parse(storedState);
          if (
            parsedState &&
            typeof parsedState === "object" &&
            "past" in parsedState &&
            "present" in parsedState &&
            "future" in parsedState
          ) {
            // Ensure the loaded state adheres to the MAX_HISTORY_LENGTH
            return {
              past: parsedState.past.slice(-MAX_HISTORY_LENGTH),
              present: parsedState.present,
              future: parsedState.future.slice(0, MAX_HISTORY_LENGTH),
            };
          }
        } catch (error) {
          console.error("Error parsing stored state:", error);
        }
      }
      return {
        past: [],
        present: initialPresent,
        future: [],
      };
    }
  );

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  const canUndo = state && Array.isArray(state.past) && state.past.length > 0;
  const canRedo =
    state && Array.isArray(state.future) && state.future.length > 0;

  const undo = React.useCallback(() => {
    if (canUndo) {
      dispatch({ type: "UNDO" });
    }
  }, [canUndo]);

  const redo = React.useCallback(() => {
    if (canRedo) {
      dispatch({ type: "REDO" });
    }
  }, [canRedo]);

  const set = React.useCallback(
    (newPresent: T) => dispatch({ type: "SET", newPresent }),
    []
  );

  const clear = React.useCallback(
    () => dispatch({ type: "CLEAR", initialPresent }),
    [initialPresent]
  );

  return { state: state.present, set, undo, redo, clear, canUndo, canRedo };
}
