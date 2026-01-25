import { useNavigate, useParams } from 'react-router'
import { PlusIcon, HeartIcon } from 'lucide-react'

import useGetSinglePet from '../queries/useGetSinglePet'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { DataTable } from '@/shared/components/DataTable'
import { columns } from '@/features/vaccinations/components/vaccinations/Columns'
import useGetPetVaccinations from '@/features/vaccinations/queries/useGetPetVaccinations'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import PetInfo from '../components/PetInfo/PetInfo'
import EmptyTable from '@/shared/components/EmptyTable'

const PetDetailsPage = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { data: pet, isSuccess } = useGetSinglePet(params.petId)
  const { data: vaccinations = [] } = useGetPetVaccinations(params.petId)

  if (!isSuccess) {
    return null
  }

  return (
    <div className="space-y-6">
      <PetInfo pet={pet} />
      <Separator />
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Historial de Vacunaciones</CardTitle>
          <CardAction>
            <Button
              variant="default"
              size="sm"
              onClick={() =>
                navigate('/vaccination/add', {
                  state: { petId: pet.id, clientId: pet.clientId },
                })
              }
            >
              <PlusIcon />
              Nueva Vacunación
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          {vaccinations.length > 0 ? (
            <DataTable columns={columns} data={vaccinations} />
          ) : (
            <EmptyTable
              icon={<HeartIcon />}
              title="No hay vacunaciones registradas"
              description="Agrega una nueva vacunación para esta mascota."
              buttonText={
                <>
                  <PlusIcon className="mr-2" />
                  Agregar primera vacunación
                </>
              }
              onclick={() =>
                navigate('/vaccination/add', {
                  state: { petId: pet.id, clientId: pet.clientId },
                })
              }
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default PetDetailsPage
