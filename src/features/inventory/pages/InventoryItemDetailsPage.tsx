import { useNavigate, useParams } from 'react-router'
import { formatDate } from 'date-fns'
import {
  CalendarIcon,
  EditIcon,
  PackageIcon,
  TagIcon,
  TrashIcon,
  HashIcon,
} from 'lucide-react'

import useGetSingleInventoryItem from '../queries/useGetSingleInventoryItem'
import useDeleteInventoryItem from '../queries/useDeleteInventoryItem'
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
import { inventoryCategoryLabels } from '../utils/catalogs'

const InventoryItemDetailsPage = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { data: item, isSuccess } = useGetSingleInventoryItem(params.itemId!)
  const deleteItemMutation = useDeleteInventoryItem()
  const { confirm, isOpen, options, handleConfirm, handleCancel } = useConfirm()

  const handleDeleteItem = async () => {
    if (!item) return

    const confirmed = await confirm({
      title: '¿Estás absolutamente seguro?',
      description:
        '¿Estás seguro de que deseas eliminar este artículo del inventario? Esta acción no se puede deshacer.',
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
    })

    if (confirmed) {
      deleteItemMutation.mutate(item.id, {
        onSuccess: () => navigate('/inventory'),
      })
    }
  }

  if (!isSuccess || !item) {
    return null
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <h1 className="text-xl font-bold">{item.name}</h1>
          </CardTitle>
          <CardAction className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/inventory/${item.id}/edit`)}
            >
              <EditIcon />
              Editar
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteItem}
              disabled={deleteItemMutation.isPending}
            >
              <TrashIcon />
              Eliminar
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ItemInfo
              icon={<TagIcon />}
              title="Categoría"
              description={inventoryCategoryLabels[item.category]}
            />
            <ItemInfo
              icon={<HashIcon />}
              title="Cantidad"
              description={`${item.quantity} ${item.unit}`}
            />
            <ItemInfo
              icon={<PackageIcon />}
              title="Unidad"
              description={item.unit}
            />
            {item.expirationDate && (
              <ItemInfo
                icon={<CalendarIcon />}
                title="Fecha de caducidad"
                description={formatDate(item.expirationDate, 'dd/MM/yyyy')}
              />
            )}
            {item.medication && (
              <ItemInfo
                icon={<PackageIcon />}
                title="Medicamento asociado"
                description={item.medication.name}
              />
            )}
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
        isLoading={deleteItemMutation.isPending}
      />
    </div>
  )
}

export default InventoryItemDetailsPage
