import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createConsultation } from '../api/consultations'

const useCreateConsultation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createConsultation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['consultations'] })
      toast.success('Consulta creada exitosamente')
      onSuccess?.()
    },
    onError: () => {
      toast.error('Error al crear la consulta')
    },
  })
}

export default useCreateConsultation
