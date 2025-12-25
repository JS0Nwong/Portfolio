import { Button } from "@/components/ui/button";
import chroma from "chroma-js";
import { Copy } from "lucide-react";
import { Schema } from "@/lib/types";
import hljs from "highlight.js/lib/core";
import css from "highlight.js/lib/languages/css";
import "highlight.js/styles/vs2015.css";

interface GradientCSSProps {
  schema: Schema;
}

export function GradientCSS({ schema }: GradientCSSProps) {
  hljs.registerLanguage("css", css);

  const gradientArea = document.getElementById("gradient-area");
  const bgColor = chroma(schema.bgColor).css("hsla");

  const bgImage = gradientArea?.style.backgroundImage;

  const highlightCode = hljs.highlight(
    `.gradient { \nbackground-color: ${bgColor};\nbackground-image: ${bgImage};\n}`,
    {
      language: "css",
    }
  ).value;

  return (
    <div className="bg-zinc-900 rounded-md p-4 w-full relative">
      <pre className="">
        <code
          className="text-wrap"
          dangerouslySetInnerHTML={{ __html: highlightCode }}
        />
      </pre>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-2 right-2 text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-100"
      >
        <Copy size={16} strokeWidth={2.25} />
      </Button>
    </div>
  );
}
