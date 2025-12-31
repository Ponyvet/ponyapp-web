import type { ColumnDef } from '@tanstack/react-table'
import type { Vaccine } from '../../models/Vaccine'

export const columns: ColumnDef<Vaccine>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'species',
    header: 'Especie',
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
  },
  {
    accessorKey: 'intervalDays',
    header: 'Intervalo (días)',
  },
]
