"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
<<<<<<< HEAD
      className={cn("relative", className)}
=======
      className={cn("relative overflow-hidden rounded-[inherit]", className)}
>>>>>>> e4904b7e (Update data aplikasi)
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
<<<<<<< HEAD
      <ScrollAreaPrimitive.Corner />
=======
      <ScrollAreaPrimitive.Corner className="bg-slate-100" />
>>>>>>> e4904b7e (Update data aplikasi)
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
<<<<<<< HEAD
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" &&
          "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent",
=======
        "flex touch-none p-px transition-colors select-none bg-transparent",
        orientation === "vertical" &&
          "h-full w-3 border-l border-l-transparent",
        orientation === "horizontal" &&
          "h-3 flex-col border-t border-t-transparent",
>>>>>>> e4904b7e (Update data aplikasi)
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
<<<<<<< HEAD
        className="bg-border relative flex-1 rounded-full"
=======
        className="bg-slate-300/80 hover:bg-slate-400/90 relative flex-1 rounded-full"
>>>>>>> e4904b7e (Update data aplikasi)
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }
