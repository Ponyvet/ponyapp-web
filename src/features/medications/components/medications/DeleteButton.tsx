import { TrashIcon } from 'lucide-react'

import { Button } from '@/shared/components/ui/button'
import type { Medication } from '../../models/Medication'
import useDeleteMedication from '../../queries/useDeleteMedication'
import { useConfirm } from '@/shared/hooks/use-confirm'
import { ConfirmDialog } from '@/shared/components/ConfirmDialog'

interface DeleteButtonProps {
  medication: Medication
}

const DeleteButton = ({ medication }: DeleteButtonProps) => {
  const { mutate: deleteMedication, isPending } = useDeleteMedication()
  const { confirm, isOpen, options, handleConfirm, handleCancel } = useConfirm()

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: '¿Eliminar medicamento?',
      description: `¿Estás seguro de que deseas eliminar "${medication.name}"? Esta acción no se puede deshacer.`,
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
    })

    if (confirmed) {
      deleteMedication(medication.id)
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
