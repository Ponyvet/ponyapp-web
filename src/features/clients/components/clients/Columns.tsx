import type { Client } from '@/features/clients/models/Client'
import type { ColumnDef } from '@tanstack/react-table'
import DetailsButton from './DetailsButton'
import { formatPhoneNumber } from '@/shared/utils/helpers'
import SortableColumn from '@/shared/components/SortableColumn'

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <SortableColumn column={column}>Nombre</SortableColumn>
    ),
  },
  {
    accessorKey: 'address',
    header: ({ column }) => (
      <SortableColumn column={column}>Dirección</SortableColumn>
    ),
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
    enableHiding: false,
  },
]
