import { useNavigate, useParams } from 'react-router'
import useGetSingleClient from '../queries/useGetSingleClient'
import useUpdateClient from '../queries/useUpdateClient'
import ClientForm from '../components/ClientForm'
import type { CreateClient } from '../models/CreateClient'

const EditClientPage = () => {
  const navigate = useNavigate()
  const { clientId } = useParams()
  const { data: client, isSuccess, isLoading } = useGetSingleClient(clientId)
  const { mutate, isPending } = useUpdateClient(clientId!, () => navigate(-1))

  const handleSubmit = (data: CreateClient) => {
    mutate(data)
  }

  if (isLoading) return <div>Cargando...</div>
  if (!isSuccess || !client) return <div>Error al cargar el cliente</div>

  return (
    <ClientForm
      client={client}
      onSubmit={handleSubmit}
      isPending={isPending}
      title="Editar Cliente"
      submitText="Actualizar"
    />
  )
}

export default EditClientPage
