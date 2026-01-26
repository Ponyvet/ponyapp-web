import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deletePet } from '../api/pets'
import type { Pet } from '../models/Pet'
import { toast } from 'sonner'

const useDeletePet = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (petId: Pet['id']) => deletePet(petId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pets'] })
      toast.success('Cartilla eliminada correctamente')
      if (onSuccess) {
        onSuccess()
      }
    },
    onError: () => {
      toast.error('Error al eliminar la cartilla')
    },
  })
}

export default useDeletePet
