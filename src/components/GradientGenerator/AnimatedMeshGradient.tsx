import React, { useMemo } from "react";
import { Schema } from "@/lib/types";
import {
  generateCSSKeyframes,
  generateGradientStyles,
} from "@/lib/generateKeyframes";

interface AnimatedMeshGradientProps {
  schema: Schema;
  className?: string;
}

const AnimatedMeshGradient: React.FC<AnimatedMeshGradientProps> = ({
  schema,
  className,
}) => {
  const cssKeyframes = useMemo(() => generateCSSKeyframes(schema), [schema]);
  const gradientStyles = useMemo(
    () => generateGradientStyles(schema),
    [schema]
  );

  return (
    <>
      <div id="gradient-container" className={className} />
      <style>{`
        ${cssKeyframes}
        ${gradientStyles}
      `}</style>
    </>
  );
};

export default AnimatedMeshGradient;
