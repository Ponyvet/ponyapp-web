import type { Column } from '@tanstack/react-table'
import { ArrowDown, ArrowUp } from 'lucide-react'
import type { ComponentProps } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SortableColumnProps<T> extends Omit<
  ComponentProps<typeof Button>,
  'variant' | 'onClick'
> {
  column: Column<T>
}

const SortableColumn = <T,>({
  children,
  column,
  ...buttonProps
}: SortableColumnProps<T>) => {
  const getSortedIcon = () => {
    if (column.getIsSorted() === 'asc') {
      return <ArrowUp className="h-4 w-4" />
    }
    if (column.getIsSorted() === 'desc') {
      return <ArrowDown className="h-4 w-4" />
    }
    return null
  }

  const handleOnSort = () => {
    column.toggleSorting()
  }

  return (
    <Button
      {...buttonProps}
      variant="ghost"
      onClick={handleOnSort}
      className={cn(
        'flex items-center gap-1 p-0 has-[>svg]:px-0',
        buttonProps.className,
      )}
    >
      {children}
      {getSortedIcon()}
    </Button>
  )
}

export default SortableColumn
