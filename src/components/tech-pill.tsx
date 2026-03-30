import { Tooltip } from "@base-ui/react/tooltip";
import { cn } from "@/lib/utils";

export function TechPill({ item }: { item: { name: string; image?: string } }) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger
        type="button"
        delay={0}
        className={cn(
          "group relative flex size-12 shrink-0 cursor-default items-center justify-center overflow-hidden rounded-full border-0 bg-muted p-0 outline-none",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        )}
        aria-label={item.name}
      >
        {item.image ? (
          <img
            src={item.image}
            alt=""
            className={cn(
              "size-8 object-contain",
              item.name === "Express.js" && "brightness-0 invert"
            )}
          />
        ) : (
          <span className="px-1 text-center text-[9px] leading-tight text-muted-foreground">
            {item.name}
          </span>
        )}
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Positioner side="top" sideOffset={8} align="center">
          <Tooltip.Popup className="z-50 max-w-xs rounded-md border border-border/80 bg-popover px-2.5 py-1.5 text-xs font-medium text-popover-foreground shadow-md">
            {item.name}
          </Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
