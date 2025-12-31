import type { Client } from '@/features/models/Client'
import type { ColumnDef } from '@tanstack/react-table'

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
]
