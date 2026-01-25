import type { ColumnDef } from '@tanstack/react-table'

import DetailsButton from './DetailsButton'
import type { Pet } from '../../models/Pet'
import { getLabelFromCatalog } from '@/shared/utils/helpers'
import { SEX_CATALOG, SPECIES_CATALOG } from '../../utils/catalogs'
import SortableColumn from '@/shared/components/SortableColumn'

export const useColumns = ({
  showClientName = true,
}: {
  showClientName: boolean
}) => {
  const columns: ColumnDef<Pet>[] = [
    ...(showClientName
      ? ([
          {
            accessorKey: 'clientId',
            header: ({ column }) => (
              <SortableColumn column={column}>ID Cliente</SortableColumn>
            ),
            enableSorting: true,
            cell: ({ row }) => row.original.client?.name ?? '',
          },
        ] as ColumnDef<Pet>[])
      : []),
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <SortableColumn column={column}>Nombre</SortableColumn>
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
      accessorKey: 'details',
      header: '',
      cell: ({ row }) => <DetailsButton pet={row.original} />,
      enableSorting: false,
      enableHiding: false,
    },
  ]

  return columns
}
