import { useQuery } from '@tanstack/react-query'
import { getPetVaccinations } from '../api/vaccinations'

const useGetPetVaccinations = (petId?: string) => {
  return useQuery({
    enabled: !!petId,
    queryKey: ['vaccinations', petId],
    queryFn: () => getPetVaccinations(petId!),
  })
}

export default useGetPetVaccinations
