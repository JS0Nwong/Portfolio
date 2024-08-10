import { Link } from "react-router-dom";
import { useState } from "react";
import { RxMoon, RxSun } from "react-icons/rx"
import { useTheme } from "../context/ThemeContext";

export default function Menubar() {
  const { darkMode, toggleTheme } = useTheme();
  const [show, setShow] = useState(false);
  return (
    <nav
      id="menubar"
      aria-label="Main navigation"
      className="mt-4 md:mt-8 tracking-tighter flex flex-row items-center text-neutral-800 dark:text-neutral-200"
    >
      <ul className="list-none flex w-full font-display font-medium ">
        <Link to="/" className="mr-2 hover:opacity-85 transition-opacity">home</Link>
        <Link to="/craft" className="mx-2 hover:opacity-85 transition-opacity">craft</Link>
        <Link to="/contact" className="mx-2 hover:opacity-85 transition-opacity">contact</Link>
        <Link to="/guestbook" className="mx-2 hover:opacity-85 transition-opacity">guestbook</Link>
      </ul>
      <button
        className="m-0 p-0"
        onClick={toggleTheme}
        aria-label="Toggle dark mode"
      >
        {darkMode ? <RxSun /> : <RxMoon />}
      </button>
    </nav>
  );
}
