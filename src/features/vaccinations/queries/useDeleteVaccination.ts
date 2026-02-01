import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { deleteVaccination } from '../api/vaccinations'

const useDeleteVaccination = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteVaccination,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vaccinations'] })
      toast.success('Vacunación eliminada exitosamente')
      onSuccess?.()
    },
    onError: () => {
      toast.error('Error al eliminar la vacunación')
    },
  })
}

export default useDeleteVaccination
