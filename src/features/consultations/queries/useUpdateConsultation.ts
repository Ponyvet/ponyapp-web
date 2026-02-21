import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateConsultation } from '../api/consultations'
import type { CreateConsultation } from '../models/CreateConsultation'

const useUpdateConsultation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateConsultation> }) =>
      updateConsultation(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['consultations'] })
      toast.success('Tratamiento actualizado exitosamente')
      onSuccess?.()
    },
    onError: () => {
      toast.error('Error al actualizar el tratamiento')
    },
  })
}

export default useUpdateConsultation
