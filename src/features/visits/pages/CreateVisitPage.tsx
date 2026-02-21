import { useLocation, useNavigate } from 'react-router'

import VisitForm from '../components/VisitForm'
import useCreateVisit from '../queries/useCreateVisit'
import type { CreateVisit } from '../models/CreateVisit'

const CreateVisitPage = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  const { mutate, isPending } = useCreateVisit(() => navigate(-1))

  const handleSubmit = (data: CreateVisit) => {
    mutate(data)
  }

  return (
    <VisitForm
      onSubmit={handleSubmit}
      isLoading={isPending}
      onCancel={() => navigate(-1)}
      title="Crear Consulta"
      initialClientId={state?.clientId}
    />
  )
}

export default CreateVisitPage
