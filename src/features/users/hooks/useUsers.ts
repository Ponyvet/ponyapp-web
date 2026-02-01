import useGetUserList from '../queries/useGetUserList'

const useUsers = () => {
  const { data: users = [] } = useGetUserList()

  const getUserName = (userId: string): string => {
    const user = users.find((user) => user.id === userId)
    return user?.name ?? ''
  }

  return { users, getUserName }
}

export default useUsers
