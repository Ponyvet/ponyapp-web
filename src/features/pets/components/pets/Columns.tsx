import type { ColumnDef } from '@tanstack/react-table'

import DetailsButton from './DetailsButton'
import type { Pet } from '../../models/Pet'

export const columns: ColumnDef<Pet>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'species',
    header: 'Especie',
  },
  {
    accessorKey: 'breed',
    header: 'Raza',
  },
  {
    accessorKey: 'sex',
    header: 'Sexo',
  },
  {
    accessorKey: 'details',
    header: '',
    cell: ({ row }) => <DetailsButton pet={row.original} />,
  },
]
