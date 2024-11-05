import * as React from "react";

export default function useHistory() {
  const [history, setHistory] = React.useState<string[]>([]);
  const [redoStack, setRedoStack] = React.useState<string[]>([]);

  const push = (path: string) => {
    setHistory((prevHistory) => [...prevHistory, path]);
  };

  const pop = () => {
    
    setHistory((prevHistory) => {
      const newHistory = [...prevHistory];
      newHistory.pop();
      return newHistory;
    });
  };

  const redo = () => {

  }

  return { history, push, pop };
}
