import { useLocation, useNavigate } from 'react-router'

import ConsultationForm from '../components/ConsultationForm'
import useCreateConsultation from '../queries/useCreateConsultation'
import type { CreateConsultation } from '../models/CreateConsultation'

const CreateConsultationPage = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  const { mutate, isPending } = useCreateConsultation(() => navigate(-1))

  const handleSubmit = (data: CreateConsultation) => {
    mutate(data)
  }

  return (
    <ConsultationForm
      onSubmit={handleSubmit}
      isLoading={isPending}
      onCancel={() => navigate(-1)}
      title="Crear Tratamiento"
      initialClientId={state?.clientId}
      medicalRecordId={state?.medicalRecordId}
      initialVisitId={state?.visitId}
    />
  )
}

export default CreateConsultationPage
