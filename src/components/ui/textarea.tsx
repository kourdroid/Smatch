import { cn } from '@/utilities/ui'
import * as React from 'react'

const Textarea: React.FC<
  {
    ref?: React.Ref<HTMLTextAreaElement>
  } & React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = ({ className, ref, ...props }) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[120px] w-full rounded border border-white/10 bg-zinc-900/50 px-4 py-3 text-sm text-white ring-offset-black placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-smatch-gold focus-visible:border-smatch-gold disabled:cursor-not-allowed disabled:opacity-50 transition duration-200',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}

export { Textarea }
