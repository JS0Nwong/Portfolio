import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RxCross2, RxUpload, RxDownload } from "react-icons/rx";
import { Schema, Color } from "@/lib/types";
import chroma from 'chroma-js';

interface GradientCardProps {
  gradient: Schema;
  onRemove: () => void;
  onSelect: () => void;
}

export default function GradientCard({
  gradient,
  onRemove,
  onSelect,
}: GradientCardProps) {
  const svgUrl = `data:image/svg+xml,%3C!-- svg: first layer --%3E%3Csvg viewBox='0 0 ${gradient.grain} ${gradient.grain}' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E`;

  const getGradientBackground = () => {
    if (gradient.gradientType === "mesh") {
      return gradient.colors
        .filter((color: Color) => !color.isHidden)
        .map(
          (color: Color) =>
            `radial-gradient(at ${color.pos?.x}% ${color.pos?.y}%, ${color.color} 0px, transparent 50%)`
        )
        .join(", ");
    }

    const gradientParams = {
      linear: `${gradient.angle}deg`,
      radial: `circle at ${gradient.x}% ${gradient.y}%`,
      conic: `from ${gradient.angle}deg at ${gradient.x}% ${gradient.y}%`,
    }[gradient.gradientType];

    const colorStops = chroma
      .scale(
        gradient.colors
          .filter((color: Color) => !color.isHidden)
          .map((color: Color) => color.color)
      )
      .mode(gradient.interpolation as chroma.InterpolationMode)
      .colors(gradient.precision);

    return `${gradient.gradientType}-gradient(${gradientParams} in hsl ${gradient.interpolationDistance} hue, ${colorStops})`;
  };

  return (
    <div className="flex items-center justify-center h-48 bg-zinc-100 dark:bg-zinc-900 border p-1.5 rounded-lg w-full">
      <div
        className="relative flex items-center h-full rounded justify-between w-full group"
        style={{
          backgroundImage: `url("${svgUrl}"), ${getGradientBackground()}`,
        }}
      >
        <div className="absolute bottom-1 left-1">
          <Badge>{gradient.gradientType} gradient</Badge>
          {gradient.isAnimated && <Badge className="ml-2">animated</Badge>}
        </div>
        <div className="absolute backdrop-blur-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex rounded-lg bg-neutral-400/20 p-2 gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-red-500/75"
            onClick={onRemove}
          >
            <RxCross2 />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-accent-foreground/30"
            onClick={onSelect}
          >
            <RxUpload />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-accent-foreground/30"
          >
            <RxDownload />
          </Button>
        </div>
      </div>
    </div>
  );
}
