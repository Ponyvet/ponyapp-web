import { Navigate, Outlet } from 'react-router'

import { useAuthStore } from '@/features/auth/store/authStore'

const PrivateRoute = () => {
  const isAuth = useAuthStore((state) => state.isAuth)

  if (!isAuth) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default PrivateRoute
