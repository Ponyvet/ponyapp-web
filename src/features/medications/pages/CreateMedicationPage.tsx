import { useNavigate } from 'react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createMedication } from '../api/medications'
import MedicationForm from '../components/MedicationForm'
import type { CreateMedication } from '../models/CreateMedication'

const CreateMedicationPage = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: createMedication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medications'] })
      navigate('/medications')
      toast.success('Medicamento creado exitosamente')
    },
    onError: () => {
      toast.error('Error al crear el medicamento')
    },
  })

  const handleSubmit = (data: CreateMedication) => {
    mutate(data)
  }

  const handleCancel = () => {
    navigate(-1)
  }

  return (
    <MedicationForm
      onSubmit={handleSubmit}
      isLoading={isPending}
      onCancel={handleCancel}
      submitButtonText="Guardar"
      title="Nuevo Medicamento"
    />
  )
}

export default CreateMedicationPage
