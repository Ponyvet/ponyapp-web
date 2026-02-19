import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { Link } from 'react-router'
import { PlusIcon, SyringeIcon } from 'lucide-react'
import { formatDate } from 'date-fns'

import { Button } from '@/shared/components/ui/button'
import EmptyTable from '@/shared/components/EmptyTable'
import { DEFAULT_PAGE_SIZE, START_PAGE_INDEX } from '@/shared/utils/const'
import {
  ServerDataTable,
  type ServerSideState,
} from '@/shared/components/ServerDataTable'

import DetailsButton from '../components/vaccinations/DetailsButton'
import EditButton from '../components/vaccinations/EditButton'
import DeleteButton from '../components/vaccinations/DeleteButton'
import useGetVaccinations from '../queries/useGetVaccinations'
import type { Vaccination } from '../models/Vaccination'
import type { VaccinationsParams } from '../models/VaccinationsParams'

const columns: ColumnDef<Vaccination>[] = [
  {
    accessorKey: 'appliedAt',
    header: 'Fecha de Aplicación',
    enableSorting: true,
    cell: ({ row }) => {
      const date = row.original.appliedAt
      if (!date) return <span>--</span>
      return <span>{formatDate(date, 'dd/MM/yyyy')}</span>
    },
  },
  {
    accessorKey: 'vaccineId',
    header: 'Vacuna',
    cell: ({ row }) => (
      <Link
        to={`/vaccinations/${row.original.id}`}
        className="font-medium hover:underline"
      >
        {row.original.medication.name}
      </Link>
    ),
  },
  {
    accessorKey: 'nextDueDate',
    header: 'Próxima Fecha',
    enableSorting: true,
    cell: ({ row }) => {
      const date = row.original.nextDueDate
      if (!date) return <span>--</span>
      return <span>{formatDate(date, 'dd/MM/yyyy')}</span>
    },
  },
  {
    accessorKey: 'veterinarianId',
    header: 'Veterinario',
    cell: ({ row }) => row.original.veterinarian.name,
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => (
      <div>
        <DetailsButton vaccination={row.original} />
        <EditButton vaccination={row.original} />
        <DeleteButton vaccination={row.original} />
      </div>
    ),
  },
]

const VaccinationsPage = () => {
  const navigate = useNavigate()
  const [params, setParams] = useState<VaccinationsParams>({
    page: START_PAGE_INDEX,
    limit: DEFAULT_PAGE_SIZE,
  })

  const { data, isLoading } = useGetVaccinations(params)

  const handleStateChange = useCallback((state: ServerSideState) => {
    setParams({
      page: state.page,
      limit: state.limit,
      sortBy: state.sortBy as VaccinationsParams['sortBy'],
      sortOrder: state.sortOrder,
      // status: state.filters?.status as VaccinationsParams['status'],
    })
  }, [])

  const vaccinations = data?.data ?? []
  const showEmptyState =
    !isLoading && vaccinations.length === 0 && params.page === 1
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
          <h1 className="text-2xl font-bold">Vacunaciones</h1>
        </div>
        <EmptyTable
          icon={<SyringeIcon className="h-12 w-12" />}
          title="No hay vacunaciones registradas"
          description="Agrega tu primera vacunación para comenzar."
          buttonText={
            <>
              <PlusIcon className="mr-2 h-4 w-4" />
              Agregar vacunación
            </>
          }
          onclick={() => navigate('/vaccinations/add')}
        />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Vacunaciones</h1>
        <Button size="sm" onClick={() => navigate('/vaccinations/add')}>
          <PlusIcon />
          Agregar
        </Button>
      </div>
      <ServerDataTable
        columns={columns}
        data={vaccinations}
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

export default VaccinationsPage
