import type { ColumnDef } from '@tanstack/react-table'
import { formatDate } from 'date-fns'

import type { MedicalRecord } from '../../models/MedicalRecord'
import DetailsButton from './DetailsButton'
import EditButton from './EditButton'
import DeleteButton from './DeleteButton'
import SortableColumn from '@/shared/components/SortableColumn'
import { Badge } from '@/shared/components/ui/badge'

export const columns: ColumnDef<MedicalRecord>[] = [
  {
    accessorKey: 'clientId',
    header: ({ column }) => (
      <SortableColumn column={column}>Cliente</SortableColumn>
    ),
    cell: ({ row }) => row.original.client.name,
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
    accessorKey: 'name',
    header: 'Nombre de mascota o grupo',
    cell: ({ row }) => row.original.name,
  },
  {
    accessorKey: 'latestVaccination',
    header: 'Fecha de última vacunación',
    cell: ({ row }) =>
      row.original.latestVaccination?.appliedAt
        ? formatDate(row.original.latestVaccination.appliedAt, 'dd/MM/yyyy')
        : '-',
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
