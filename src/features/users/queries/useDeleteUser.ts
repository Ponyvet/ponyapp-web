import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteUser } from '../api/users'
import type { User } from '../models/User'

const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: User['id']) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

export default useDeleteUser
