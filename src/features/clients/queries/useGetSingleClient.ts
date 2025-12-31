import { useQuery } from '@tanstack/react-query'

import { getSingleClient } from '../api/clients'

const useGetSingleClient = (id?: string) => {
  return useQuery({
    queryKey: ['client', id],
    queryFn: () => getSingleClient(id!),
    enabled: !!id,
  })
}

export default useGetSingleClient
