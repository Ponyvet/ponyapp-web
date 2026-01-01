import type { ColumnDef } from '@tanstack/react-table'

import DetailsButton from './DetailsButton'
import type { Pet } from '../../models/Pet'
import { getLabelFromCatalog } from '@/shared/utils/helpers'
import { SEX_CATALOG, SPECIES_CATALOG } from '../../utils/catalogs'

export const columns: ColumnDef<Pet>[] = [
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
    accessorKey: 'breed',
    header: 'Raza',
  },
  {
    accessorKey: 'sex',
    header: 'Sexo',
    cell: ({ row }) => getLabelFromCatalog(row.original.sex, SEX_CATALOG),
  },
  {
    accessorKey: 'details',
    header: '',
    cell: ({ row }) => <DetailsButton pet={row.original} />,
  },
]
