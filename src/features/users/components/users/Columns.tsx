import type { ColumnDef } from '@tanstack/react-table'

import DeleteButton from './DeleteButton'
import DetailsButton from './DetailsButton'
import EditButton from './EditButton'
import type { User } from '../../models/User'
import { Link } from 'react-router'
import { Badge } from '@/shared/components/ui/badge'
import { getRoleBadgeVariant } from '../../utils/helpers'
import { userRoleLabels } from '../../utils/catalogs'

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
    enableSorting: true,
    cell: ({ row }) => (
      <Link
        to={`/users/${row.original.id}`}
        className="font-medium hover:underline"
      >
        {row.original.name}
      </Link>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Correo',
    enableSorting: true,
  },
  {
    accessorKey: 'role',
    header: 'Rol',
    cell: ({ row }) => (
      <Badge variant={getRoleBadgeVariant(row.original.role)}>
        {userRoleLabels[row.original.role]}
      </Badge>
    ),
  },
  {
    accessorKey: 'isActive',
    header: 'Estado',
    cell: ({ row }) => (
      <Badge variant={row.original.isActive ? 'default' : 'secondary'}>
        {row.original.isActive ? 'Activo' : 'Inactivo'}
      </Badge>
    ),
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => (
      <div>
        <DetailsButton user={row.original} />
        <EditButton user={row.original} />
        <DeleteButton user={row.original} />
      </div>
    ),
  },
]

export default columns
