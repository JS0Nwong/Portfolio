import { useState } from "react"
import { motion } from 'framer-motion'
import { AnimatePresence } from "framer-motion"
import { data } from '../lib/data/projects'
import ProjectListItem from "../components/ProjectListItem"
import { createLazyFileRoute } from "@tanstack/react-router"

const defaultAnimations = {
    initial: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
    }
}

export const Route = createLazyFileRoute('/craft')({
    component: Craft,
})

export default function Craft() {
    const [focus, setFocus] = useState(Infinity)
    return (
        <div className="pt-12 sm:pt-16 flex flex-col divide-y dark:divide-neutral-800 font-geist">
            <div className="flex flex-col">
                <h1 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100">
                    my craft
                </h1>
                <p className="text-xs mt-2 pb-5 font-medium text-neutral-400 dark:text-neutral-500">
                    On a mission to craft digital experience that delights users.
                </p>
            </div>
            <AnimatePresence>
                <motion.div 
                    className="list-none pt-5 font-sans flex flex-col gap-7"
                    initial="initial"
                    animate="visible"
                    transition={{ staggerChildren: 0.1 }}
            >
                    {data.map((project, i) => (
                        <ProjectListItem
                            key={i}
                            index={i}
                            project={project}
                            setFocused={setFocus}
                            focused={focus}
                            animation={defaultAnimations}
                        />
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
