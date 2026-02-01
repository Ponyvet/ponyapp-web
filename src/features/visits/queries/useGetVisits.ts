import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getVisits } from '../api/visits'
import type { VisitsParams } from '../models/VisitsParams'

const useGetVisits = (params?: VisitsParams) => {
  return useQuery({
    queryKey: ['visits', params],
    queryFn: () => getVisits(params),
    placeholderData: keepPreviousData,
  })
}

export default useGetVisits
