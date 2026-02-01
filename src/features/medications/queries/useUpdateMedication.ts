import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateMedication } from '../api/medications'
import type { CreateMedication } from '../models/CreateMedication'

const useUpdateMedication = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateMedication> }) =>
      updateMedication(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medications'] })
      queryClient.invalidateQueries({ queryKey: ['medication'] })
    },
  })
}

export default useUpdateMedication
