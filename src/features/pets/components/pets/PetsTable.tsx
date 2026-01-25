import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ServerDataTable,
  type ServerSideState,
  type PaginationInfo,
} from '@/shared/components/ServerDataTable'
import EmptyTable from '@/shared/components/EmptyTable'
import { DogIcon, PlusIcon } from 'lucide-react'
import { useNavigate } from 'react-router'
import type { Pet } from '../../models/Pet'
import { useColumns } from './Columns'
import { Species, Sex } from '../../utils/enum'

interface PetsTableProps {
  clientId?: string
  pets: Pet[]
  pagination?: PaginationInfo
  isLoading?: boolean
  onStateChange?: (state: ServerSideState) => void
}

const PetsTable = ({
  clientId,
  pets,
  pagination,
  isLoading = false,
  onStateChange,
}: PetsTableProps) => {
  const navigate = useNavigate()
  const columns = useColumns()

  // If we don't have pagination info, show empty state or simple table
  const showEmptyState = !isLoading && pets.length === 0

  if (showEmptyState && !pagination) {
    return (
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle>
            <h2 className="text-xl font-bold">Mascotas</h2>
          </CardTitle>
          <CardAction>
            <Button
              size="sm"
              onClick={() => navigate('/pets/add', { state: { clientId } })}
            >
              <PlusIcon />
              Agregar Cartilla
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <EmptyTable
            icon={<DogIcon />}
            title="No hay mascotas registradas"
            description="Agrega una nueva cartilla para este cliente."
            buttonText={
              <>
                <PlusIcon className="mr-2" />
                Agregar primera cartilla
              </>
            }
            onclick={() => navigate('/pets/add', { state: { clientId } })}
          />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>
          <h2 className="text-xl font-bold">Mascotas</h2>
        </CardTitle>
        <CardAction>
          <Button
            size="sm"
            onClick={() => navigate('/pets/add', { state: { clientId } })}
            disabled={isLoading}
          >
            <PlusIcon />
            Agregar Cartilla
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {pagination && onStateChange ? (
          <ServerDataTable
            columns={columns}
            data={pets}
            pagination={pagination}
            isLoading={isLoading}
            onStateChange={onStateChange}
            initialColumnVisibility={{ createdAt: false }}
            filterConfig={{
              searchPlaceholder: 'Buscar por nombre de mascota...',
              searchBy: 'name',
              filters: [
                {
                  key: 'species',
                  label: 'Especie',
                  type: 'select',
                  options: [
                    { label: 'Perro', value: Species.DOG },
                    { label: 'Gato', value: Species.CAT },
                  ],
                },
                {
                  key: 'sex',
                  label: 'Sexo',
                  type: 'select',
                  options: [
                    { label: 'Macho', value: Sex.MALE },
                    { label: 'Hembra', value: Sex.FEMALE },
                  ],
                },
                {
                  key: 'breed',
                  label: 'Raza',
                  type: 'input',
                },
              ],
            }}
            pageSizeOptions={[5, 10, 20, 50]}
          />
        ) : showEmptyState ? (
          <EmptyTable
            icon={<DogIcon />}
            title="No hay mascotas registradas"
            description="Agrega una nueva cartilla para este cliente."
            buttonText={
              <>
                <PlusIcon className="mr-2" />
                Agregar primera cartilla
              </>
            }
            onclick={() => navigate('/pets/add', { state: { clientId } })}
          />
        ) : (
          <div className="text-center py-8">
            <DogIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">
              {isLoading
                ? 'Cargando mascotas...'
                : 'No hay mascotas registradas'}
            </h3>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default PetsTable
