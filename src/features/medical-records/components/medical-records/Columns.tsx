import type { ColumnDef } from '@tanstack/react-table'
import { formatDate } from 'date-fns'

import type { MedicalRecord } from '../../models/MedicalRecord'
import DetailsButton from './DetailsButton'
import EditButton from './EditButton'
import DeleteButton from './DeleteButton'
import SortableColumn from '@/shared/components/SortableColumn'
import { Badge } from '@/components/ui/badge'

export const columns: ColumnDef<MedicalRecord>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <SortableColumn column={column}>Nombre</SortableColumn>
    ),
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row }) => (
      <Badge variant={row.original.type === 'PET' ? 'default' : 'secondary'}>
        {row.original.type === 'PET' ? 'Mascota' : 'Grupo'}
      </Badge>
    ),
  },
  {
    accessorKey: 'clientId',
    header: 'Cliente',
    cell: ({ row }) => row.original.client.name,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <SortableColumn column={column}>Fecha de creación</SortableColumn>
    ),
    cell: ({ row }) => formatDate(row.original.createdAt, 'dd/MM/yyyy'),
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => (
      <div className="flex gap-1">
        <DetailsButton record={row.original} />
        <EditButton record={row.original} />
        <DeleteButton record={row.original} />
      </div>
    ),
    enableHiding: false,
  },
]
