import type { Option } from '@/shared/utils/types'
import useGetUserList from '../queries/useGetUserList'

const useUsers = () => {
  const { data: users = [] } = useGetUserList()

  const getUserName = (userId: string): string => {
    const user = users.find((user) => user.id === userId)
    return user?.name ?? ''
  }

  const getUsersAsOptions = (): Option[] => {
    return users.map((user) => ({
      label: user.name,
      value: user.id,
    }))
  }

  return { users, getUserName, getUsersAsOptions }
}

export default useUsers
