import { useQuery } from '@tanstack/react-query'
import { getMedications } from '../api/medications'

const useGetMedications = () => {
  return useQuery({
    queryKey: ['medications'],
    queryFn: getMedications,
  })
}

export default useGetMedications
