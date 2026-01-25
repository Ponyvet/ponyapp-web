import { useQuery } from '@tanstack/react-query'

import { getAllPets } from '../api/pets'
import type { PetsParams } from '../models/PetsParams'

const useGetAllPets = ({ params }: { params: PetsParams }) => {
  return useQuery({
    queryKey: ['pets', params],
    queryFn: () => getAllPets(params),
  })
}

export default useGetAllPets
