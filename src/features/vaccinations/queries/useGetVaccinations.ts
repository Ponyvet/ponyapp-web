import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getVaccinations } from '../api/vaccinations'
import type { VaccinationsParams } from '../models/VaccinationsParams'

const useGetVaccinations = (params?: VaccinationsParams) => {
  return useQuery({
    queryKey: ['vaccinations', params],
    queryFn: () => getVaccinations(params),
    placeholderData: keepPreviousData,
  })
}

export default useGetVaccinations
