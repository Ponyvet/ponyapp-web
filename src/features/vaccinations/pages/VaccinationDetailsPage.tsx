import { useNavigate, useParams } from 'react-router'
import { formatDate } from 'date-fns'
import {
  CalendarIcon,
  EditIcon,
  SyringeIcon,
  TrashIcon,
  UserIcon,
} from 'lucide-react'

import useGetSingleVaccination from '../queries/useGetSingleVaccination'
import useDeleteVaccination from '../queries/useDeleteVaccination'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import ItemInfo from '@/shared/components/ItemInfo'
import { useConfirm } from '@/shared/hooks/use-confirm'
import { ConfirmDialog } from '@/shared/components/ConfirmDialog'

const VaccinationDetailsPage = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { data: vaccination, isSuccess } = useGetSingleVaccination(
    params.vaccinationId,
  )
  const deleteVaccinationMutation = useDeleteVaccination(() =>
    navigate('/vaccinations'),
  )
  const { confirm, isOpen, options, handleConfirm, handleCancel } = useConfirm()

  const handleDeleteVaccination = async () => {
    if (!vaccination) return

    const confirmed = await confirm({
      title: '¿Estás absolutamente seguro?',
      description:
        '¿Estás seguro de que deseas eliminar esta vacunación? Esta acción no se puede deshacer.',
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
    })

    if (confirmed) {
      deleteVaccinationMutation.mutate(vaccination.id)
    }
  }

  if (!isSuccess || !vaccination) {
    return null
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <h1 className="text-xl font-bold">Detalles de la Vacunación</h1>
          </CardTitle>
          <CardAction className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/vaccinations/${vaccination.id}/edit`)}
            >
              <EditIcon />
              Editar
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteVaccination}
              disabled={deleteVaccinationMutation.isPending}
            >
              <TrashIcon />
              Eliminar
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ItemInfo
              icon={<SyringeIcon />}
              title="Vacuna"
              description={vaccination.medication.name}
            />
            <ItemInfo
              icon={<CalendarIcon />}
              title="Fecha de aplicación"
              description={
                vaccination.appliedAt
                  ? formatDate(vaccination.appliedAt, 'dd/MM/yyyy')
                  : 'No aplicada'
              }
            />
            <ItemInfo
              icon={<CalendarIcon />}
              title="Próxima fecha"
              description={
                vaccination.nextDueDate
                  ? formatDate(vaccination.nextDueDate, 'dd/MM/yyyy')
                  : 'No programada'
              }
            />
            <ItemInfo
              icon={<UserIcon />}
              title="Veterinario"
              description={vaccination.veterinarian.name}
            />
          </div>
        </CardContent>
      </Card>
      <ConfirmDialog
        open={isOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title={options.title}
        description={options.description}
        confirmText={options.confirmText}
        cancelText={options.cancelText}
        isLoading={deleteVaccinationMutation.isPending}
      />
    </div>
  )
}

export default VaccinationDetailsPage
