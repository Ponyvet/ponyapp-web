import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useNavigate, useLocation } from 'react-router'

import { createMedicalRecord } from '../api/medicalRecords'
import MedicalRecordForm from '../components/MedicalRecordForm'
import type { CreateMedicalRecord } from '../models/CreateMedicalRecord'

const CreateMedicalRecordPage = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const defaultClientId = state?.clientId as string | undefined

  const { mutate, isPending } = useMutation({
    mutationFn: createMedicalRecord,
    onSuccess: () => {
      navigate(-1)
      toast.success('Cartilla médica creada exitosamente')
    },
    onError: (error) => {
      toast.error('Error al crear la cartilla médica', {
        description: (error as Error).message,
      })
    },
  })

  const handleSubmit = (data: CreateMedicalRecord) => {
    mutate(data)
  }

  return (
    <MedicalRecordForm
      onSubmit={handleSubmit}
      isPending={isPending}
      title="Agregar Nueva Cartilla Médica"
      submitText="Guardar"
      defaultClientId={defaultClientId}
    />
  )
}

export default CreateMedicalRecordPage
