import { TrashIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { Pet } from '@/features/pets/models/Pet'
import useDeletePet from '@/features/pets/queries/useDeletePet'
import { useConfirm } from '@/hooks/use-confirm'
import { ConfirmDialog } from '@/shared/components/ConfirmDialog'

interface DeleteButtonProps {
  pet: Pet
}

const DeleteButton = ({ pet }: DeleteButtonProps) => {
  const { mutate: deletePet, isPending } = useDeletePet()
  const { confirm, isOpen, options, handleConfirm, handleCancel } = useConfirm()

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: '¿Estás absolutamente seguro?',
      description: `¿Estás seguro de que deseas eliminar la cartilla de ${pet.name}? Esta acción no se puede deshacer.`,
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
    })

    if (confirmed) {
      deletePet(pet.id)
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
