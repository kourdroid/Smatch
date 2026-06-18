import { cn } from '@/utilities/ui'
import * as React from 'react'

const Input: React.FC<
  {
    ref?: React.Ref<HTMLInputElement>
  } & React.InputHTMLAttributes<HTMLInputElement>
> = ({ type, className, ref, ...props }) => {
  return (
    <input
      className={cn(
        'flex h-12 w-full rounded border border-white/10 bg-zinc-900/50 px-4 py-2 text-sm text-white ring-offset-black file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-smatch-gold focus-visible:border-smatch-gold disabled:cursor-not-allowed disabled:opacity-50 transition duration-200',
        className,
      )}
      ref={ref}
      type={type}
      {...props}
    />
  )
}

export { Input }
