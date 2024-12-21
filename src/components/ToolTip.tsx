import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RxInfoCircled } from "react-icons/rx";

export default function ToolTip({
  tooltipText,
  asChild,
  showInfoIcon,
  children,
}: {
  tooltipText: string;
  asChild?: boolean;
  showInfoIcon?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild={asChild}>
          {showInfoIcon ? (
            <RxInfoCircled className="text-primary/50" />
          ) : (
            children
          )}
        </TooltipTrigger>
        <TooltipContent>{tooltipText}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
