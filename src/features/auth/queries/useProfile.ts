import { useQuery } from '@tanstack/react-query'
import { getProfile } from '../api/login'

const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })
}

export default useProfile
