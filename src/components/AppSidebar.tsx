import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { RxHobbyKnife, RxChevronDown } from "react-icons/rx";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { tools, paths } from "@/lib/data/index";
import { useSidebar } from "@/context/SidebarContext";
import { useTheme } from "@/context/ThemeContext";
import { BackgroundGradientAnimation } from "./static/BackgroundGradient";

export default function AppSidebar() {
  const location = useLocation();
  const { theme } = useTheme();
  const { open, isMobile, toggleSidebar } = useSidebar();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <AnimatePresence>
      {open && isMobile && (
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 260,
              damping: 30,
              duration: 0.1,
            },
          }}
          exit={{ opacity: 0 }}
          className="fixed font-geist z-40 inset-x-2 top-12 bottom-4 border bg-white dark:bg-zinc-950 dark:border-zinc-800 flex flex-col justify-between p-4 rounded-lg mt-4"
        >
          <nav>
            <ul className="font-semibold text-neutral-800 dark:text-neutral-300 space-y-2 h-full">
              {paths.map(({ name, path, icon }) => (
                <motion.li
                  key={name}
                  className="relative flex justify-between items-center"
                >
                  <Link
                    to={path}
                    className="flex items-center gap-3"
                    onClick={toggleSidebar} // Close sidebar on navigation
                  >
                    {icon} {name}
                  </Link>
                  {location.pathname === path && (
                    <motion.div
                      layoutId="dot"
                      className="h-1 bg-[#5f58ff] rounded-sm w-1"
                      initial={false}
                      animate={{ opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                    />
                  )}
                </motion.li>
              ))}
              <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger className="w-full">
                  <motion.li className="flex justify-between w-full items-center">
                    <div className="flex items-center gap-3">
                      <RxHobbyKnife />
                      tools
                    </div>
                    <motion.div
                      layoutId="chevron"
                      initial={{ rotateZ: 0 }}
                      animate={{ rotateZ: isOpen ? 180 : 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 12,
                      }}
                    >
                      <RxChevronDown />
                    </motion.div>
                  </motion.li>
                </CollapsibleTrigger>
                <CollapsibleContent className="CollapsibleContent">
                  <ul className="grid rounded-md bg-neutral-50 dark:bg-zinc-900/20 gap-4 p-4 mt-3 ">
                    {tools.map((component) => (
                      <a
                        key={component.title}
                        title={component.title}
                        href={component.href}
                        className="text-sm font-medium leading-none text-neutral-950 dark:text-neutral-200 flex gap-3"
                        onClick={toggleSidebar} // Close sidebar on navigation
                      >
                        {component.icon} {component.title}
                      </a>
                    ))}
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            </ul>
          </nav>
          <div className="h-full rounded-md my-4 p-2 border border-neutral-200 dark:border-zinc-700">
            <BackgroundGradientAnimation
              firstColor={theme === "dark" ? "#696eff" : "#fcb0f3"}
              secondColor={theme === "dark" ? " f8acff" : "#3d05dd"}
              thirdColor="#2F195F"
              fourthColor="#7353BA"
              fifthColor="#FAA6FF"
              interactive={false}
              containerClassName="rounded-sm"
            />
          </div>
          <span className="text-sm text-neutral-400 dark:text-neutral-500">
            Fail foward.
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
