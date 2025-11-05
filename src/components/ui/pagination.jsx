import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const Pagination = ({ className, ...props }) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)

const PaginationContent = ({ className, ...props }) => (
  <ul className={cn("flex flex-row items-center gap-1", className)} {...props} />
)

const PaginationItem = ({ className, ...props }) => (
  <li className={cn("", className)} {...props} />
)

const PaginationPrevious = ({
  className,
  ...props
}) => (
  <button
    aria-label="Go to previous page"
    size="default"
    className={cn(buttonVariants({ variant: "outline" }), className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </button>
)

const PaginationNext = ({
  className,
  ...props
}) => (
  <button
    aria-label="Go to next page"
    size="default"
    className={cn(buttonVariants({ variant: "outline" }), className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </button>
)

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
}