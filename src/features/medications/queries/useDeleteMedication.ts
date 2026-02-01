import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { deleteMedication } from '../api/medications'

const useDeleteMedication = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteMedication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medications'] })
      toast.success('Medicamento eliminado exitosamente')
      onSuccess?.()
    },
    onError: () => {
      toast.error('Error al eliminar el medicamento')
    },
  })
}

export default useDeleteMedication
