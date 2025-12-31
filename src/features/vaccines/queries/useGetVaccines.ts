import { useQuery } from '@tanstack/react-query'
import { getVaccines } from '../api/vaccines'

const useGetVaccines = () => {
  return useQuery({
    queryKey: ['vaccines'],
    queryFn: getVaccines,
  })
}

export default useGetVaccines
