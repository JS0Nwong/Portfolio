import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useScramble } from "use-scramble";
import { ProjectListItemProps } from "@/lib/types";

export default function ProjectListItem({
  index,
  project,
  setFocused,
  focused,
  animation,
}: ProjectListItemProps) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("show");
  }, [controls]);

  const { ref: titleRef } = useScramble({
    text: project.title,
    range: [65, 125],
    speed: 0.55,
    tick: 7,
    step: 2,
    scramble: 8,
    seed: 2,
    chance: 1,
    overdrive: 32,
    overflow: false,
  });

  const { ref: descriptionRef } = useScramble({
    text: project.description,
    range: [65, 125],
    speed: 0.55,
    tick: 2,
    step: 2,
    scramble: 8,
    seed: 2,
    chance: 1,
    overdrive: 32,
    overflow: false,
  });

  const { ref: dateCreatedRef } = useScramble({
    text: project.dateCreated,
    range: [48, 57],
    speed: 0.55,
    tick: 5,
    step: 2,
    scramble: 20,
    seed: 2,
    chance: 1,
    overdrive: 32,
    overflow: false,
  });
  
  return (
    <motion.a
      href={project?.link}
      rel="noopener noreferrer"
      target="_blank"
      key={index}
      onMouseEnter={() => setFocused(index)}
      onTap={() => setFocused(index)}
      onFocus={() => setFocused(index)}
      tabIndex={0}
      className="relative font-geist flex flex-row items-center cursor-pointer focus:outline-none mt-1 -mx-3 px-3"
      variants={animation}
    >
      <span
        ref={titleRef}
        className=" text-neutral-800 dark:text-neutral-300 text-sm font-semibold text-nowrap"
      >
        {project.title}
      </span>
      <span
        ref={descriptionRef}
        className="hidden md:flex text-neutral-600 dark:text-neutral-400 text-xs ml-2 text-nowrap font-medium"
      >
        {project.description}
      </span>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="mx-1.5 flex row w-full grow shrink basis-0 items-center relative 
          before:content-[''] before:w-0 before:h-px before:absolute before:-bottom-px before:z-[3] before:transition-[width] before:ease-in-out 
          after:content-[''] after:w-0 after:h-px after:absolute after:-bottom-px after:transition-[width] 
          dark:before:animate-darkColorAfter dark:after:animate-darkColorBefore after:animate-lightColorAfter before:animate-lightColorBefore"
      />
      <motion.p
        ref={dateCreatedRef}
        className=" font-medium text-neutral-400 dark:text-neutral-500 text-end text-sm text-nowrap tracking-tighter "
      >
        {project.dateCreated}
      </motion.p>
      {focused === index ? (
        <motion.div
          layout={true}
          transition={{
            duration: 0.1,
            ease: "linear",
          }}
          className="-mx-3 px-3 absolute min-w-full h-full bg-neutral-400/15 dark:bg-neutral-400/10 rounded-lg p-6 z-0 "
          layoutId="highlight"
        />
      ) : null}
    </motion.a>
  );
}
