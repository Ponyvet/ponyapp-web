import { TrashIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { Vaccine } from '@/features/vaccines/models/Vaccine'
import useDeleteVaccine from '@/features/vaccines/queries/useDeleteVaccine'
import { useConfirm } from '@/hooks/use-confirm'
import { ConfirmDialog } from '@/shared/components/ConfirmDialog'

interface DeleteButtonProps {
  vaccine: Vaccine
}

const DeleteButton = ({ vaccine }: DeleteButtonProps) => {
  const { mutate: deleteVaccine, isPending } = useDeleteVaccine()
  const { confirm, isOpen, options, handleConfirm, handleCancel } = useConfirm()

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: '¿Estás absolutamente seguro?',
      description: `¿Estás seguro de que deseas eliminar la vacuna "${vaccine.name}"? Esta acción no se puede deshacer.`,
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
    })

    if (confirmed) {
      deleteVaccine(vaccine.id)
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
