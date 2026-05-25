import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import * as React from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        clear: '',
        default: 'h-10 px-4 py-2',
        icon: 'size-10',
        lg: 'h-11 rounded px-8',
        sm: 'h-9 rounded px-3',
      },
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost: 'hover:bg-card hover:text-accent-foreground',
        link: 'items-start justify-start text-primary underline-offset-4 hover:underline',
        outline: 'border border-border bg-background hover:bg-card hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        gold: 'bg-smatch-gold font-bold text-smatch-black hover:bg-smatch-gold-light',
        'outline-gold': 'border border-smatch-gold text-smatch-gold hover:bg-smatch-gold/10',
      },
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  ref?: React.Ref<HTMLButtonElement>
}

const Button: React.FC<ButtonProps> = ({
  asChild = false,
  className,
  size,
  variant,
  isLoading = false,
  children,
  ref,
  ...props
}) => {
  if (asChild) {
    return (
      <Slot className={cn(buttonVariants({ className, size, variant }))} ref={ref} {...props}>
        {children}
      </Slot>
    )
  }

  return (
    <button
      type={props.type || 'button'}
      className={cn(buttonVariants({ className, size, variant }))}
      disabled={isLoading || props.disabled}
      ref={ref}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
      {children}
    </button>
  )
}

export { Button, buttonVariants }
