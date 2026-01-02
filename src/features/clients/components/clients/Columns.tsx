import type { Client } from '@/features/clients/models/Client'
import type { ColumnDef } from '@tanstack/react-table'
import DetailsButton from './DetailsButton'
import { formatPhoneNumber } from '@/shared/utils/helpers'

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
    cell: ({ row }) => formatPhoneNumber(row.original.phone),
  },
  {
    accessorKey: 'details',
    header: '',
    cell: ({ row }) => <DetailsButton client={row.original} />,
  },
]
