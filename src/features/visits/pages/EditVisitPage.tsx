import { useNavigate, useParams } from 'react-router'

import VisitForm from '../components/VisitForm'
import useGetSingleVisit from '../queries/useGetSingleVisit'
import useUpdateVisit from '../queries/useUpdateVisit'
import type { CreateVisit } from '../models/CreateVisit'

const EditVisitPage = () => {
  const { visitId } = useParams()
  const navigate = useNavigate()
  const { data: visit, isLoading: isLoadingVisit } = useGetSingleVisit(visitId)
  const { mutate, isPending } = useUpdateVisit(() => navigate(-1))

  const handleSubmit = (data: CreateVisit) => {
    if (!visitId) return
    mutate({ id: visitId, data })
  }

  if (isLoadingVisit || !visit) return null

  return (
    <VisitForm
      onSubmit={handleSubmit}
      isLoading={isPending}
      onCancel={() => navigate(-1)}
      visit={visit}
      title="Editar Consulta"
      submitButtonText="Actualizar"
    />
  )
}

export default EditVisitPage
