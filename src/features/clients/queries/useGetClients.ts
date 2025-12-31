import { useQuery } from '@tanstack/react-query'

import { getClients } from '../api/clients'

const useGetClients = () => {
  return useQuery({
    queryKey: ['clients'],
    queryFn: getClients,
  })
}

export default useGetClients
