import { useQuery } from '@tanstack/react-query'

import { getSinglePet } from '../api/pets'

const useGetSinglePet = (petId?: string) => {
  return useQuery({
    enabled: !!petId,
    queryKey: ['single-pet', petId],
    queryFn: () => getSinglePet(petId!),
  })
}

export default useGetSinglePet
