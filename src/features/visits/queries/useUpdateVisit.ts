import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateVisit } from '../api/visits'
import type { CreateVisit } from '../models/CreateVisit'

const useUpdateVisit = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateVisit> }) =>
      updateVisit(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visits'] })
      toast.success('Consulta actualizada exitosamente')
      onSuccess?.()
    },
    onError: () => {
      toast.error('Error al actualizar la consulta')
    },
  })
}

export default useUpdateVisit
