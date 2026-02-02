import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { Link } from 'react-router'
import { PlusIcon, PackageIcon } from 'lucide-react'
import { formatDate } from 'date-fns'

import { Button } from '@/shared/components/ui/button'
import EmptyTable from '@/shared/components/EmptyTable'
import { DEFAULT_PAGE_SIZE, START_PAGE_INDEX } from '@/shared/utils/const'
import {
  ServerDataTable,
  type ServerSideState,
} from '@/shared/components/ServerDataTable'

import DetailsButton from '../components/inventory/DetailsButton'
import EditButton from '../components/inventory/EditButton'
import DeleteButton from '../components/inventory/DeleteButton'
import useGetInventory from '../queries/useGetInventory'
import type { InventoryItem } from '../models/InventoryItem'
import type { InventoryParams } from '../models/InventoryParams'
import { inventoryCategoryLabels } from '../utils/catalogs'

const columns: ColumnDef<InventoryItem>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
    enableSorting: true,
    cell: ({ row }) => (
      <Link
        to={`/inventory/${row.original.id}`}
        className="font-medium hover:underline"
      >
        {row.original.name}
      </Link>
    ),
  },
  {
    accessorKey: 'category',
    header: 'Categoría',
    cell: ({ row }) => inventoryCategoryLabels[row.original.category],
  },
  {
    accessorKey: 'quantity',
    header: 'Cantidad',
    enableSorting: true,
    cell: ({ row }) => (
      <span>
        {row.original.quantity} {row.original.unit}
      </span>
    ),
  },
  {
    accessorKey: 'expirationDate',
    header: 'Caducidad',
    enableSorting: true,
    cell: ({ row }) => {
      const date = row.original.expirationDate
      if (!date) return <span className="text-muted-foreground">-</span>
      return <span>{formatDate(date, 'dd/MM/yyyy')}</span>
    },
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => (
      <div>
        <DetailsButton item={row.original} />
        <EditButton item={row.original} />
        <DeleteButton item={row.original} />
      </div>
    ),
  },
]

const InventoryPage = () => {
  const navigate = useNavigate()
  const [params, setParams] = useState<InventoryParams>({
    page: START_PAGE_INDEX,
    limit: DEFAULT_PAGE_SIZE,
  })

  const { data, isLoading } = useGetInventory(params)

  const handleStateChange = useCallback((state: ServerSideState) => {
    setParams({
      page: state.page,
      limit: state.limit,
      sortBy: state.sortBy as InventoryParams['sortBy'],
      sortOrder: state.sortOrder,
    })
  }, [])

  const items = data?.data ?? []
  const showEmptyState =
    !isLoading && items.length === 0 && params.page === 1
  const pagination = data?.pagination ?? {
    page: START_PAGE_INDEX,
    limit: DEFAULT_PAGE_SIZE,
    total: 0,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
  }

  if (showEmptyState) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Inventario</h1>
        </div>
        <EmptyTable
          icon={<PackageIcon className="h-12 w-12" />}
          title="No hay artículos registrados"
          description="Agrega tu primer artículo al inventario para comenzar."
          buttonText={
            <>
              <PlusIcon className="mr-2 h-4 w-4" />
              Agregar artículo
            </>
          }
          onclick={() => navigate('/inventory/add')}
        />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Inventario</h1>
        <Button size="sm" onClick={() => navigate('/inventory/add')}>
          <PlusIcon />
          Agregar
        </Button>
      </div>
      <ServerDataTable
        columns={columns}
        data={items}
        pagination={pagination}
        isLoading={isLoading}
        onStateChange={handleStateChange}
        filterConfig={{
          searchPlaceholder: 'Buscar...',
          filters: [],
        }}
      />
    </div>
  )
}

export default InventoryPage
