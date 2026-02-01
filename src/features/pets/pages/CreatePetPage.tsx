import { useLocation, useNavigate } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createPet } from '../api/pets'
import PetForm from '../components/PetForm'
import type { CreatePet } from '../models/CreatePet'
import { Button } from '@/shared/components/ui/button'

const CreatePetPage = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const recordId = state?.recordId as string | undefined

  const { mutate, isPending } = useMutation({
    mutationFn: createPet,
    onSuccess: () => {
      navigate(`/medical-records/${recordId}`)
      toast.success('Mascota creada exitosamente')
    },
    onError: () => {
      toast.error('Error al crear la mascota')
    },
  })

  const handleSubmit = (data: CreatePet) => {
    mutate(data)
  }

  const handleCancel = () => {
    navigate(-1)
  }

  if (!recordId) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <p className="text-muted-foreground">
          Se requiere una cartilla médica para crear una mascota.
        </p>
        <Button onClick={() => navigate(-1)}>Volver</Button>
      </div>
    )
  }

  return (
    <PetForm
      onSubmit={handleSubmit}
      isLoading={isPending}
      onCancel={handleCancel}
      recordId={recordId}
      submitButtonText="Guardar"
      title="Agregar Mascota"
    />
  )
}

export default CreatePetPage
