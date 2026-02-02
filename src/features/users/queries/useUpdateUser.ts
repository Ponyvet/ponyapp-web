import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

import { updateUser } from '../api/users'
import type { UpdateUser } from '../models/CreateUser'
import type { User } from '../models/User'

const useUpdateUser = (id: User['id']) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: UpdateUser) => updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      navigate('/users')
    },
  })
}

export default useUpdateUser
