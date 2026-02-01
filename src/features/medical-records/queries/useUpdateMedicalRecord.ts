import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateMedicalRecord } from '../api/medicalRecords'
import type { CreateMedicalRecord } from '../models/CreateMedicalRecord'

const useUpdateMedicalRecord = (recordId: string, onSuccess?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateMedicalRecord) =>
      updateMedicalRecord(recordId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medical-records'] })
      queryClient.invalidateQueries({ queryKey: ['medical-record', recordId] })
      toast.success('Cartilla médica actualizada exitosamente')
      onSuccess?.()
    },
    onError: (error) => {
      toast.error('Error al actualizar la cartilla médica', {
        description: (error as Error).message,
      })
    },
  })
}

export default useUpdateMedicalRecord
