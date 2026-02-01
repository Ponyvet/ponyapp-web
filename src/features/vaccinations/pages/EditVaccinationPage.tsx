import { useNavigate, useParams } from 'react-router'

import VaccinationForm from '../components/VaccinationForm'
import useGetSingleVaccination from '../queries/useGetSingleVaccination'
import useUpdateVaccination from '../queries/useUpdateVaccination'
import type { CreateVaccination } from '../models/CreateVaccination'

const EditVaccinationPage = () => {
  const { vaccinationId } = useParams()
  const navigate = useNavigate()

  const { data: vaccination, isLoading: isLoadingVaccination } =
    useGetSingleVaccination(vaccinationId)

  const { mutate, isPending } = useUpdateVaccination(() => navigate(-1))

  const handleSubmit = (data: CreateVaccination) => {
    if (!vaccinationId) return
    mutate({ id: vaccinationId, data })
  }

  if (isLoadingVaccination || !vaccination) {
    return null
  }

  return (
    <VaccinationForm
      onSubmit={handleSubmit}
      isLoading={isPending}
      onCancel={() => navigate(-1)}
      vaccination={vaccination}
      title="Editar Vacunación"
      submitButtonText="Actualizar"
      initialClientId={vaccination.record.client.id}
    />
  )
}

export default EditVaccinationPage
