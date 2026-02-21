import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createVisit } from '../api/visits'

const useCreateVisit = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createVisit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visits'] })
      toast.success('Consulta creada exitosamente')
      onSuccess?.()
    },
    onError: () => {
      toast.error('Error al crear la consulta')
    },
  })
}

export default useCreateVisit
