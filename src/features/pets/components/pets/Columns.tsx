import type { ColumnDef } from '@tanstack/react-table'

import DetailsButton from './DetailsButton'
import type { Pet } from '../../models/Pet'
import { getLabelFromCatalog } from '@/shared/utils/helpers'
import { SEX_CATALOG, SPECIES_CATALOG } from '../../utils/catalogs'
import SortableColumn from '@/shared/components/SortableColumn'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { formatDate } from 'date-fns'

export const useColumns = () => {
  const columns: ColumnDef<Pet>[] = [
    {
      accessorKey: 'clientId',
      header: ({ column }) => (
        <SortableColumn column={column}>Cliente</SortableColumn>
      ),
      enableSorting: true,
      cell: ({ row }) => (
        <Button variant="link" className="p-0">
          <Link to={`/clients/${row.original.client?.id}`}>
            {row.original.client?.name}
          </Link>
        </Button>
      ),
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <SortableColumn column={column}>Nombre Mascota</SortableColumn>
      ),
      enableSorting: true,
    },
    {
      accessorKey: 'species',
      header: ({ column }) => (
        <SortableColumn column={column}>Especie</SortableColumn>
      ),
      cell: ({ row }) =>
        getLabelFromCatalog(row.original.species, SPECIES_CATALOG),
      enableSorting: true,
    },
    {
      accessorKey: 'breed',
      header: ({ column }) => (
        <SortableColumn column={column}>Raza</SortableColumn>
      ),
      enableSorting: true,
    },
    {
      accessorKey: 'sex',
      header: ({ column }) => (
        <SortableColumn column={column}>Sexo</SortableColumn>
      ),
      cell: ({ row }) => getLabelFromCatalog(row.original.sex, SEX_CATALOG),
      enableSorting: true,
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <SortableColumn column={column}>Fecha de Creación</SortableColumn>
      ),
      cell: ({ row }) => formatDate(row.original.createdAt, 'dd/MM/yyyy'),
      enableSorting: true,
    },
    {
      accessorKey: 'details',
      header: '',
      cell: ({ row }) => <DetailsButton pet={row.original} />,
      enableSorting: false,
      enableHiding: false,
    },
  ]

  return columns
}
