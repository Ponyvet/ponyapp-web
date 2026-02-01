import { useNavigate, useParams } from 'react-router'
import { formatDate } from 'date-fns'

import useGetSingleMedicalRecord from '../queries/useGetSingleMedicalRecord'
import useDeleteMedicalRecord from '../queries/useDeleteMedicalRecord'
import useClients from '@/features/clients/hooks/useClients'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  BookOpenIcon,
  CalendarIcon,
  EditIcon,
  NotebookIcon,
  TrashIcon,
  UserIcon,
} from 'lucide-react'
import ItemInfo from '@/shared/components/ItemInfo'
import { Separator } from '@radix-ui/react-separator'
import { useConfirm } from '@/hooks/use-confirm'
import { ConfirmDialog } from '@/shared/components/ConfirmDialog'
import { Badge } from '@/components/ui/badge'

const MedicalRecordDetailsPage = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { data: record, isSuccess } = useGetSingleMedicalRecord(params.recordId)
  const { getClientName } = useClients()
  const deleteRecordMutation = useDeleteMedicalRecord(() =>
    navigate('/medical-records'),
  )
  const { confirm, isOpen, options, handleConfirm, handleCancel } = useConfirm()

  const handleDeleteRecord = async () => {
    if (!record) return

    const confirmed = await confirm({
      title: '¿Estás absolutamente seguro?',
      description: `¿Estás seguro de que deseas eliminar la cartilla "${record.name}"? Esta acción no se puede deshacer.`,
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
    })

    if (confirmed) {
      deleteRecordMutation.mutate(record.id)
    }
  }

  if (!isSuccess || !record) {
    return null
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <h1 className="text-xl font-bold">Detalles de la Cartilla Médica</h1>
          </CardTitle>
          <CardAction className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/medical-records/${record.id}/edit`)}
            >
              <EditIcon />
              Editar
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteRecord}
              disabled={deleteRecordMutation.isPending}
            >
              <TrashIcon />
              Eliminar
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ItemInfo
              icon={<BookOpenIcon />}
              title="Nombre"
              description={record.name}
            />
            <ItemInfo
              icon={<BookOpenIcon />}
              title="Tipo"
              description={
                <Badge
                  variant={record.type === 'PET' ? 'default' : 'secondary'}
                >
                  {record.type === 'PET' ? 'Mascota' : 'Grupo'}
                </Badge>
              }
            />
            <ItemInfo
              icon={<UserIcon />}
              title="Cliente"
              description={getClientName(record.clientId)}
            />
            <ItemInfo
              icon={<CalendarIcon />}
              title="Fecha de creación"
              description={formatDate(record.createdAt, 'dd/MM/yyyy')}
            />
          </div>
          {record.notes && (
            <>
              <Separator className="my-4" />
              <h4 className="font-semibold mb-2">Notas</h4>
              <ItemInfo icon={<NotebookIcon />} description={record.notes} />
            </>
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
        isLoading={deleteRecordMutation.isPending}
      />
    </div>
  )
}

export default MedicalRecordDetailsPage
