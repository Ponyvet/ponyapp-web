import { useLocation, useNavigate } from 'react-router'

import VaccinationForm from '../components/VaccinationForm'
import useCreateVaccination from '../queries/useCreateVaccination'
import type { CreateVaccination } from '../models/CreateVaccination'

const CreateVaccinationPage = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  const { mutate, isPending } = useCreateVaccination(() => navigate(-1))

  const handleSubmit = (data: CreateVaccination) => {
    mutate(data)
  }

  return (
    <VaccinationForm
      onSubmit={handleSubmit}
      isLoading={isPending}
      onCancel={() => navigate(-1)}
      title="Crear Esquema de Vacunación"
      initialClientId={state?.clientId}
      medicalRecordId={state?.medicalRecordId}
    />
  )
}

export default CreateVaccinationPage
