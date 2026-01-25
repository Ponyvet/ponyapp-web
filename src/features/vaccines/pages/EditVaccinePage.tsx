import { useNavigate, useParams } from 'react-router'
import useGetSingleVaccine from '../queries/useGetSingleVaccine'
import useUpdateVaccine from '../queries/useUpdateVaccine'
import VaccineForm from '../components/VaccineForm'
import type { CreateVaccine } from '../models/CreateVaccine'

const EditVaccinePage = () => {
  const navigate = useNavigate()
  const { vaccineId } = useParams()
  const {
    data: vaccine,
    isSuccess,
    isLoading,
  } = useGetSingleVaccine(vaccineId!)
  const { mutate, isPending } = useUpdateVaccine(() => navigate(-1))

  const handleSubmit = (data: CreateVaccine) => {
    mutate({ id: vaccineId!, data })
  }

  if (isLoading) return <div>Cargando...</div>
  if (!isSuccess || !vaccine) return <div>Error al cargar la vacuna</div>

  return (
    <VaccineForm
      vaccine={vaccine}
      onSubmit={handleSubmit}
      isPending={isPending}
      title="Editar Vacuna"
      submitText="Actualizar"
    />
  )
}

export default EditVaccinePage
