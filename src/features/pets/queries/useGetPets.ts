import { useQuery } from '@tanstack/react-query'

import { getClientPets } from '../api/pets'

const useGetPets = (clientId?: string) => {
  return useQuery({
    enabled: !!clientId,
    queryKey: ['pets', clientId],
    queryFn: () => getClientPets(clientId!),
  })
}

export default useGetPets
