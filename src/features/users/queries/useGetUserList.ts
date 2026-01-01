import { useQuery } from '@tanstack/react-query'
import { getUserList } from '../api/users'

const useGetUserList = () => {
  return useQuery({
    queryKey: ['users-list'],
    queryFn: getUserList,
  })
}

export default useGetUserList
