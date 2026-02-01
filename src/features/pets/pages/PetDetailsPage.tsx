import { useNavigate, useParams } from 'react-router'
import { PlusIcon, HeartIcon } from 'lucide-react'

import useGetSinglePet from '../queries/useGetSinglePet'
import useGetSingleMedicalRecord from '@/features/medical-records/queries/useGetSingleMedicalRecord'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { DataTable } from '@/shared/components/DataTable'
import { columns } from '@/features/vaccinations/components/vaccinations/Columns'
import useGetRecordVaccinations from '@/features/vaccinations/queries/useGetPetVaccinations'
import { Separator } from '@/shared/components/ui/separator'
import { Button } from '@/shared/components/ui/button'
import PetInfo from '@/shared/components/PetInfo'
import EmptyTable from '@/shared/components/EmptyTable'

const PetDetailsPage = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { data: pet, isSuccess: isPetSuccess } = useGetSinglePet(params.petId)
  const { data: record, isSuccess: isRecordSuccess } =
    useGetSingleMedicalRecord(pet?.recordId)
  const { data: vaccinations = [] } = useGetRecordVaccinations(params.petId)

  if (!isPetSuccess || !pet) {
    return null
  }

  // Obtener cliente del MedicalRecord
  const client =
    isRecordSuccess && record ? record.client : { id: '', name: 'Cargando...' }
  const clientId = isRecordSuccess && record ? record.clientId : ''

  return (
    <div className="space-y-6">
      <PetInfo
        pet={pet}
        name={record?.name || ''}
        clientId={clientId}
        client={client}
        showEditButton={true}
      />
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
                  state: { petId: pet.id, recordId: pet.recordId },
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
                  state: { petId: pet.id, recordId: pet.recordId },
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
