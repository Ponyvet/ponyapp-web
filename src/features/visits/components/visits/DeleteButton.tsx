import { TrashIcon } from 'lucide-react'

import { Button } from '@/shared/components/ui/button'
import type { Visit } from '../../models/Visit'
import useDeleteVisit from '../../queries/useDeleteVisit'
import { useConfirm } from '@/shared/hooks/use-confirm'
import { ConfirmDialog } from '@/shared/components/ConfirmDialog'

interface DeleteButtonProps {
  visit: Visit
}

const DeleteButton = ({ visit }: DeleteButtonProps) => {
  const { mutate: deleteVisit, isPending } = useDeleteVisit()
  const { confirm, isOpen, options, handleConfirm, handleCancel } = useConfirm()

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: '¿Eliminar visita?',
      description:
        '¿Estás seguro de que deseas eliminar esta visita? Esta acción no se puede deshacer.',
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
    })

    if (confirmed) {
      deleteVisit(visit.id)
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
