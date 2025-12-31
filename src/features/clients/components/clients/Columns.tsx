import type { Client } from '@/features/clients/models/Client'
import type { ColumnDef } from '@tanstack/react-table'
import DetailsButton from './DetailsButton'

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'address',
    header: 'Dirección',
  },
  {
    accessorKey: 'phone',
    header: 'Teléfono',
  },
  {
    accessorKey: 'notes',
    header: 'Notas',
  },
  {
    accessorKey: 'details',
    header: '',
    cell: ({ row }) => <DetailsButton client={row.original} />,
  },
]
