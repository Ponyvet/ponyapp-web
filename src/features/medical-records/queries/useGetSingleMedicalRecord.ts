import { useQuery } from '@tanstack/react-query'

import { getSingleMedicalRecord } from '../api/medicalRecords'

const useGetSingleMedicalRecord = (id?: string) => {
  return useQuery({
    queryKey: ['medical-record', id],
    queryFn: () => getSingleMedicalRecord(id!),
    enabled: !!id,
  })
}

export default useGetSingleMedicalRecord
