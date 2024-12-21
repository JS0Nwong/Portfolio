import { useState, useMemo } from "react";
import chroma from "chroma-js";
import {
  DndContext,
  useDraggable,
  closestCenter,
  useSensor,
  useSensors,
  KeyboardSensor,
  TouchSensor,
  PointerSensor,
  UniqueIdentifier,
  useDroppable,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  restrictToWindowEdges,
  createSnapModifier,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import { Plus, Minus } from "lucide-react";

import Toolbar from "@/components/GradientGenerator/Toolbar";
import Menubar from "@/components/GradientGenerator/Menubar";
import SavedGradients from "@/components/GradientGenerator/SavedGradients";
import { Button } from "@/components/ui/button";
import useClickAway from "@/hooks/use-clickaway";
import useColor from "@/hooks/use-color";
import { Color } from "@/lib/types";
import AnimatedMeshGradient from "@/components/GradientGenerator/AnimatedMeshGradient";
import { createLazyFileRoute } from "@tanstack/react-router";

const colorTypes = [
  "rgb",
  "hsl",
  "hsv",
  "hsi",
  "lab",
  "oklab",
  "lch",
  "oklch",
  "hcl",
  "lrgb",
];
const gradientTypes = ["linear", "radial", "conic", "mesh"];
const easingCurves = ["linear", "ease", "fun"];
const interpolationDistance = ["shorter", "longer", "increasing", "decreasing"];
const animationDirection = [
  "normal",
  "reverse",
  "alternate",
  "alternate-reverse",
];

export const Route = createLazyFileRoute("/tools/gradient-generator")({
  component: GradientGenerator,
});

function GradientGenerator() {
  const [gridSize, setGridSize] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [size, setSize] = useState<number>(100);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const {
    schema,
    canUndo,
    canRedo,
    undo,
    redo,
    setSchema,
    handleColorChange,
    removeColor,
    addColor,
    generateRandomGradient,
    lockColor,
    hideColor,
    setMeshBackground,
    toggleAnimation,
    generateRandomGradientWithParams,
  } = useColor();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 0,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor)
  );
  const snapToGrid = useMemo(() => createSnapModifier(gridSize), [gridSize]);

  const ref = useClickAway<HTMLDivElement>(() => {
    setIsOpen(false);
  });

  const { setNodeRef } = useDroppable({
    id: "gradient-area",
  });

  const handleDragEnd = ({ active, delta }: any) => {
    if (!active) return;
    const pointId = active.id;
    const containerRect = document
      .getElementById("gradient-area")
      ?.getBoundingClientRect();
    if (!containerRect) return;
    setSchema({
      ...schema,
      colors: schema.colors.map((color: Color) =>
        color.color === pointId
          ? {
              ...color,
              pos: {
                x:
                  Math.round(
                    Math.max(
                      0,
                      Math.min(
                        100,
                        color.pos.x + (delta.x / containerRect.width) * 100
                      )
                    ) / gridSize
                  ) * gridSize,
                y:
                  Math.round(
                    Math.max(
                      0,
                      Math.min(
                        100,
                        color.pos.y + (delta.y / containerRect.height) * 100
                      )
                    ) / gridSize
                  ) * gridSize,
              },
            }
          : color
      ),
    });
  };

  const gradientStyle = useMemo(() => {
    const svgUrl = `data:image/svg+xml,%3C!-- svg: first layer --%3E%3Csvg viewBox='0 0 ${schema.grain} ${schema.grain}' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E`;
    return {
      height: `${size}%`,
      width: `${size}%`,
      backgroundColor: chroma(schema.bgColor).css("hsl"),
      backgroundImage: `url("${svgUrl}"),
    ${
      schema.gradientType === "mesh"
        ? ` ${schema.colors
            .filter((color: Color) => !color.isHidden)
            .map(
              (color: Color) =>
                `radial-gradient(at ${color.pos?.x}% ${color.pos?.y}%, ${color.color} 0px, transparent 50%)`
            )
            .join(", ")}`
        : `${schema.gradientType}-gradient(${
            schema.gradientType === "linear"
              ? `${schema.angle}deg `
              : schema.gradientType === "radial"
                ? `circle at ${schema.x}% ${schema.y}% `
                : `from ${schema.angle}deg at ${schema.x}% ${schema.y}%`
          } in hsl ${schema.interpolationDistance} hue, ${chroma
            .scale(
              schema.colors
                .filter((color: Color) => !color.isHidden)
                .map((color: Color) => chroma(color.color).css("hsl"))
            )
            .mode(schema.interpolation as chroma.InterpolationMode)
            .colors(schema.precision)})`
    }`,
    };
  }, [size, schema]);

  return (
    <div className="flex flex-col w-full h-dvh max-h-screen overflow-hidden font-geist">
      <Menubar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex flex-1 flex-col md:flex-row gap-2 p-2 overflow-hidden relative">
        <div className="flex flex-1 w-full h-full relative items-center justify-center">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            modifiers={[
              restrictToWindowEdges,
              snapToGrid,
              restrictToParentElement,
            ]}
            onDragEnd={handleDragEnd}
          >
            <div
              ref={setNodeRef}
              id="gradient-area"
              className="block w-full h-96 md:h-full rounded-lg relative"
              style={gradientStyle}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {schema.gradientType === "mesh" && schema.isAnimated && (
                <AnimatedMeshGradient
                  schema={schema}
                  className="absolute inset-0"
                />
              )}
              {schema.gradientType === "mesh" &&
                schema.colors.map((color: any) => (
                  <DraggablePoint
                    key={color.color}
                    color={color}
                    isVisible={isHovering}
                  />
                ))}
            </div>
          </DndContext>
          <div className="flex flex-col absolute left-2 bottom-2 select-none z-50">
            <div className="flex ">
              <Button
                variant="outline"
                className="rounded-r-none h-8 w-8"
                disabled={size === 25}
                onClick={() =>
                  setSize((prev) => (prev > 25 ? prev - 25 : prev))
                }
              >
                <Minus
                  size={16}
                  strokeWidth={2.25}
                  className=" text-neutral-600 dark:text-neutral-300"
                />
              </Button>
              <Button
                variant="outline"
                className="rounded-l-none h-8 w-8"
                disabled={size === 100}
                onClick={() =>
                  setSize((prev) => (prev < 100 ? prev + 25 : prev))
                }
              >
                <Plus
                  size={16}
                  strokeWidth={2.25}
                  className=" text-neutral-600 dark:text-neutral-300"
                />
              </Button>
            </div>
          </div>
        </div>
        <div className="overflow-hidden">
          {isOpen ? (
            <SavedGradients
              setIsOpen={setIsOpen}
              favoriteRef={ref}
              setGradient={setSchema}
            />
          ) : (
            <Toolbar
              data={schema}
              meshBackground={
                schema.gradientType === "mesh" ? schema.bgColor : undefined
              }
              gradientTypes={gradientTypes}
              easingCurves={easingCurves}
              colorTypes={colorTypes}
              interpolationDistance={interpolationDistance}
              animationDirection={animationDirection}
              canUndo={canUndo}
              canRedo={canRedo}
              isOpen={isExportOpen}
              setSchema={setSchema}
              setMeshBackground={setMeshBackground}
              handleColorChange={handleColorChange}
              removeColor={removeColor}
              addColor={addColor}
              undo={undo}
              redo={redo}
              generateRandomGradient={generateRandomGradient}
              lockColor={lockColor}
              hideColor={hideColor}
              toggleAnimation={toggleAnimation}
              generateRandomGradientWithParams={
                generateRandomGradientWithParams
              }
              setIsOpen={setIsExportOpen}
            />
          )}
        </div>
      </div>
    </div>
  );
}

interface DraggablePointProps {
  color: Color;
  isVisible: boolean;
}

const DraggablePoint: React.FC<DraggablePointProps> = ({
  color,
  isVisible,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: color.color,
  });

  const style: React.CSSProperties = {
    position: "absolute",
    left: `${color.pos?.x}%`,
    top: `${color.pos?.y}%`,
    width: "25px",
    height: "25px",
    border: "1px solid #dfdfdf",
    borderRadius: "50%",
    boxShadow:
      "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    backgroundColor: color.color,
    cursor: "move",
    transform: CSS.Translate.toString(transform),
    zIndex: 1000,
    opacity: isVisible ? 1 : 0,
    transition: "opacity 0.3s ease-in-out",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <span className="sr-only">Drag to move color point</span>
    </div>
  );
};
