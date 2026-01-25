import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { updateVaccine } from '../api/vaccines'
import type { AxiosError } from 'axios'
import type { CreateVaccine } from '../models/CreateVaccine'

const useUpdateVaccine = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateVaccine }) =>
      updateVaccine(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vaccines'] })
      toast.success('Vacuna actualizada exitosamente')
      onSuccess?.()
    },
    onError: (error: AxiosError<{ message: string | undefined }>) => {
      toast.error(
        error?.response?.data?.message || 'Error al actualizar la vacuna',
      )
    },
  })
}

export default useUpdateVaccine
