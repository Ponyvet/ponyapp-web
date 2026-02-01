import { useNavigate, useParams } from 'react-router'
import { formatDate } from 'date-fns'
import {
  BookOpenIcon,
  CalendarIcon,
  EditIcon,
  NotebookIcon,
  PawPrintIcon,
  PlusIcon,
  TrashIcon,
} from 'lucide-react'

import useGetSingleMedicalRecord from '../queries/useGetSingleMedicalRecord'
import useDeleteMedicalRecord from '../queries/useDeleteMedicalRecord'
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
import { Badge } from '@/shared/components/ui/badge'
import { isPetRecord } from '../utils/formatters'
import PetInfo from '@/shared/components/PetInfo'
import AnimalGroupInfo from '../components/AnimalGroupInfo'
import { Separator } from '@/shared/components/ui/separator'
import VaccinationsCard from '@/features/vaccinations/components/VaccinationsCard'

const MedicalRecordDetailsPage = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { data: record, isSuccess } = useGetSingleMedicalRecord(params.recordId)
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
            <h1 className="text-xl font-bold">
              Detalles de la Cartilla Médica
            </h1>
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
              title="Tipo de Cartilla"
              description={
                <Badge
                  variant={record.type === 'PET' ? 'default' : 'secondary'}
                >
                  {record.type === 'PET' ? 'Mascota' : 'Grupo'}
                </Badge>
              }
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
              <h4 className="font-semibold mb-2">Notas Generales</h4>
              <ItemInfo icon={<NotebookIcon />} description={record.notes} />
            </>
          )}
        </CardContent>
      </Card>
      {/* Información específica de mascota o grupo */}
      {isPetRecord(record) && (
        <>
          <PetInfo
            pet={record.pet}
            name={record.name}
            clientId={record.clientId}
            client={record.client}
            showEditButton={true}
            recordId={record.id}
          />
          <VaccinationsCard
            recordId={record.id}
            medicalRecordId={record.id}
            clientId={record.clientId}
          />
        </>
      )}
      {/* Mostrar opción para agregar mascota si es tipo PET pero no tiene pet */}
      {record.type === 'PET' && record.pet === null && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8 gap-4">
            <PawPrintIcon className="h-12 w-12 text-muted-foreground" />
            <div className="text-center">
              <h3 className="font-semibold">Sin datos de mascota</h3>
              <p className="text-sm text-muted-foreground">
                Esta cartilla aún no tiene los datos de la mascota registrados.
              </p>
            </div>
            <Button
              onClick={() =>
                navigate('/pets/add', { state: { recordId: record.id } })
              }
            >
              <PlusIcon />
              Agregar Mascota
            </Button>
          </CardContent>
        </Card>
      )}
      <AnimalGroupInfo record={record} />
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
