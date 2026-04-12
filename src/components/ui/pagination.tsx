import type { ButtonProps } from '@/components/ui/button'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    role="navigation"
    {...props}
  />
)

const PaginationContent: React.FC<
  { ref?: React.Ref<HTMLUListElement> } & React.HTMLAttributes<HTMLUListElement>
> = ({ className, ref, ...props }) => (
  <ul className={cn('flex flex-row items-center gap-1', className)} ref={ref} {...props} />
)

const PaginationItem: React.FC<
  { ref?: React.Ref<HTMLLIElement> } & React.HTMLAttributes<HTMLLIElement>
> = ({ className, ref, ...props }) => <li className={cn('', className)} ref={ref} {...props} />

type PaginationLinkProps = {
  isActive?: boolean
  disabled?: boolean
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<typeof Link>

const PaginationLink = ({ className, isActive, disabled, size = 'icon', ...props }: PaginationLinkProps) => (
  <Link
    aria-current={isActive ? 'page' : undefined}
    aria-disabled={disabled}
    tabIndex={disabled ? -1 : undefined}
    className={cn(
      buttonVariants({
        size,
        variant: isActive ? 'outline' : 'ghost',
      }),
      disabled && 'pointer-events-none opacity-50',
      className,
    )}
    {...props}
    href={disabled ? '#' : props.href}
  />
)

const PaginationPrevious = ({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => {
  return (
    // SEO benefit: 'rel="prev"' allows search engines to understand pagination sequences, improving crawlability of historical content.
    <PaginationLink
      aria-label="Go to previous page"
      className={cn('gap-1 pl-2.5', className)}
      size="default"
      disabled={disabled}
      rel={!disabled ? 'prev' : undefined}
      {...props}
    >
      <ChevronLeft className="size-4" />
      <span>Previous</span>
    </PaginationLink>
  )
}

const PaginationNext = ({ className, disabled, ...props }: React.ComponentProps<typeof PaginationLink>) => {
  return (
    // SEO benefit: 'rel="next"' allows search engines to follow pagination sequences to index deeper pages.
    <PaginationLink
      aria-label="Go to next page"
      className={cn('gap-1 pr-2.5', className)}
      size="default"
      disabled={disabled}
      rel={!disabled ? 'next' : undefined}
      {...props}
    >
      <span>Next</span>
      <ChevronRight className="size-4" />
    </PaginationLink>
  )
}

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <MoreHorizontal className="size-4" />
    <span className="sr-only">More pages</span>
  </span>
)

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
