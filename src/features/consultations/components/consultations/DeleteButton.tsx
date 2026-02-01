import { TrashIcon } from 'lucide-react'

import { Button } from '@/shared/components/ui/button'
import type { Consultation } from '../../models/Consultation'
import useDeleteConsultation from '../../queries/useDeleteConsultation'
import { useConfirm } from '@/shared/hooks/use-confirm'
import { ConfirmDialog } from '@/shared/components/ConfirmDialog'

interface DeleteButtonProps {
  consultation: Consultation
}

const DeleteButton = ({ consultation }: DeleteButtonProps) => {
  const { mutate: deleteConsultation, isPending } = useDeleteConsultation()
  const { confirm, isOpen, options, handleConfirm, handleCancel } = useConfirm()

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: '¿Eliminar consulta?',
      description:
        '¿Estás seguro de que deseas eliminar esta consulta? Esta acción no se puede deshacer.',
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
    })

    if (confirmed) {
      deleteConsultation(consultation.id)
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
