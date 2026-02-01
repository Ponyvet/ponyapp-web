import { useNavigate, useParams } from 'react-router'
import { formatDate } from 'date-fns'
import {
  CalendarIcon,
  EditIcon,
  FileTextIcon,
  StethoscopeIcon,
  TrashIcon,
  UserIcon,
  PlusIcon,
} from 'lucide-react'

import useGetSingleVisit from '../queries/useGetSingleVisit'
import useDeleteVisit from '../queries/useDeleteVisit'
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

const VisitDetailsPage = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { data: visit, isSuccess } = useGetSingleVisit(params.visitId)
  const deleteVisitMutation = useDeleteVisit(() => navigate('/visits'))
  const { confirm, isOpen, options, handleConfirm, handleCancel } = useConfirm()

  const handleDeleteVisit = async () => {
    if (!visit) return

    const confirmed = await confirm({
      title: '¿Estás absolutamente seguro?',
      description:
        '¿Estás seguro de que deseas eliminar esta visita? Esta acción no se puede deshacer.',
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
    })

    if (confirmed) {
      deleteVisitMutation.mutate(visit.id)
    }
  }

  if (!isSuccess || !visit) {
    return null
  }

  const consultations = visit.consultations ?? []

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <h1 className="text-xl font-bold">Detalles de la Visita</h1>
          </CardTitle>
          <CardAction className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/visits/${visit.id}/edit`)}
            >
              <EditIcon />
              Editar
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteVisit}
              disabled={deleteVisitMutation.isPending}
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
              description={formatDate(visit.date, 'dd/MM/yyyy')}
            />
            <ItemInfo
              icon={<UserIcon />}
              title="Cliente"
              description={visit.client.name}
            />
            <ItemInfo
              icon={<UserIcon />}
              title="Veterinario"
              description={visit.veterinarian.name}
            />
            {visit.generalNotes && (
              <ItemInfo
                icon={<FileTextIcon />}
                title="Notas"
                description={visit.generalNotes}
              />
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <StethoscopeIcon className="h-5 w-5" />
              Consultas ({consultations.length})
            </h2>
          </CardTitle>
          <CardAction>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                navigate('/consultations/add', {
                  state: { clientId: visit.client.id, visitId: visit.id },
                })
              }
            >
              <PlusIcon />
              Agregar consulta
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          {consultations.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <StethoscopeIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No hay consultas registradas para esta visita.</p>
              <p className="text-sm mt-2">
                Agrega una consulta para registrar la atención de una mascota.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {consultations.map((consultation) => (
                <div
                  key={consultation.id}
                  className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => navigate(`/consultations/${consultation.id}`)}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">{consultation.record.name}</p>
                      {consultation.reason && (
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">Motivo:</span>{' '}
                          {consultation.reason}
                        </p>
                      )}
                      {consultation.diagnosis && (
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">Diagnóstico:</span>{' '}
                          {consultation.diagnosis}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
        isLoading={deleteVisitMutation.isPending}
      />
    </div>
  )
}

export default VisitDetailsPage
