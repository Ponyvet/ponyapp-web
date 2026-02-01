import { useQuery } from '@tanstack/react-query'
import { getRecordVaccinations } from '../api/vaccinations'
import type { MedicalRecord } from '@/features/medical-records/models/MedicalRecord'

const useGetRecordVaccinations = (recordId?: MedicalRecord['id']) => {
  return useQuery({
    enabled: !!recordId,
    queryKey: ['record-vaccinations', recordId],
    queryFn: () => getRecordVaccinations(recordId!),
  })
}

export default useGetRecordVaccinations
