import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { deleteConsultation } from '../api/consultations'

const useDeleteConsultation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteConsultation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['consultations'] })
      toast.success('Tratamiento eliminado exitosamente')
      onSuccess?.()
    },
    onError: () => {
      toast.error('Error al eliminar el tratamiento')
    },
  })
}

export default useDeleteConsultation
