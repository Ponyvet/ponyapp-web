import { useNavigate, useParams } from 'react-router'
import useGetSinglePet from '../queries/useGetSinglePet'
import { Card, CardContent } from '@/components/ui/card'
import useClients from '@/features/clients/hooks/useClients'
import { DataTable } from '@/features/vaccinations/components/vaccinations/DataTable'
import { columns } from '@/features/vaccinations/components/vaccinations/Columns'
import useGetPetVaccinations from '@/features/vaccinations/queries/useGetPetVaccinations'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { getLabelFromCatalog } from '@/shared/utils/helpers'
import { SEX_CATALOG, SPECIES_CATALOG } from '../utils/catalogs'

const PetDetailsPage = () => {
  const navigate = useNavigate()
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
      <Card>
        <CardContent>
          <p>
            <strong>Nombre:</strong> {pet.name}
          </p>
          <p>
            <strong>Especie:</strong>{' '}
            {getLabelFromCatalog(pet.species, SPECIES_CATALOG)}
          </p>
          <p>
            <strong>Sexo:</strong> {getLabelFromCatalog(pet.sex, SEX_CATALOG)}
          </p>
          <p>
            <strong>Raza:</strong> {pet.breed}
          </p>
          <p>
            <strong>Color:</strong> {pet.color}
          </p>
          <p>
            <strong>Fecha de nacimiento:</strong>
            {pet.birthDate?.toLocaleDateString()}
          </p>
          <p>
            <strong>Propietario:</strong> {getClientName(pet.clientId)}
          </p>
          <p>
            <strong>Notas:</strong> {pet.notes}
          </p>
        </CardContent>
      </Card>
      <Separator className="my-6" />

      <div className="flex items-center justify-between my-4">
        <h2 className="text-xl font-bold">Vacunaciones</h2>
      </div>
      <div className="flex justify-end mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            navigate('/vaccination/add', {
              state: { petId: pet.id, clientId: pet.clientId },
            })
          }
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Nueva Vacunación
        </Button>
      </div>
      <DataTable columns={columns} data={vaccinations} />
    </div>
  )
}

export default PetDetailsPage
