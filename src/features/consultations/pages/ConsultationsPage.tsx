import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { Link } from 'react-router'
import { PlusIcon, StethoscopeIcon } from 'lucide-react'
import { formatDate } from 'date-fns'

import { Button } from '@/shared/components/ui/button'
import EmptyTable from '@/shared/components/EmptyTable'
import { DEFAULT_PAGE_SIZE, START_PAGE_INDEX } from '@/shared/utils/const'
import {
  ServerDataTable,
  type ServerSideState,
} from '@/shared/components/ServerDataTable'

import DetailsButton from '../components/consultations/DetailsButton'
import EditButton from '../components/consultations/EditButton'
import DeleteButton from '../components/consultations/DeleteButton'
import useGetConsultations from '../queries/useGetConsultations'
import type { Consultation } from '../models/Consultation'
import type { ConsultationsParams } from '../models/ConsultationsParams'

const columns: ColumnDef<Consultation>[] = [
  {
    accessorKey: 'date',
    header: 'Fecha',
    enableSorting: true,
    cell: ({ row }) => {
      const date = row.original.visit.date
      return <span>{formatDate(date, 'dd/MM/yyyy')}</span>
    },
  },
  {
    accessorKey: 'recordId',
    header: 'Cartilla',
    cell: ({ row }) => (
      <Link
        to={`/consultations/${row.original.id}`}
        className="font-medium hover:underline"
      >
        {row.original.record.name}
      </Link>
    ),
  },
  {
    accessorKey: 'reason',
    header: 'Motivo',
    cell: ({ row }) => {
      const reason = row.original.reason
      if (!reason) return <span className="text-muted-foreground">--</span>
      return (
        <span className="line-clamp-1 max-w-[200px]" title={reason}>
          {reason}
        </span>
      )
    },
  },
  {
    accessorKey: 'veterinarianId',
    header: 'Veterinario',
    cell: ({ row }) => row.original.visit.veterinarian.name,
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => (
      <div>
        <DetailsButton consultation={row.original} />
        <EditButton consultation={row.original} />
        <DeleteButton consultation={row.original} />
      </div>
    ),
  },
]

const ConsultationsPage = () => {
  const navigate = useNavigate()
  const [params, setParams] = useState<ConsultationsParams>({
    page: START_PAGE_INDEX,
    limit: DEFAULT_PAGE_SIZE,
  })

  const { data, isLoading } = useGetConsultations(params)

  const handleStateChange = useCallback((state: ServerSideState) => {
    setParams({
      page: state.page,
      limit: state.limit,
      sortBy: state.sortBy as ConsultationsParams['sortBy'],
      sortOrder: state.sortOrder,
    })
  }, [])

  const consultations = data?.data ?? []
  const showEmptyState =
    !isLoading && consultations.length === 0 && params.page === 1
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
          <h1 className="text-2xl font-bold">Consultas</h1>
        </div>
        <EmptyTable
          icon={<StethoscopeIcon className="h-12 w-12" />}
          title="No hay consultas registradas"
          description="Agrega tu primera consulta para comenzar."
          buttonText={
            <>
              <PlusIcon className="mr-2 h-4 w-4" />
              Agregar consulta
            </>
          }
          onclick={() => navigate('/consultations/add')}
        />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Consultas</h1>
        <Button size="sm" onClick={() => navigate('/consultations/add')}>
          <PlusIcon />
          Agregar
        </Button>
      </div>
      <ServerDataTable
        columns={columns}
        data={consultations}
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

export default ConsultationsPage
