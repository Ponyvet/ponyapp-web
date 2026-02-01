import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { Link } from 'react-router'
import { PlusIcon, CalendarIcon } from 'lucide-react'
import { formatDate } from 'date-fns'

import { Button } from '@/shared/components/ui/button'
import EmptyTable from '@/shared/components/EmptyTable'
import { DEFAULT_PAGE_SIZE, START_PAGE_INDEX } from '@/shared/utils/const'
import {
  ServerDataTable,
  type ServerSideState,
} from '@/shared/components/ServerDataTable'

import DetailsButton from '../components/visits/DetailsButton'
import EditButton from '../components/visits/EditButton'
import DeleteButton from '../components/visits/DeleteButton'
import useGetVisits from '../queries/useGetVisits'
import type { Visit } from '../models/Visit'
import type { VisitsParams } from '../models/VisitsParams'

const columns: ColumnDef<Visit>[] = [
  {
    accessorKey: 'date',
    header: 'Fecha',
    enableSorting: true,
    cell: ({ row }) => {
      const date = row.original.date
      return <span>{formatDate(date, 'dd/MM/yyyy')}</span>
    },
  },
  {
    accessorKey: 'clientId',
    header: 'Cliente',
    cell: ({ row }) => (
      <Link
        to={`/visits/${row.original.id}`}
        className="font-medium hover:underline"
      >
        {row.original.client.name}
      </Link>
    ),
  },
  {
    accessorKey: 'veterinarianId',
    header: 'Veterinario',
    cell: ({ row }) => row.original.veterinarian.name,
  },
  {
    accessorKey: 'consultations',
    header: 'Consultas',
    cell: ({ row }) => {
      const consultations = row.original.consultations ?? []
      return (
        <span className="text-muted-foreground">
          {consultations.length} consulta{consultations.length !== 1 ? 's' : ''}
        </span>
      )
    },
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => (
      <div>
        <DetailsButton visit={row.original} />
        <EditButton visit={row.original} />
        <DeleteButton visit={row.original} />
      </div>
    ),
  },
]

const VisitsPage = () => {
  const navigate = useNavigate()
  const [params, setParams] = useState<VisitsParams>({
    page: START_PAGE_INDEX,
    limit: DEFAULT_PAGE_SIZE,
  })

  const { data, isLoading } = useGetVisits(params)

  const handleStateChange = useCallback((state: ServerSideState) => {
    setParams({
      page: state.page,
      limit: state.limit,
      sortBy: state.sortBy as VisitsParams['sortBy'],
      sortOrder: state.sortOrder,
    })
  }, [])

  const visits = data?.data ?? []
  const showEmptyState =
    !isLoading && visits.length === 0 && params.page === 1
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
          <h1 className="text-2xl font-bold">Visitas</h1>
        </div>
        <EmptyTable
          icon={<CalendarIcon className="h-12 w-12" />}
          title="No hay visitas registradas"
          description="Agrega tu primera visita para comenzar."
          buttonText={
            <>
              <PlusIcon className="mr-2 h-4 w-4" />
              Agregar visita
            </>
          }
          onclick={() => navigate('/visits/add')}
        />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Visitas</h1>
        <Button size="sm" onClick={() => navigate('/visits/add')}>
          <PlusIcon />
          Agregar
        </Button>
      </div>
      <ServerDataTable
        columns={columns}
        data={visits}
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

export default VisitsPage
