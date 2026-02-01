import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createVaccination } from '../api/vaccinations'

const useCreateVaccination = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createVaccination,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vaccinations'] })
      toast.success('Vacunación creada exitosamente')
      onSuccess?.()
    },
    onError: () => {
      toast.error('Error al crear la vacunación')
    },
  })
}

export default useCreateVaccination
