import { InterpolationMode } from "chroma-js";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ToolTip from "@/components/ToolTip";
import RandomizeSettings from "./RandomizeSettings";
import ColorPalette from "./ColorPalette";
import { GradientCSS } from "./GradientCSS";
import { ToolbarProps, Schema } from "@/lib/types";
import {
  Blend,
  Route,
  Sparkles,
  Ruler,
  Spline,
  Target,
  MoveVertical,
  MoveHorizontal,
  Component,
  DraftingCompass,
  Clock,
  Undo,
  Redo,
  Dices,
  Download,
  Heart,
} from "lucide-react";
import useLocalStorage from "@/hooks/use-localstorage";


export default function Toolbar(props: ToolbarProps) {
    const [savedGradients, setSavedGradients] = useLocalStorage({
      defaultValue: [],
      key: "saved-gradients",
    });

    const handleSaveGradient = () => {
      setSavedGradients((prev: Schema[]) => [...prev, props.data]);
    };

  return (
    <div className="flex flex-col justify-between h-full md:max-w-md overflow-y-auto no-scrollbar max-h-full md:min-w-[28rem] border border-px rounded-md ">
      {/* COLORS */}
      <div className="flex flex-col w-full">
        <div className="font-semibold flex p-3 items-center justify-between bg-white dark:bg-zinc-950 border-b">
          <ToolTip showInfoIcon={false} asChild={true} tooltipText="Save">
            <Button
              variant="outline"
              size="icon"
              className="font-semibold"
              onClick={handleSaveGradient}
            >
              <Heart size={16} strokeWidth={2.25} />
            </Button>
          </ToolTip>
          <div className="flex h-full items-center">
            <Button
              onClick={props.generateRandomGradient}
              className="rounded-r-none"
            >
              <span>Randomize</span>
              <Dices
                size={16}
                strokeWidth={2.25}
                className=" text-neutral-500 dark:text-neutral-400"
              />
            </Button>
            <RandomizeSettings
              generateRandomGradientWithParams={
                props.generateRandomGradientWithParams
              }
            />
          </div>
        </div>
        <ColorPalette
          meshBackground={props.meshBackground}
          colors={props.data.colors}
          isAnimated={props.data.isAnimated}
          setColors={(colors) => props.setSchema({ ...props.data, colors })}
          addColor={props.addColor}
          removeColor={props.removeColor}
          undo={props.undo}
          redo={props.redo}
          canUndo={props.canUndo}
          canRedo={props.canRedo}
          generateRandomGradient={props.generateRandomGradient}
          handleColorChange={props.handleColorChange}
          setMeshBackground={props.setMeshBackground}
          lockColor={props.lockColor}
          hideColor={props.hideColor}
          toggleAnimation={props.toggleAnimation}
        />
      </div>

      <div>
        {/* GRADIENT TYPE */}
        <div className="flex flex-row gap-2 p-3 items-center justify-between border-b border-t">
          <Label className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 flex gap-2">
            <Component
              size={16}
              strokeWidth={2.25}
              className=" text-neutral-400 dark:text-neutral-500"
            />{" "}
            <span>Gradient Type</span>
          </Label>
          <Select
            value={props.data.gradientType}
            onValueChange={(value) =>
              props.setSchema({ ...props.data, gradientType: value })
            }
          >
            <SelectTrigger className="w-[250px] font-medium text-neutral-600 dark:text-neutral-400">
              <SelectValue
                placeholder={
                  props.data.gradientType[0].toUpperCase() +
                    props.data.gradientType.slice(1) || props.gradientTypes[0]
                }
              />
            </SelectTrigger>
            <SelectContent>
              {props.gradientTypes.map((type) => (
                <SelectItem
                  key={type}
                  value={type}
                  className="text-sm font-medium text-neutral-400"
                >
                  {type[0].toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* ANIMATION SETTINGS */}
        {props.data.gradientType === "mesh" && props.data.isAnimated && (
          <div className="flex flex-col">
            <div className="flex flex-row gap-4 p-3 border-b items-center">
              <Label className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 flex justify-between text-nowrap gap-2">
                <Clock
                  size={16}
                  strokeWidth={2.25}
                  className=" text-neutral-400 dark:text-neutral-500"
                />
                <span>Animation Duration</span>
              </Label>
              <Slider
                value={[props.data.animationDuration || 2]}
                max={20}
                min={2}
                step={1}
                id="duration"
                onValueChange={(e) =>
                  props.setSchema({ ...props.data, animationDuration: e[0] })
                }
              />
              <Input
                value={props.data.animationDuration || 2}
                max={20}
                min={2}
                onChange={(e) =>
                  props.setSchema({
                    ...props.data,
                    animationDuration: Number(e.target.value),
                  })
                }
                className="w-12 h-8 text-xs text-neutral-800 dark:text-neutral-400 font-medium"
              />
            </div>
            <div className="flex flex-row gap-4 p-4 border-b items-center justify-between">
              <Label
                className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 flex justify-between gap-2"
                htmlFor="delay"
              >
                <Route
                  size={16}
                  strokeWidth={2.25}
                  className=" text-neutral-400 dark:text-neutral-500 -rotate-90"
                />
                <span>Animation Direction</span>
              </Label>
              <Select
                value={props.data?.animationDirection || "normal"}
                onValueChange={(value) =>
                  props.setSchema({ ...props.data, animationDirection: value })
                }
              >
                <SelectTrigger className="w-[250px] font-medium text-neutral-600 dark:text-neutral-400">
                  <SelectValue
                    placeholder={
                      (props.data.animationDirection &&
                        props.data.animationDirection[0].toUpperCase() +
                          props.data.animationDirection?.slice(1)) ||
                      props.animationDirection[0][0].toUpperCase() +
                        props.animationDirection[0].slice(1)
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {props.animationDirection.map((direction: string) => (
                    <SelectItem
                      key={direction}
                      value={direction}
                      className="text-sm font-medium"
                    >
                      {direction[0].toUpperCase() + direction.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* POSITION SLIDERS */}
        {(props.data.gradientType === "radial" ||
          props.data.gradientType === "conic") && (
          <div className="flex flex-col">
            <div className="flex flex-row gap-4 p-3 border-b justify-between items-center">
              <Label className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 flex justify-between text-nowrap gap-2">
                <MoveHorizontal
                  size={16}
                  strokeWidth={2.25}
                  className=" text-neutral-400 dark:text-neutral-500"
                />{" "}
                <span>X Position</span>
              </Label>
              <Slider
                value={[props.data.x]}
                min={-20}
                max={120}
                step={5}
                id="x-position"
                onValueChange={(e) =>
                  props.setSchema({ ...props.data, x: e[0] })
                }
              />
              <Input
                value={props.data.x}
                max={120}
                min={-20}
                onChange={(e) =>
                  props.setSchema({ ...props.data, x: Number(e.target.value) })
                }
                className="w-14 h-8 text-xs text-neutral-800 dark:text-neutral-400 font-medium"
              />
            </div>
            <div className="flex flex-row gap-4 p-4 border-b justify-between items-center">
              <Label
                className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 text-nowrap flex items-center gap-2"
                htmlFor="y-position"
              >
                <MoveVertical
                  size={16}
                  strokeWidth={2.25}
                  className=" text-neutral-400 dark:text-neutral-500"
                />{" "}
                <span>Y Position</span>
              </Label>
              <Slider
                value={[props.data.y]}
                min={-20}
                max={120}
                step={5}
                id="y-position"
                onValueChange={(e) =>
                  props.setSchema({ ...props.data, y: e[0] })
                }
              />
              <Input
                value={props.data.y}
                max={120}
                min={-20}
                onChange={(e) =>
                  props.setSchema({ ...props.data, y: Number(e.target.value) })
                }
                className="w-14 h-8 text-xs text-neutral-800 dark:text-neutral-400 font-medium"
              />
            </div>
          </div>
        )}

        {/* INTERPOLATION MODE */}
        {props.data.gradientType !== "mesh" && (
          <div className="flex flex-row gap-2 p-3 items-center justify-between border-b">
            <Label className="text-xs font-semibold  flex items-center gap-2 text-nowrap">
              <Blend
                size={16}
                strokeWidth={2.25}
                className=" text-neutral-400 dark:text-neutral-500"
              />{" "}
              <span className="text-neutral-600 dark:text-neutral-400">
                Interpolation Mode
              </span>
              <ToolTip
                showInfoIcon={true}
                tooltipText="The color space used to draw the gradient. LCH is visually smoother. HSL and HSV can sometimes produce colors that are more visually brilliant."
              />
            </Label>
            <Select
              value={props.data.interpolation}
              onValueChange={(value: InterpolationMode) =>
                props.setSchema({ ...props.data, interpolation: value })
              }
            >
              <SelectTrigger className="w-[250px] font-medium text-neutral-600 dark:text-neutral-400">
                <SelectValue
                  placeholder={props.data.interpolation || props.colorTypes[0]}
                />
              </SelectTrigger>
              <SelectContent>
                {props.colorTypes.map((type) => (
                  <SelectItem
                    key={type}
                    value={type}
                    className="text-sm font-medium text-neutral-400"
                  >
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* INTERPOLATION DISTANCE */}
        {props.data.gradientType !== "mesh" && (
          <div className="flex flex-row gap-2 p-3 items-center justify-between border-b ">
            <Label className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 flex items-center gap-2 text-nowrap">
              <Ruler
                size={16}
                strokeWidth={2.25}
                className=" text-neutral-400 dark:text-neutral-500"
              />{" "}
              <span>Interpolation Distance</span>
              <ToolTip
                showInfoIcon={true}
                tooltipText="Determines which direction around the color wheel the gradient should go."
              />
            </Label>
            <Select
              value={props.data.interpolationDistance}
              onValueChange={(value) =>
                props.setSchema({ ...props.data, interpolationDistance: value })
              }
            >
              <SelectTrigger className="w-[250px] font-medium text-neutral-600 dark:text-neutral-400">
                <SelectValue
                  placeholder={
                    props.data.interpolationDistance[0].toUpperCase() +
                      props.data.interpolationDistance.slice(1) ||
                    props.interpolationDistance[0]
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {props.interpolationDistance.map((type) => (
                  <SelectItem
                    key={type}
                    value={type}
                    onClick={() =>
                      props.setSchema({ ...props.data, gradientType: type })
                    }
                    className="text-sm font-medium text-neutral-400"
                  >
                    {type[0].toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* PRECISION SLIDER*/}
        {props.data.gradientType !== "mesh" && (
          <div className="flex flex-row gap-4 p-3 items-center border-b ">
            <Label className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 flex justify-between">
              <div className="flex items-center gap-2">
                <Target
                  size={16}
                  strokeWidth={2.25}
                  className=" text-neutral-400 dark:text-neutral-500"
                />{" "}
                <span>Precision</span>
                <ToolTip
                  showInfoIcon={true}
                  tooltipText="The number of in-between colors used to generate the gradient. The higher the number the more visually smooth it will be."
                />
              </div>
            </Label>
            <Slider
              value={[props.data.precision || 0]}
              max={20}
              step={1}
              id="precision"
              className="h-9"
              onValueChange={(e) =>
                props.setSchema({ ...props.data, precision: e[0] })
              }
            />
            <Input
              value={props.data.precision}
              max={20}
              min={0}
              onChange={(e) =>
                props.setSchema({
                  ...props.data,
                  precision: Number(e.target.value),
                })
              }
              className="w-12 text-xs text-neutral-800 dark:text-neutral-400 font-medium"
            />
          </div>
        )}

        {/* ANGLE PICKER */}
        {(props.data.gradientType === "linear" ||
          props.data.gradientType === "conic") && (
          <div className="flex justify-between p-3 items-center border-b ">
            <div className="flex flex-row gap-4 w-full items-center">
              <Label className="text-xs font-semibold text-neutral-800 dark:text-neutral-400 flex gap-2">
                <DraftingCompass
                  size={16}
                  strokeWidth={2.25}
                  className=" text-neutral-600 dark:text-neutral-500 -rotate-90"
                />{" "}
                <span>Angle</span>
              </Label>
              <Slider
                value={[props.data.angle]}
                max={360}
                min={0}
                step={5}
                id="precision"
                className="h-9"
                onValueChange={(e) =>
                  props.setSchema({ ...props.data, angle: e[0] })
                }
              />
              <Input
                value={props.data.angle}
                max={360}
                min={0}
                prefix="°"
                onChange={(e) =>
                  props.setSchema({
                    ...props.data,
                    angle: Number(e.target.value),
                  })
                }
                className="w-12 text-xs text-neutral-800 dark:text-neutral-400 font-medium"
              />
            </div>
          </div>
        )}

        {/* EASING CURVE */}
        {props.data.gradientType !== "mesh" && (
          <div className="flex justify-between gap-2 p-3 items-center border-b ">
            <div className="flex flex-row justify-between w-full items-center">
              <Label className="text-xs font-semibold text-neutral-800 dark:text-neutral-400 flex gap-2">
                <Spline
                  size={16}
                  strokeWidth={2.25}
                  className=" text-neutral-600 dark:text-neutral-500"
                />{" "}
                <span>Easing Curve</span>
              </Label>
              <Select
                value={props.data?.easing}
                onValueChange={(value) =>
                  props.setSchema({ ...props.data, easing: value as string })
                }
              >
                <SelectTrigger className="w-[250px] font-medium text-neutral-600 dark:text-neutral-400">
                  <SelectValue
                    placeholder={
                      (props.data.easing &&
                        props.data.easing[0].toUpperCase() +
                          props.data.easing.slice(1)) ||
                      props.easingCurves[0][0].toUpperCase() +
                        props.easingCurves[0].slice(1)
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {props.easingCurves.map((curve) => (
                    <SelectItem
                      key={curve}
                      value={curve}
                      className="text-sm font-medium text-neutral-400"
                    >
                      {curve[0].toUpperCase() + curve.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* GRAIN SLIDER*/}
        <div className="flex flex-row gap-4 p-3 items-center">
          <Label className="text-xs font-semibold text-neutral-800 dark:text-neutral-400  flex items-center gap-2 text-nowrap">
            <Sparkles
              size={16}
              strokeWidth={2.25}
              className=" text-neutral-600 dark:text-neutral-500"
            />{" "}
            <span>Noise</span>
          </Label>
          <Slider
            value={[props.data.grain || 0]}
            max={2000}
            step={1}
            id="precision"
            onValueChange={(e) =>
              props.setSchema({ ...props.data, grain: e[0] })
            }
            className="w-full"
          />
          <Input
            value={props.data.grain}
            max={2000}
            min={0}
            onChange={(e) =>
              props.setSchema({ ...props.data, grain: Number(e.target.value) })
            }
            className="w-16 h-8 text-xs text-neutral-800 dark:text-neutral-400 font-medium"
          />
        </div>

        {/* TOOLBAR */}
        <div className="font-semibold flex w-full p-3 z-30 items-center justify-between sticky bottom-0 bg-white dark:bg-zinc-950 border-t">
          <div className="flex gap-2">
            <ToolTip showInfoIcon={false} asChild={true} tooltipText="Undo">
              <Button
                variant="outline"
                size="icon"
                onClick={props.undo}
                disabled={!props.canUndo}
              >
                <Undo
                  size={16}
                  strokeWidth={2.25}
                  className=" text-neutral-600 dark:text-neutral-400"
                />
              </Button>
            </ToolTip>

            <ToolTip showInfoIcon={false} asChild={true} tooltipText="Redo">
              <Button
                variant="outline"
                size="icon"
                onClick={props.redo}
                disabled={!props.canRedo}
              >
                <Redo
                  size={16}
                  strokeWidth={2.25}
                  className=" text-neutral-600 dark:text-neutral-400"
                />
              </Button>
            </ToolTip>
          </div>

          <Dialog open={props.isOpen} onOpenChange={props.setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <span>Export</span>
                <Download
                  size={16}
                  strokeWidth={2.25}
                  className=" text-neutral-500 dark:text-neutral-400"
                />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[725px] h-full md:h-auto md:max-w-[1295px]">
              <DialogHeader>
                <DialogTitle>Export Gradient</DialogTitle>
                <DialogDescription>
                  Export your gradient as CSS, SVG, or PNG
                </DialogDescription>
              </DialogHeader>
              <GradientCSS schema={props.data} />
              <DialogFooter>
                <Button onClick={() => props.setIsOpen(false)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
