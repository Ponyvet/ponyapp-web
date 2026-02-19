import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updatePet } from '../api/pets'
import type { Pet } from '../models/Pet'
import type { CreatePet } from '../models/CreatePet'
import { toast } from 'sonner'

const useUpdatePet = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      petId,
      data,
    }: {
      petId: Pet['id']
      data: Partial<CreatePet>
    }) => updatePet(petId, data),
    onSuccess: (updatedPet) => {
      queryClient.invalidateQueries({ queryKey: ['pets'] })
      queryClient.invalidateQueries({ queryKey: ['pet', updatedPet.id] })
      queryClient.invalidateQueries({
        queryKey: ['pets', 'client'],
      })
      toast.success('Cartilla actualizada correctamente')
    },
    onError: () => {
      toast.error('Error al actualizar la cartilla')
    },
  })
}

export default useUpdatePet
