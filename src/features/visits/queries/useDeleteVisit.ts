import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { deleteVisit } from '../api/visits'

const useDeleteVisit = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteVisit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visits'] })
      toast.success('Consulta eliminada exitosamente')
      onSuccess?.()
    },
    onError: () => {
      toast.error('Error al eliminar la consulta')
    },
  })
}

export default useDeleteVisit
