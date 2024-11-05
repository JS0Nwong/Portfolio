import { useState, Fragment } from "react";
import { Button } from "@/components/ui/button";
import chroma from "chroma-js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RxHeart, RxStar, RxDownload, RxSun, RxMoon } from "react-icons/rx";

export default function Menubar({
  gradientType,
  angle,
  x,
  y,
  colors,
  interpolation,
  precision,
}: {
  gradientType: string;
  angle?: number;
  x?: number;
  y?: number;
  colors: string[];
  interpolation: chroma.InterpolationMode | 'lch';
  precision?: number | 8;
  
}) {
  const [isExportOpen, setIsExportOpen] = useState(false);

  return (
    <div className=" flex flex-initial justify-between items-center p-4 pb-0 bg-background ">
      <h1 className="font-semibold text-xl tracking-tight">
        <span className="hidden md:inline-block">Radiant Graidents</span>
        <span className="inline-block md:hidden">RG</span>
      </h1>
      <p className="text-xs hidden md:inline-block text-neutral-500 font-medium">
        Hit space to randomize colors!
      </p>
      <div className="flex gap-2">
        <Button variant="ghost" >
          {" "}
          <RxMoon className="mr-2" /> Theme
        </Button>

        <Button variant="ghost">
          {" "}
          <RxHeart className="mr-2" /> Save
        </Button>

        <Dialog open={isExportOpen} onOpenChange={setIsExportOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost">
              {" "}
              <RxDownload className="mr-2" /> Export
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] md:max-w-[650px]">
            <DialogHeader>
              <DialogTitle>Export Gradient</DialogTitle>
              <DialogDescription>
                Export your gradient as CSS, SVG, or PNG
              </DialogDescription>
            </DialogHeader>
            <div className="bg-zinc-900 rounded-md p-4 w-full h-full">
              <pre>
                <code className="grid gap-1 text-sm text-muted-foreground [&amp;_span]:h-4">
                  <span>
                    <span className="text-yellow-300">.gradient</span> {"{"}
                  </span>
                  <span className="text-sky-300">
                    {"  "}
                    background:{" "}
                    <span className="text-yellow-200">
                      {gradientType}-gradient(
                      {gradientType === "linear" ? (
                        <span className="text-green-300">{angle}deg, </span>
                      ) : gradientType === "radial" ? (
                        <span className="text-orange-300">
                          circle <span className="text-neutral-300">at</span>{" "}
                          <span className="text-green-300">
                            {x}% {y}%
                          </span>
                          ,{" "}
                        </span>
                      ) : (
                        `from ${angle}deg at ${x}% ${y}%, `
                      )}
                      <span className="text-orange-300">
                        {chroma
                          .scale(colors.filter((color) => color !== ""))
                          .mode(interpolation)
                          .colors(precision)
                          .map((color) => {
                            const colorToRGB = chroma(color).rgb();
                            return (
                              <Fragment key={color}>
                                <br />
                                {"    "}
                                rgb({colorToRGB[0]}, {colorToRGB[1]},{" "}
                                {colorToRGB[2]}),
                              </Fragment>
                            );
                          })}
                      </span>
                      <br />
                      {"  "});
                    </span>
                  </span>
                  {"}"}
                </code>
              </pre>
            </div>
            <DialogFooter>
              <Button type="submit">Copy</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button variant="ghost">
          <RxStar className="mr-2" /> Favorites
        </Button>
      </div>
    </div>
  );
}
