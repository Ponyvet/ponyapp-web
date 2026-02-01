import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getMedicalRecords } from '../api/medicalRecords'
import type { MedicalRecordParams } from '../models/MedicalRecordParams'

const useGetMedicalRecords = (params?: MedicalRecordParams) => {
  return useQuery({
    queryKey: ['medical-records', params],
    queryFn: () => getMedicalRecords(params),
    placeholderData: keepPreviousData,
  })
}

export default useGetMedicalRecords
