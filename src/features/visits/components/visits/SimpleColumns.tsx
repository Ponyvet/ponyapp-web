import type { ColumnDef } from '@tanstack/react-table'
import { formatDate } from 'date-fns'

import type { Visit } from '../../models/Visit'
import DetailsButton from './DetailsButton'
import EditButton from './EditButton'
import DeleteButton from './DeleteButton'
import SortableColumn from '@/shared/components/SortableColumn'

export const columns: ColumnDef<Visit>[] = [
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <SortableColumn column={column}>Fecha</SortableColumn>
    ),
    cell: ({ row }) => formatDate(row.original.date, 'dd/MM/yyyy'),
  },
  {
    accessorKey: 'veterinarian',
    header: 'Veterinario',
    cell: ({ row }) => row.original.veterinarian.name,
  },
  {
    accessorKey: 'consultations',
    header: 'Consultas',
    cell: ({ row }) => row.original.consultations?.length ?? 0,
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => (
      <div className="flex gap-1">
        <DetailsButton visit={row.original} />
        <EditButton visit={row.original} />
        <DeleteButton visit={row.original} />
      </div>
    ),
    enableHiding: false,
  },
]
