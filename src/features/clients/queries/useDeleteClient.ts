import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { deleteClient } from '../api/clients'
import type { AxiosError } from 'axios'

const useDeleteClient = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
      toast.success('Cliente eliminado exitosamente')
      onSuccess?.()
    },
    onError: (error: AxiosError<{ message: string | undefined }>) => {
      toast.error(
        error?.response?.data?.message || 'Error al eliminar el cliente',
      )
    },
  })
}

export default useDeleteClient
