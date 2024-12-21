import { Link } from '@tanstack/react-router'
import { RxMoon, RxSun, RxHamburgerMenu, RxVercelLogo } from "react-icons/rx";
import { useTheme } from "../context/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";
import { NavDropdown } from "./NavDropdown";
import { useSidebar } from "../context/SidebarContext";
import { paths } from "@/lib/data/index";
import { useLocation } from '@tanstack/react-router';

export default function Menubar() {
  const { theme, toggleTheme } = useTheme();
  const { toggleSidebar } = useSidebar();
  const pathname = useLocation({
    select: (location) => location.pathname,
  })

  return (
    <AnimatePresence>
      <nav
        id="menubar"
        aria-label="Main navigation"
        className="sticky font-geist top-0 md:top-4 w-auto -mt-6 md:mt-4 px-6 md:px-0 -mx-6 md:mx-0 h-10 md:h-auto pt-8 pb-4
        tracking-tighter flex flex-row items-center z-50 
        bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md md:bg-transparent"
      >
        <ul className="list-none hidden md:flex w-full font-medium ">
          {paths.map(({ name, path }) => (
            <motion.li
              key={name}
              className="first:mr-2 first:ml-0 mx-2 relative inline-block"
            >
              <Link
                to={path}
                className={"text-neutral-800 dark:text-neutral-200"}
              >
                {name}
              </Link>
              {pathname === path && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 -bottom-0.5 w-full h-0.5 bg-[#5f58ff] rounded-sm"
                  initial={false}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </motion.li>
          ))}
          <motion.li className="ml-2 cursor-pointer">
            <NavDropdown />
          </motion.li>
        </ul>
        <div className="w-full inline-block md:hidden">
          <span className="font-medium text-neutral-800 dark:text-neutral-200">
            <RxVercelLogo />
          </span>
        </div>
        <div className="flex gap-4 flex-row-reverse">
          <button
            className="m-0 p-0 inline-block md:hidden"
            aria-label="Toggle dark mode"
            onClick={toggleSidebar}
          >
            <RxHamburgerMenu />
          </button>

          <button
            className="m-0 p-0 "
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? <RxSun /> : <RxMoon />}
          </button>
        </div>
      </nav>
    </AnimatePresence>
  );
}
