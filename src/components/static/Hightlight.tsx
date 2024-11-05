import { RoughNotation } from "react-rough-notation";
import { HighlightProps } from "@/lib/types";

export default function Highlight({ children, type, order }: HighlightProps) {
  return (
    <RoughNotation
      type={type}
      order={order}
      color="#5f58ff"
      animate
      multiline={true}
    >
      {children}
    </RoughNotation>
  );
}
