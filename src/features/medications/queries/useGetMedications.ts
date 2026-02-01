import { useQuery } from '@tanstack/react-query'

import { getMedications } from '../api/medications'
import type { MedicationsParams } from '../models/MedicationsParams'

const useGetMedications = (params?: MedicationsParams) => {
  return useQuery({
    queryKey: ['medications', params],
    queryFn: () => getMedications(params),
  })
}

export default useGetMedications
