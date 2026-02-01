import { useNavigate, useParams } from 'react-router'
import { formatDate } from 'date-fns'
import {
  CalendarIcon,
  EditIcon,
  PillIcon,
  TagIcon,
  TimerIcon,
  TrashIcon,
  PawPrintIcon,
  NotebookIcon,
} from 'lucide-react'

import useGetSingleMedication from '../queries/useGetSingleMedication'
import useDeleteMedication from '../queries/useDeleteMedication'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import ItemInfo from '@/shared/components/ItemInfo'
import { useConfirm } from '@/hooks/use-confirm'
import { ConfirmDialog } from '@/shared/components/ConfirmDialog'
import { MEDICATION_CATEGORY_CATALOG, SPECIES_CATALOG } from '../utils/catalogs'
import { getLabelFromCatalog } from '@/shared/utils/helpers'

const MedicationDetailsPage = () => {
  const navigate = useNavigate()
  const { medicationId } = useParams()
  const { data: medication, isSuccess } = useGetSingleMedication(medicationId)
  const deleteMutation = useDeleteMedication(() => navigate('/medications'))
  const { confirm, isOpen, options, handleConfirm, handleCancel } = useConfirm()

  const handleDelete = async () => {
    if (!medication) return

    const confirmed = await confirm({
      title: '¿Eliminar medicamento?',
      description: `¿Estás seguro de que deseas eliminar "${medication.name}"? Esta acción no se puede deshacer.`,
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
    })

    if (confirmed) {
      deleteMutation.mutate(medication.id)
    }
  }

  if (!isSuccess || !medication) {
    return null
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PillIcon className="h-6 w-6" />
            {medication.name}
          </CardTitle>
          <CardAction className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/medications/${medication.id}/edit`)}
            >
              <EditIcon />
              Editar
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              <TrashIcon />
              Eliminar
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ItemInfo
              icon={<TagIcon />}
              title="Categoría"
              description={
                <Badge
                  variant={
                    medication.category === 'VACCINE'
                      ? 'default'
                      : medication.category === 'ANTIBIOTIC'
                        ? 'secondary'
                        : 'outline'
                  }
                >
                  {getLabelFromCatalog(
                    medication.category,
                    MEDICATION_CATEGORY_CATALOG,
                  )}
                </Badge>
              }
            />
            <ItemInfo
              icon={<PawPrintIcon />}
              title="Especie"
              description={
                medication.species
                  ? getLabelFromCatalog(medication.species, SPECIES_CATALOG)
                  : 'Todas las especies'
              }
            />
            {medication.defaultIntervalDays && (
              <ItemInfo
                icon={<TimerIcon />}
                title="Intervalo sugerido"
                description={`${medication.defaultIntervalDays} días`}
              />
            )}
            <ItemInfo
              icon={<CalendarIcon />}
              title="Fecha de creación"
              description={formatDate(medication.createdAt, 'dd/MM/yyyy')}
            />
            <ItemInfo
              icon={<Badge variant={medication.isActive ? 'default' : 'secondary'}>
                {medication.isActive ? 'Activo' : 'Inactivo'}
              </Badge>}
              title="Estado"
              description=""
            />
          </div>

          {medication.notes && (
            <>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Notas</h3>
                <ItemInfo icon={<NotebookIcon />} description={medication.notes} />
              </div>
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
        isLoading={deleteMutation.isPending}
      />
    </div>
  )
}

export default MedicationDetailsPage
