import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getConsultations } from '../api/consultations'
import type { ConsultationsParams } from '../models/ConsultationsParams'

const useGetConsultations = (params?: ConsultationsParams) => {
  return useQuery({
    queryKey: ['consultations', params],
    queryFn: () => getConsultations(params),
    placeholderData: keepPreviousData,
  })
}

export default useGetConsultations
