import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import type { ComponentProps } from "react"
import { cn } from "@/src/lib/utils"

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all will-change-transform active:hover:scale-[0.98] active:hover:transform cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	{
		variants: {
			variant: {
				default: 'bg-blue-800 text-white hover:bg-blue-900',
				outline: 'border-2 border-blue-800 text-blue-800 hover:bg-blue-900/10',
				secondary:
					'bg-blue-800/10 text-blue-800 hover:bg-blue-800/20',
				ghost: 'text-blue-800 hover:text-blue-900 hover:bg-blue-800/10',
				gradient:
					'bg-gradient-to-r text-white from-blue-800 to-purple-800 hover:from-blue-800/90 hover:to-purple-800/90'
			},
			size: {
				default: 'h-10 px-4 py-2 has-[>svg]:px-3',
				sm: 'h-9 rounded-lg gap-1.5 px-5 has-[>svg]:px-2.5',
				lg: 'h-12 px-6 has-[>svg]:px-4',
				icon: 'size-9'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
