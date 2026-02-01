import { useQuery } from '@tanstack/react-query'

import { getVisitsByClient } from '../api/visits'

const useGetVisitsByClient = (clientId?: string) => {
  return useQuery({
    queryKey: ['visits', 'client', clientId],
    queryFn: () => getVisitsByClient(clientId!),
    enabled: !!clientId,
  })
}

export default useGetVisitsByClient
