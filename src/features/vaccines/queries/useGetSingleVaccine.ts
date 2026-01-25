import { useQuery } from '@tanstack/react-query'
import { getSingleVaccine } from '../api/vaccines'

const useGetSingleVaccine = (id: string) => {
  return useQuery({
    queryKey: ['vaccines', id],
    queryFn: () => getSingleVaccine(id),
    enabled: !!id,
  })
}

export default useGetSingleVaccine
