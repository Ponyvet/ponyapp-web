import { useQuery } from '@tanstack/react-query'

import { getSingleMedication } from '../api/medications'

const useGetSingleMedication = (id?: string) => {
  return useQuery({
    enabled: !!id,
    queryKey: ['medication', id],
    queryFn: () => getSingleMedication(id!),
  })
}

export default useGetSingleMedication
