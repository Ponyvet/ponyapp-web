import { useLocation, useNavigate } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createPet } from '../api/pets'
import useGetClients from '@/features/clients/queries/useGetClients'
import PetForm from '../components/PetForm'
import type { CreatePet } from '../models/CreatePet'

const CreatePetPage = () => {
  const navigate = useNavigate()
  const { data: clients = [] } = useGetClients()
  const { state } = useLocation()
  const clientId = state?.clientId as string | undefined
  const { mutate, isPending } = useMutation({
    mutationFn: createPet,
    onSuccess: () => {
      navigate(-1)
      toast.success('Cartilla creada exitosamente')
    },
  })

  const handleSubmit = (data: CreatePet) => {
    mutate(data)
  }

  const handleCancel = () => {
    navigate(-1)
  }

  return (
    <PetForm
      onSubmit={handleSubmit}
      isLoading={isPending}
      onCancel={handleCancel}
      clients={clients}
      initialClientId={clientId}
      submitButtonText="Guardar"
      title="Crear Cartilla"
    />
  )
}

export default CreatePetPage
