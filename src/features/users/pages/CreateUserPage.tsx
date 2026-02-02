import { useNavigate } from 'react-router'

import UserForm from '../components/UserForm'
import useCreateUser from '../queries/useCreateUser'
import type { CreateUser } from '../models/CreateUser'

const CreateUserPage = () => {
  const navigate = useNavigate()

  const { mutate, isPending } = useCreateUser()

  const handleSubmit = (data: CreateUser) => {
    mutate(data)
  }

  return (
    <UserForm
      onSubmit={(data) => handleSubmit(data as CreateUser)}
      isLoading={isPending}
      onCancel={() => navigate(-1)}
      title="Crear Usuario"
    />
  )
}

export default CreateUserPage
