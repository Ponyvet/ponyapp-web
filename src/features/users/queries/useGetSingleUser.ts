import { useQuery } from '@tanstack/react-query'

import { getSingleUser } from '../api/users'
import type { User } from '../models/User'

const useGetSingleUser = (id: User['id']) => {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => getSingleUser(id),
    enabled: !!id,
  })
}

export default useGetSingleUser
