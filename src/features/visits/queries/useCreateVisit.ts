import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createVisit } from '../api/visits'

const useCreateVisit = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createVisit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visits'] })
      toast.success('Visita creada exitosamente')
      onSuccess?.()
    },
    onError: () => {
      toast.error('Error al crear la visita')
    },
  })
}

export default useCreateVisit
