import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { deleteVaccine } from '../api/vaccines'
import type { AxiosError } from 'axios'

const useDeleteVaccine = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteVaccine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vaccines'] })
      toast.success('Vacuna eliminada exitosamente')
      onSuccess?.()
    },
    onError: (error: AxiosError<{ message: string | undefined }>) => {
      toast.error(
        error?.response?.data?.message || 'Error al eliminar la vacuna',
      )
    },
  })
}

export default useDeleteVaccine
