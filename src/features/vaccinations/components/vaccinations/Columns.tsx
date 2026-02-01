import type { ColumnDef } from '@tanstack/react-table'
import { formatDate } from 'date-fns'

import type { Vaccination } from '../../models/Vaccination'
import VaccineName from './VaccineName'
import { getLabelFromCatalog } from '@/shared/utils/helpers'
import { VACCINATION_STATUS_CATALOG } from '../../utils/catalogs'
import { VaccinationStatus } from '../../utils/enum'
import { Badge } from '@/shared/components/ui/badge'
import VeterinarianName from './VeterinarianName'
import { cn } from '@/shared/utils/utils'

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
    cell: ({ row }) => <VaccineName vaccineId={row.original.vaccineId} />,
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
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ row }) => (
      <Badge
        className={cn({
          'bg-yellow-100 text-yellow-800':
            row.original.status === VaccinationStatus.PENDING,
          'bg-green-100 text-green-800':
            row.original.status === VaccinationStatus.APPLIED,
          'bg-red-100 text-red-800':
            row.original.status === VaccinationStatus.CANCELLED,
        })}
      >
        {getLabelFromCatalog(row.original.status, VACCINATION_STATUS_CATALOG)}
      </Badge>
    ),
  },
  {
    accessorKey: 'veterinarianId',
    header: 'Veterinario',
    cell: ({ row }) => (
      <VeterinarianName veterinarianId={row.original.veterinarianId} />
    ),
  },
]
