import { useQuery } from '@tanstack/react-query'

import { getSingleVisit } from '../api/visits'

const useGetSingleVisit = (id?: string) => {
  return useQuery({
    queryKey: ['visits', id],
    queryFn: () => getSingleVisit(id!),
    enabled: !!id,
  })
}

export default useGetSingleVisit
