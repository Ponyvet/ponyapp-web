import { useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'

import useGetClients from '@/features/clients/queries/useGetClients'
import useGetSinglePet from '../queries/useGetSinglePet'
import useUpdatePet from '../queries/useUpdatePet'
import PetForm from '../components/PetForm'
import type { CreatePet } from '../models/CreatePet'

const EditPetPage = () => {
  const navigate = useNavigate()
  const { petId } = useParams()
  const { data: clients = [] } = useGetClients()
  const { data: pet, isSuccess } = useGetSinglePet(petId!)
  const { mutate, isPending } = useUpdatePet()

  const handleSubmit = (data: CreatePet) => {
    mutate(
      { petId: petId!, data },
      {
        onSuccess: () => {
          navigate(-1)
          toast.success('Cartilla actualizada exitosamente')
        },
      },
    )
  }

  const handleCancel = () => {
    navigate(-1)
  }

  if (!isSuccess || !pet) {
    return <div>Cargando...</div>
  }

  return (
    <PetForm
      onSubmit={handleSubmit}
      isLoading={isPending}
      onCancel={handleCancel}
      clients={clients}
      pet={pet}
      submitButtonText="Actualizar"
      title="Editar Cartilla"
    />
  )
}

export default EditPetPage
