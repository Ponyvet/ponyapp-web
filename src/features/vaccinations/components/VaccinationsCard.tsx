import { useNavigate } from 'react-router'
import { PlusIcon, SyringeIcon } from 'lucide-react'

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { DataTable } from '@/shared/components/DataTable'
import useGetRecordVaccinations from '../queries/useGetPetVaccinations'
import { columns } from './vaccinations/Columns'

interface VaccinationsCardProps {
  recordId?: string
  medicalRecordId?: string
  clientId?: string
}

const VaccinationsCard = ({
  recordId: petId,
  medicalRecordId,
  clientId,
}: VaccinationsCardProps) => {
  const navigate = useNavigate()
  const { data: vaccinations = [], isLoading } = useGetRecordVaccinations(petId)

  const handleAddVaccination = () => {
    navigate('/vaccinations/add', {
      state: {
        petId,
        medicalRecordId,
        clientId,
      },
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SyringeIcon className="h-5 w-5" />
          Vacunaciones
        </CardTitle>
        <CardAction>
          <Button size="sm" onClick={handleAddVaccination}>
            <PlusIcon className="h-4 w-4" />
            Agregar
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-4 text-muted-foreground">
            Cargando vacunaciones...
          </div>
        ) : vaccinations.length === 0 ? (
          <div className="text-center py-8">
            <SyringeIcon className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 font-semibold">Sin vacunaciones</h3>
            <p className="text-sm text-muted-foreground">
              No hay vacunaciones registradas para esta mascota.
            </p>
            <Button className="mt-4" onClick={handleAddVaccination}>
              <PlusIcon className="mr-2 h-4 w-4" />
              Agregar primera vacunación
            </Button>
          </div>
        ) : (
          <DataTable columns={columns} data={vaccinations} />
        )}
      </CardContent>
    </Card>
  )
}

export default VaccinationsCard
