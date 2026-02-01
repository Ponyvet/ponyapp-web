import { useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'

import useGetSinglePet from '../queries/useGetSinglePet'
import useUpdatePet from '../queries/useUpdatePet'
import PetForm from '../components/PetForm'
import type { CreatePet } from '../models/CreatePet'

const EditPetPage = () => {
  const navigate = useNavigate()
  const { petId } = useParams()
  const { data: pet, isSuccess } = useGetSinglePet(petId!)
  const { mutate, isPending } = useUpdatePet()

  const handleSubmit = (data: CreatePet) => {
    mutate(
      { petId: petId!, data },
      {
        onSuccess: () => {
          navigate(-1)
          toast.success('Mascota actualizada exitosamente')
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
      recordId={pet.recordId}
      pet={pet}
      submitButtonText="Actualizar"
      title="Editar Mascota"
    />
  )
}

export default EditPetPage
