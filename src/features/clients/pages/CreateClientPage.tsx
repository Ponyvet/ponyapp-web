import { useMutation } from '@tanstack/react-query'
import { createClient } from '../api/clients'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'
import ClientForm from '../components/ClientForm'
import type { CreateClient } from '../models/CreateClient'

const CreateClientPage = () => {
  const navigate = useNavigate()
  const { mutate, isPending } = useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      navigate(-1)
      toast.success('Cliente creado exitosamente')
    },
    onError: (error) => {
      toast.error('Error al crear el cliente', {
        description: (error as Error).message,
      })
    },
  })

  const handleSubmit = (data: CreateClient) => {
    mutate(data)
  }

  return (
    <ClientForm
      onSubmit={handleSubmit}
      isPending={isPending}
      title="Agregar Nuevo Cliente"
      submitText="Guardar"
    />
  )
}

export default CreateClientPage
