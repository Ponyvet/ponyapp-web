import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type VisibilityState,
  type SortingState,
  type ColumnFiltersState,
} from '@tanstack/react-table'

import { PAGE_SIZE_OPTIONS } from '../utils/const'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table'
import { useState, useEffect, useCallback } from 'react'
import { ChevronDown } from 'lucide-react'

import { Input } from '@/shared/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { Button } from '@/shared/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import { useTranslation } from 'react-i18next'
import { useDebounce } from '../hooks/use-debounce'
import TablePagination from './TablePagination'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog'
import { Field, FieldLabel } from '@/shared/components/ui/field'
import { Skeleton } from './ui/skeleton'
import { useIsMobile } from '../hooks/use-mobile'
import { MobileCardView, type MobileCardField } from './MobileCardView'

export interface ServerSideState {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filters?: Record<string, string | number | boolean>
}

export interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface MobileConfig<TData> {
  fields: MobileCardField<TData>[]
  onItemClick?: (item: TData) => void
  renderActions?: (item: TData) => React.ReactNode
  getItemId: (item: TData) => string
}

interface ServerDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pagination: PaginationInfo
  isLoading?: boolean
  onStateChange: (state: ServerSideState) => void
  initialColumnVisibility?: VisibilityState
  filterConfig?: {
    searchPlaceholder?: string
    searchBy?: string
    filters?: Array<{
      key: keyof TData extends string ? keyof TData : string
      label: string
      type: 'select' | 'input'
      options?: Array<{ label: string; value: string }>
    }>
  }
  pageSizeOptions?: number[]
  mobileConfig?: MobileConfig<TData>
}

export function ServerDataTable<TData, TValue>({
  columns,
  data,
  pagination,
  isLoading = false,
  onStateChange,
  initialColumnVisibility = {},
  filterConfig,
  pageSizeOptions = PAGE_SIZE_OPTIONS,
  mobileConfig,
}: ServerDataTableProps<TData, TValue>) {
  const { t } = useTranslation('shared')
  const isMobile = useIsMobile()
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    initialColumnVisibility,
  )
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [searchValue, setSearchValue] = useState('')

  // Debounce search input
  const debouncedSearchValue = useDebounce(searchValue, 300)

  // Create filters object from column filters and search
  const getFiltersObject = useCallback(() => {
    const filters: Record<string, string | number | boolean> = {}

    // Add search filter
    if (debouncedSearchValue && filterConfig?.searchBy) {
      filters[filterConfig.searchBy] = debouncedSearchValue
    }

    // Add column filters
    columnFilters.forEach((filter) => {
      if (filter.value) {
        filters[filter.id] = filter.value as string | number | boolean
      }
    })

    return filters
  }, [debouncedSearchValue, filterConfig?.searchBy, columnFilters])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    pageCount: pagination.totalPages,
    state: {
      columnVisibility,
      sorting,
      columnFilters,
      pagination: {
        pageIndex: pagination.page - 1,
        pageSize: pagination.limit,
      },
    },
  })

  // Handle state changes
  useEffect(() => {
    const sortedColumn = sorting[0]
    const filters = getFiltersObject()

    onStateChange({
      page: pagination.page,
      limit: pagination.limit,
      sortBy: sortedColumn?.id,
      sortOrder: sortedColumn?.desc ? 'desc' : 'asc',
      filters: Object.keys(filters).length > 0 ? filters : undefined,
    })
  }, [
    sorting,
    debouncedSearchValue,
    columnFilters,
    pagination.page,
    pagination.limit,
    onStateChange,
    filterConfig?.searchBy,
    getFiltersObject,
  ])

  const handlePageChange = (newPage: number) => {
    const filters = getFiltersObject()
    onStateChange({
      page: newPage,
      limit: pagination.limit,
      sortBy: sorting[0]?.id,
      sortOrder: sorting[0]?.desc ? 'desc' : 'asc',
      filters: Object.keys(filters).length > 0 ? filters : undefined,
    })
  }

  const handlePageSizeChange = (newSize: string) => {
    const filters = getFiltersObject()
    onStateChange({
      page: 1,
      limit: parseInt(newSize),
      sortBy: sorting[0]?.id,
      sortOrder: sorting[0]?.desc ? 'desc' : 'asc',
      filters: Object.keys(filters).length > 0 ? filters : undefined,
    })
  }

  const showMobileView = isMobile && mobileConfig

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 py-4">
        {filterConfig?.searchBy && (
          <Input
            placeholder={filterConfig.searchPlaceholder || 'Buscar...'}
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            className="w-full sm:max-w-sm"
            disabled={isLoading}
          />
        )}

        <div className="flex items-center gap-2 justify-end">
          {filterConfig?.filters && filterConfig.filters.length > 0 && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" disabled={isLoading} type="button">
                  Filtros
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Configuración de Filtros</DialogTitle>
                  <DialogDescription>
                    Ajusta los filtros para refinar los datos mostrados en la
                    tabla.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  {filterConfig.filters.map((filter) => (
                    <Field key={filter.key}>
                      <FieldLabel
                        className="text-sm font-medium"
                        htmlFor={filter.key}
                      >
                        {filter.label}:
                      </FieldLabel>
                      {filter.type === 'select' && filter.options ? (
                        <Select
                          value={
                            (table
                              .getColumn(filter.key)
                              ?.getFilterValue() as string) ?? ''
                          }
                          onValueChange={(value) => {
                            table
                              .getColumn(filter.key)
                              ?.setFilterValue(value === 'all' ? '' : value)
                          }}
                          disabled={isLoading}
                          name={filter.key}
                        >
                          <SelectTrigger className="w-35">
                            <SelectValue placeholder="Todos" />
                          </SelectTrigger>
                          <SelectContent id={filter.key}>
                            <SelectItem value="all">Todos</SelectItem>
                            {filter.options.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          id={filter.key}
                          placeholder={`Filtrar por ${filter.label.toLowerCase()}`}
                          value={
                            (table
                              .getColumn(filter.key)
                              ?.getFilterValue() as string) ?? ''
                          }
                          onChange={(event) =>
                            table
                              .getColumn(filter.key)
                              ?.setFilterValue(event.target.value)
                          }
                          className="max-w-xs"
                          disabled={isLoading}
                        />
                      )}
                    </Field>
                  ))}
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      table.resetColumnFilters()
                    }}
                  >
                    Limpiar
                  </Button>
                  <DialogClose>
                    <Button type="button">Aceptar</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

          {/* Column Visibility - hidden on mobile */}
          {!showMobileView && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" disabled={isLoading}>
                  Columnas <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {t(`table.columns.${column.id}`)}
                      </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Mobile Card View */}
      {showMobileView ? (
        <MobileCardView
          data={data}
          fields={mobileConfig.fields}
          isLoading={isLoading}
          loadingCount={pagination.limit}
          onItemClick={mobileConfig.onItemClick}
          renderActions={mobileConfig.renderActions}
          getItemId={mobileConfig.getItemId}
        />
      ) : (
        <div className="overflow-hidden rounded-md border">
          <Table>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: pagination.limit }).map((_, index) => (
                <TableRow key={index}>
                  {columns.map((_, cellIndex) => (
                    <TableCell key={cellIndex}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No se encontraron datos.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </div>
      )}
      <TablePagination
        pagination={pagination}
        pageSizeOptions={pageSizeOptions}
        isLoading={isLoading}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  )
}
