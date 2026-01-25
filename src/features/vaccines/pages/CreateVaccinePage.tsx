import { useNavigate } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createVaccine } from '../api/vaccines'
import VaccineForm from '../components/VaccineForm'
import type { CreateVaccine } from '../models/CreateVaccine'

const CreateVaccinePage = () => {
  const navigate = useNavigate()
  const { mutate, isPending } = useMutation({
    mutationFn: createVaccine,
    onSuccess: () => {
      navigate(-1)
      toast.success('Vacuna creada exitosamente')
    },
  })

  const handleSubmit = (data: CreateVaccine) => {
    mutate(data)
  }

  return (
    <VaccineForm
      onSubmit={handleSubmit}
      isPending={isPending}
      title="Crear Vacuna"
      submitText="Guardar"
    />
  )
}

export default CreateVaccinePage
