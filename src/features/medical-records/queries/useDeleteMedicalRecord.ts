import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { AxiosError } from 'axios'

import { deleteMedicalRecord } from '../api/medicalRecords'

const useDeleteMedicalRecord = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteMedicalRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medical-records'] })
      toast.success('Cartilla médica eliminada exitosamente')
      onSuccess?.()
    },
    onError: (error: AxiosError<{ message: string | undefined }>) => {
      toast.error(
        error?.response?.data?.message ||
          'Error al eliminar la cartilla médica',
      )
    },
  })
}

export default useDeleteMedicalRecord
