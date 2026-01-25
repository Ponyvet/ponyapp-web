import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateClient } from '../api/clients'
import { toast } from 'sonner'
import type { CreateClient } from '../models/CreateClient'

const useUpdateClient = (clientId: string, onSuccess?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateClient) => updateClient(clientId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
      queryClient.invalidateQueries({ queryKey: ['client', clientId] })
      toast.success('Cliente actualizado exitosamente')
      onSuccess?.()
    },
    onError: (error) => {
      toast.error('Error al actualizar el cliente', {
        description: (error as Error).message,
      })
    },
  })
}

export default useUpdateClient
