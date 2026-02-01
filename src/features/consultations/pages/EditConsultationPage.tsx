import { useNavigate, useParams } from 'react-router'

import ConsultationForm from '../components/ConsultationForm'
import useGetSingleConsultation from '../queries/useGetSingleConsultation'
import useUpdateConsultation from '../queries/useUpdateConsultation'
import type { CreateConsultation } from '../models/CreateConsultation'

const EditConsultationPage = () => {
  const { consultationId } = useParams()
  const navigate = useNavigate()

  const { data: consultation, isLoading: isLoadingConsultation } =
    useGetSingleConsultation(consultationId)

  const { mutate, isPending } = useUpdateConsultation(() => navigate(-1))

  const handleSubmit = (data: CreateConsultation) => {
    if (!consultationId) return
    mutate({ id: consultationId, data })
  }

  if (isLoadingConsultation || !consultation) {
    return null
  }

  return (
    <ConsultationForm
      onSubmit={handleSubmit}
      isLoading={isPending}
      onCancel={() => navigate(-1)}
      consultation={consultation}
      title="Editar Consulta"
      submitButtonText="Actualizar"
      initialClientId={consultation.visit.client.id}
    />
  )
}

export default EditConsultationPage
