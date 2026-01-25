import { TrashIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { Vaccine } from '@/features/vaccines/models/Vaccine'
import useDeleteVaccine from '@/features/vaccines/queries/useDeleteVaccine'

interface DeleteButtonProps {
  vaccine: Vaccine
}

const DeleteButton = ({ vaccine }: DeleteButtonProps) => {
  const { mutate: deleteVaccine, isPending } = useDeleteVaccine()

  const handleDelete = () => {
    const confirmed = window.confirm(
      `¿Estás seguro de que deseas eliminar la vacuna "${vaccine.name}"? Esta acción no se puede deshacer.`,
    )
    if (!confirmed) return
    deleteVaccine(vaccine.id)
  }

  return (
    <Button
      variant="ghost"
      className="text-destructive hover:text-destructive"
      size="sm"
      onClick={handleDelete}
      disabled={isPending}
    >
      <TrashIcon />
    </Button>
  )
}

export default DeleteButton
