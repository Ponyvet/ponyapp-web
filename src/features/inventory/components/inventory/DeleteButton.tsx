import { TrashIcon } from 'lucide-react'

import { Button } from '@/shared/components/ui/button'
import type { InventoryItem } from '../../models/InventoryItem'
import useDeleteInventoryItem from '../../queries/useDeleteInventoryItem'
import { useConfirm } from '@/shared/hooks/use-confirm'
import { ConfirmDialog } from '@/shared/components/ConfirmDialog'

interface DeleteButtonProps {
  item: InventoryItem
}

const DeleteButton = ({ item }: DeleteButtonProps) => {
  const { mutate: deleteItem, isPending } = useDeleteInventoryItem()
  const { confirm, isOpen, options, handleConfirm, handleCancel } = useConfirm()

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: '¿Eliminar artículo?',
      description:
        '¿Estás seguro de que deseas eliminar este artículo del inventario? Esta acción no se puede deshacer.',
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
    })

    if (confirmed) {
      deleteItem(item.id)
    }
  }

  return (
    <>
      <Button
        variant="ghost"
        className="text-destructive hover:text-destructive"
        size="sm"
        onClick={handleDelete}
        disabled={isPending}
      >
        <TrashIcon />
      </Button>
      <ConfirmDialog
        open={isOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title={options.title}
        description={options.description}
        confirmText={options.confirmText}
        cancelText={options.cancelText}
        isLoading={isPending}
      />
    </>
  )
}

export default DeleteButton
