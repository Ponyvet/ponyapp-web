import { useQuery } from '@tanstack/react-query'

import { getSingleVaccination } from '../api/vaccinations'

const useGetSingleVaccination = (vaccinationId?: string) => {
  return useQuery({
    enabled: !!vaccinationId,
    queryKey: ['vaccination', vaccinationId],
    queryFn: () => getSingleVaccination(vaccinationId!),
  })
}

export default useGetSingleVaccination
