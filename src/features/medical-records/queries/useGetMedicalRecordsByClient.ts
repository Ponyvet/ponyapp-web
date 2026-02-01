import { useQuery } from '@tanstack/react-query'

import { getMedicalRecordsByClient } from '../api/medicalRecords'

const useGetMedicalRecordsByClient = (clientId?: string) => {
  return useQuery({
    queryKey: ['medical-records', 'client', clientId],
    queryFn: () => getMedicalRecordsByClient(clientId!),
    enabled: !!clientId,
  })
}

export default useGetMedicalRecordsByClient
