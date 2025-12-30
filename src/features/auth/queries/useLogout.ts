import { useMutation } from '@tanstack/react-query'

import { logout } from '../api/login'
import { useAuthStore } from '../store/authStore'

const useLogout = () => {
  const { setAuth, setSession } = useAuthStore()
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setAuth(false)
      setSession(null)
    },
  })
}

export default useLogout
