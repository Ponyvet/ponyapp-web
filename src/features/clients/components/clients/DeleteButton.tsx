import { TrashIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { Client } from '@/features/clients/models/Client'
import useDeleteClient from '@/features/clients/queries/useDeleteClient'

interface DeleteButtonProps {
  client: Client
}

const DeleteButton = ({ client }: DeleteButtonProps) => {
  const { mutate: deleteClient, isPending } = useDeleteClient()

  const handleDelete = () => {
    const confirmed = window.confirm(
      `¿Estás seguro de que deseas eliminar a ${client.name}? Esta acción no se puede deshacer.`,
    )
    if (!confirmed) return
    deleteClient(client.id)
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleDelete}
      disabled={isPending}
    >
      <TrashIcon />
    </Button>
  )
}

export default DeleteButton
