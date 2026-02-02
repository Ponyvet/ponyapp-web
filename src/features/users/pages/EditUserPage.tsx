import { useNavigate, useParams } from 'react-router'

import UserForm from '../components/UserForm'
import useGetSingleUser from '../queries/useGetSingleUser'
import useUpdateUser from '../queries/useUpdateUser'
import type { UpdateUser } from '../models/CreateUser'

const EditUserPage = () => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const { data: user, isLoading: isLoadingUser } = useGetSingleUser(userId!)
  const { mutate, isPending } = useUpdateUser(userId!)

  const handleSubmit = (data: UpdateUser) => {
    if (!userId) return
    mutate(data)
  }

  if (isLoadingUser || !user) return null

  return (
    <UserForm
      onSubmit={handleSubmit}
      isLoading={isPending}
      onCancel={() => navigate(-1)}
      user={user}
      title="Editar Usuario"
      submitButtonText="Actualizar"
    />
  )
}

export default EditUserPage
