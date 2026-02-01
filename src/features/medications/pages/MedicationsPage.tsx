import { useNavigate } from 'react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { Link } from 'react-router'
import { PlusIcon, PillIcon } from 'lucide-react'

import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
import EmptyTable from '@/shared/components/EmptyTable'
import useGetMedications from '../queries/useGetMedications'
import type { Medication } from '../models/Medication'
import { MEDICATION_CATEGORY_CATALOG, SPECIES_CATALOG } from '../utils/catalogs'
import { getLabelFromCatalog } from '@/shared/utils/helpers'
import type { MedicationsParams } from '../models/MedicationsParams'
import { DEFAULT_PAGE_SIZE, START_PAGE_INDEX } from '@/shared/utils/const'
import { useCallback, useState } from 'react'
import {
  ServerDataTable,
  type ServerSideState,
} from '@/shared/components/ServerDataTable'
import DetailsButton from '../components/medications/DetailsButton'
import EditButton from '../components/medications/EditButton'
import DeleteButton from '../components/medications/DeleteButton'

const columns: ColumnDef<Medication>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
    enableSorting: true,
    cell: ({ row }) => (
      <Link
        to={`/medications/${row.original.id}`}
        className="font-medium hover:underline"
      >
        {row.original.name}
      </Link>
    ),
  },
  {
    accessorKey: 'category',
    header: 'Categoría',
    enableSorting: true,
    cell: ({ row }) => {
      const category = row.original.category
      return (
        <Badge
          variant={
            category === 'VACCINE'
              ? 'default'
              : category === 'ANTIBIOTIC'
                ? 'secondary'
                : 'outline'
          }
        >
          {getLabelFromCatalog(category, MEDICATION_CATEGORY_CATALOG)}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'species',
    header: 'Especie',
    cell: ({ row }) =>
      row.original.species
        ? getLabelFromCatalog(row.original.species, SPECIES_CATALOG)
        : 'Todas',
  },
  {
    accessorKey: 'defaultIntervalDays',
    header: 'Intervalo (días)',
    cell: ({ row }) => row.original.defaultIntervalDays || '-',
  },
  {
    accessorKey: 'isActive',
    header: 'Estado',
    cell: ({ row }) => (
      <Badge variant={row.original.isActive ? 'default' : 'secondary'}>
        {row.original.isActive ? 'Activo' : 'Inactivo'}
      </Badge>
    ),
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => (
      <div>
        <DetailsButton medication={row.original} />
        <EditButton medication={row.original} />
        <DeleteButton medication={row.original} />
      </div>
    ),
  },
]

const MedicationsPage = () => {
  const navigate = useNavigate()
  const [params, setParams] = useState<MedicationsParams>({
    page: START_PAGE_INDEX,
    limit: DEFAULT_PAGE_SIZE,
  })

  const { data, isLoading } = useGetMedications(params)

  const handleStateChange = useCallback((state: ServerSideState) => {
    setParams({
      page: state.page,
      limit: state.limit,
      sortBy: state.sortBy as MedicationsParams['sortBy'],
      sortOrder: state.sortOrder,
      name: state.filters?.name as string | undefined,
    })
  }, [])

  const medications = data?.data ?? []
  const showEmptyState =
    !isLoading && medications.length === 0 && params.page === 1
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
          <h1 className="text-2xl font-bold">Medicamentos</h1>
        </div>
        <EmptyTable
          icon={<PillIcon className="h-12 w-12" />}
          title="No hay medicamentos registrados"
          description="Agrega tu primer medicamento para comenzar."
          buttonText={
            <>
              <PlusIcon className="mr-2 h-4 w-4" />
              Agregar medicamento
            </>
          }
          onclick={() => navigate('/medications/add')}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Medicamentos</h1>
        <Button onClick={() => navigate('/medications/add')}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Agregar
        </Button>
      </div>

      <ServerDataTable
        columns={columns}
        data={medications}
        pagination={pagination}
        isLoading={isLoading}
        onStateChange={handleStateChange}
        filterConfig={{
          searchPlaceholder: 'Buscar por nombre...',
          searchBy: 'name',
          filters: [
            {
              key: 'category',
              label: 'Tipo',
              type: 'select',
              options: MEDICATION_CATEGORY_CATALOG,
            },
          ],
        }}
      />
    </div>
  )
}

export default MedicationsPage
