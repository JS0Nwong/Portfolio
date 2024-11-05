import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);
const MEDIA = "(prefers-color-scheme: dark)";

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within an ThemeProvider");
  }
  return context;
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem("theme") ?? "light") as Theme
  );

  useEffect(() => {
    document.documentElement.className = theme === "dark" ? "dark" : "light";
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Check for user's system preference if any
  useEffect(() => {
    const mediaQuery = window.matchMedia(MEDIA);
    if (mediaQuery.matches) {
      setTheme("dark");
    }
    mediaQuery.addEventListener("change", (e) => {
      if (e.matches) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    });
    return () => mediaQuery.removeEventListener("change", () => {});
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    document.documentElement.className = theme ? "dark" : "light";
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
