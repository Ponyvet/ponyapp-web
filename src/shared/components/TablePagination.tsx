import { Button } from '@/shared/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import { ChevronsRight, ChevronLeft, ChevronRight } from 'lucide-react'
import type { PaginationInfo } from './ServerDataTable'

interface TablePaginationProps {
  pagination: PaginationInfo
  pageSizeOptions: number[]
  isLoading: boolean
  onPageChange: (page: number) => void
  onPageSizeChange: (size: string) => void
}

const TablePagination = ({
  pagination,
  pageSizeOptions,
  isLoading,
  onPageChange,
  onPageSizeChange,
}: TablePaginationProps) => {
  return (
    <div className="flex items-center justify-between space-x-2 py-4">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Filas por página:</p>
        <Select
          value={pagination.limit.toString()}
          onValueChange={onPageSizeChange}
          disabled={isLoading}
        >
          <SelectTrigger className="h-8 w-18">
            <SelectValue />
          </SelectTrigger>
          <SelectContent side="top">
            {pageSizeOptions.map((pageSize) => (
              <SelectItem key={pageSize} value={pageSize.toString()}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex items-center justify-center text-sm font-medium">
          Página {pagination.page} de {pagination.totalPages} (
          {pagination.total} elementos)
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(1)}
            disabled={pagination.page === 1 || isLoading}
          >
            <span className="sr-only">Primera página</span>
            <ChevronsRight className="h-4 w-4 rotate-180" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={!pagination.hasPrev || isLoading}
          >
            <span className="sr-only">Página anterior</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={!pagination.hasNext || isLoading}
          >
            <span className="sr-only">Siguiente página</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(pagination.totalPages)}
            disabled={pagination.page === pagination.totalPages || isLoading}
          >
            <span className="sr-only">Última página</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TablePagination
