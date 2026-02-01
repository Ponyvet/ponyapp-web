import { TrashIcon } from 'lucide-react'

import { Button } from '@/shared/components/ui/button'
import type { Vaccination } from '../../models/Vaccination'
import useDeleteVaccination from '../../queries/useDeleteVaccination'
import { useConfirm } from '@/shared/hooks/use-confirm'
import { ConfirmDialog } from '@/shared/components/ConfirmDialog'

interface DeleteButtonProps {
  vaccination: Vaccination
}

const DeleteButton = ({ vaccination }: DeleteButtonProps) => {
  const { mutate: deleteVaccination, isPending } = useDeleteVaccination()
  const { confirm, isOpen, options, handleConfirm, handleCancel } = useConfirm()

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: '¿Eliminar vacunación?',
      description:
        '¿Estás seguro de que deseas eliminar esta vacunación? Esta acción no se puede deshacer.',
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
    })

    if (confirmed) {
      deleteVaccination(vaccination.id)
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
