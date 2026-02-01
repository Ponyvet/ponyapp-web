import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateVaccination } from '../api/vaccinations'
import type { CreateVaccination } from '../models/CreateVaccination'

const useUpdateVaccination = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string
      data: Partial<CreateVaccination>
    }) => updateVaccination(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vaccinations'] })
      toast.success('Vacunación actualizada exitosamente')
      onSuccess?.()
    },
    onError: () => {
      toast.error('Error al actualizar la vacunación')
    },
  })
}

export default useUpdateVaccination
