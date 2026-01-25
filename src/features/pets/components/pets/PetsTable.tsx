import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { DataTable } from '@/shared/components/DataTable'
import EmptyTable from '@/shared/components/EmptyTable'
import { DogIcon, PlusIcon } from 'lucide-react'
import { useNavigate } from 'react-router'
import type { Pet } from '../../models/Pet'
import { columns } from './Columns'

interface PetsTableProps {
  clientId?: string
  pets: Pet[]
}

const PetsTable = ({ clientId, pets }: PetsTableProps) => {
  const navigate = useNavigate()

  return (
    <Card>
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
        {pets.length > 0 ? (
          <DataTable columns={columns} data={pets} filterBy="name" />
        ) : (
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
        )}
      </CardContent>
    </Card>
  )
}

export default PetsTable
