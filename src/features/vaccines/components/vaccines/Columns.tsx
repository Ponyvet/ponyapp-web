import type { ColumnDef } from '@tanstack/react-table'
import type { Vaccine } from '../../models/Vaccine'
import { getLabelFromCatalog } from '@/shared/utils/helpers'
import { SPECIES_CATALOG } from '@/features/pets/utils/catalogs'

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
]
