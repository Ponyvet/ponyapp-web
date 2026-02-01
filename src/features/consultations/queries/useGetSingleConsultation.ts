import { useQuery } from '@tanstack/react-query'

import { getSingleConsultation } from '../api/consultations'

const useGetSingleConsultation = (id?: string) => {
  return useQuery({
    queryKey: ['consultations', id],
    queryFn: () => getSingleConsultation(id!),
    enabled: !!id,
  })
}

export default useGetSingleConsultation
