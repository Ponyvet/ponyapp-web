import { useNavigate, useParams } from 'react-router'
import { formatDate } from 'date-fns'
import {
  CalendarIcon,
  EditIcon,
  FileTextIcon,
  StethoscopeIcon,
  TrashIcon,
  UserIcon,
  ClipboardIcon,
  PillIcon,
} from 'lucide-react'

import useGetSingleConsultation from '../queries/useGetSingleConsultation'
import useDeleteConsultation from '../queries/useDeleteConsultation'
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

const ConsultationDetailsPage = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { data: consultation, isSuccess } = useGetSingleConsultation(
    params.consultationId,
  )
  const deleteConsultationMutation = useDeleteConsultation(() =>
    navigate('/consultations'),
  )
  const { confirm, isOpen, options, handleConfirm, handleCancel } = useConfirm()

  const handleDeleteConsultation = async () => {
    if (!consultation) return

    const confirmed = await confirm({
      title: '¿Estás absolutamente seguro?',
      description:
        '¿Estás seguro de que deseas eliminar este tratamiento? Esta acción no se puede deshacer.',
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
    })

    if (confirmed) {
      deleteConsultationMutation.mutate(consultation.id)
    }
  }

  if (!isSuccess || !consultation) {
    return null
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <h1 className="text-xl font-bold">Detalles del Tratamiento</h1>
          </CardTitle>
          <CardAction className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/consultations/${consultation.id}/edit`)}
            >
              <EditIcon />
              Editar
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteConsultation}
              disabled={deleteConsultationMutation.isPending}
            >
              <TrashIcon />
              Eliminar
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ItemInfo
              icon={<CalendarIcon />}
              title="Fecha"
              description={formatDate(consultation.visit.date, 'dd/MM/yyyy')}
            />
            <ItemInfo
              icon={<ClipboardIcon />}
              title="Cartilla"
              description={consultation.record.name}
            />
            <ItemInfo
              icon={<UserIcon />}
              title="Cliente"
              description={consultation.visit.client.name}
            />
            <ItemInfo
              icon={<UserIcon />}
              title="Veterinario"
              description={consultation.visit.veterinarian.name}
            />
          </div>
        </CardContent>
      </Card>

      {(consultation.reason ||
        consultation.diagnosis ||
        consultation.treatment ||
        consultation.notes) && (
        <Card>
          <CardHeader>
            <CardTitle>
              <h2 className="text-lg font-semibold">Información Clínica</h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {consultation.reason && (
                <ItemInfo
                  icon={<StethoscopeIcon />}
                  title="Motivo de tratamiento"
                  description={consultation.reason}
                />
              )}
              {consultation.diagnosis && (
                <ItemInfo
                  icon={<FileTextIcon />}
                  title="Diagnóstico"
                  description={consultation.diagnosis}
                />
              )}
              {consultation.treatment && (
                <ItemInfo
                  icon={<PillIcon />}
                  title="Tratamiento"
                  description={consultation.treatment}
                />
              )}
              {consultation.notes && (
                <ItemInfo
                  icon={<FileTextIcon />}
                  title="Notas adicionales"
                  description={consultation.notes}
                />
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <ConfirmDialog
        open={isOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title={options.title}
        description={options.description}
        confirmText={options.confirmText}
        cancelText={options.cancelText}
        isLoading={deleteConsultationMutation.isPending}
      />
    </div>
  )
}

export default ConsultationDetailsPage
