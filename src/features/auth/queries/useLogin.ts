import { useMutation } from '@tanstack/react-query'

import { login } from '../api/login'
import { useAuthStore } from '../store/authStore'

const useLogin = () => {
  const setAuth = useAuthStore((s) => s.setAuth)
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      setAuth(true)
    },
  })
}

export default useLogin
