import { useParams } from 'react-router'
import useGetSinglePet from '../queries/useGetSinglePet'
import { Card } from '@/components/ui/card'
import useClients from '@/features/clients/hooks/useClients'
import { DataTable } from '@/features/vaccinations/components/vaccinations/DataTable'
import { columns } from '@/features/vaccinations/components/vaccinations/Columns'
import useGetPetVaccinations from '@/features/vaccinations/queries/useGetPetVaccinations'
import { Separator } from '@/components/ui/separator'

const PetDetailsPage = () => {
  const params = useParams()
  const { getClientName } = useClients()
  const { data: pet, isSuccess } = useGetSinglePet(params.id)
  const { data: vaccinations = [] } = useGetPetVaccinations(params.id)

  if (!isSuccess) {
    return null
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Detalles de la Mascota</h1>
      <Card className="p-4">
        <p>
          <strong>Nombre:</strong> {pet.name}
        </p>
        <p>
          <strong>Especie:</strong> {pet.species}
        </p>
        <p>
          <strong>Raza:</strong> {pet.breed}
        </p>
        <p>
          <strong>Fecha de nacimiento:</strong>
          {pet.birthDate?.toLocaleDateString()}
        </p>
        <p>
          <strong>Propietario:</strong> {getClientName(pet.clientId)}
        </p>
      </Card>
      <Separator className="my-6" />

      <div className="flex items-center justify-between my-4">
        <h2 className="text-xl font-bold">Vacunaciones</h2>
      </div>
      <DataTable columns={columns} data={vaccinations} />
    </div>
  )
}

export default PetDetailsPage
