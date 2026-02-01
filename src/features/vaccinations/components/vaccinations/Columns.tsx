import type { ColumnDef } from '@tanstack/react-table'
import { formatDate } from 'date-fns'

import type { Vaccination } from '../../models/Vaccination'

export const columns: ColumnDef<Vaccination>[] = [
  {
    accessorKey: 'appliedAt',
    header: 'Fecha de Aplicación',
    cell: ({ row }) => {
      const date = row.original.appliedAt
      if (!date) {
        return <span>--</span>
      }
      const formattedDate = formatDate(date, 'dd/MM/yyyy')
      return <span>{formattedDate}</span>
    },
  },
  {
    accessorKey: 'vaccineId',
    header: 'Vacuna',
    cell: ({ row }) => row.original.medication.name,
  },
  {
    accessorKey: 'nextDueDate',
    header: 'Próxima Fecha',
    cell: ({ row }) => {
      const date = row.original.nextDueDate
      if (!date) {
        return <span>--</span>
      }
      const formattedDate = formatDate(date, 'dd/MM/yyyy')
      return <span>{formattedDate}</span>
    },
  },
  {
    accessorKey: 'veterinarianId',
    header: 'Veterinario',
    cell: ({ row }) => row.original.veterinarian.name,
  },
]
