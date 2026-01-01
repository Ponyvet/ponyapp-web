import type { ColumnDef } from '@tanstack/react-table'
import { formatDate } from 'date-fns'

import type { Vaccination } from '../../models/Vaccination'
import VaccineName from './VaccineName'

export const columns: ColumnDef<Vaccination>[] = [
  {
    accessorKey: 'appliedAt',
    header: 'Fecha de Aplicación',
    cell: ({ getValue }) => {
      const date = getValue<Date>()
      const formattedDate = formatDate(date, 'dd/MM/yyyy')
      return <span>{formattedDate}</span>
    },
  },
  {
    accessorKey: 'nextDueDate',
    header: 'Próxima Fecha',
    cell: ({ getValue }) => {
      const date = getValue<Date>()
      const formattedDate = formatDate(date, 'dd/MM/yyyy')
      return <span>{formattedDate}</span>
    },
  },
  {
    accessorKey: 'status',
    header: 'Estado',
  },
  {
    accessorKey: 'vaccineId',
    header: 'Vacuna',
    cell: ({ row }) => <VaccineName vaccineId={row.original.vaccineId} />,
  },
  {
    accessorKey: 'veterinarianId',
    header: 'Veterinario',
  },
]
