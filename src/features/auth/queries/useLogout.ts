import { useMutation } from '@tanstack/react-query'

import { logout } from '../api/login'
import { useAuthStore } from '../store/authStore'

const useLogout = () => {
  const { setAuth, setSession } = useAuthStore()

  const clearSession = () => {
    setAuth(false)
    setSession(null)
  }

  return useMutation({
    mutationFn: logout,
    onSuccess: clearSession,
    onError: clearSession,
  })
}

export default useLogout
