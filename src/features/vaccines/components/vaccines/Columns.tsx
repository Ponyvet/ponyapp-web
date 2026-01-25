import type { ColumnDef } from '@tanstack/react-table'
import type { Vaccine } from '../../models/Vaccine'
import { getLabelFromCatalog } from '@/shared/utils/helpers'
import { SPECIES_CATALOG } from '@/features/pets/utils/catalogs'
import EditButton from './EditButton'
import DeleteButton from './DeleteButton'

export const columns: ColumnDef<Vaccine>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'species',
    header: 'Especie',
    cell: ({ row }) =>
      getLabelFromCatalog(row.original.species, SPECIES_CATALOG),
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
  },
  {
    accessorKey: 'intervalDays',
    header: 'Intervalo (días)',
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => (
      <div className="flex gap-1">
        <EditButton vaccine={row.original} />
        <DeleteButton vaccine={row.original} />
      </div>
    ),
    enableHiding: false,
  },
]
