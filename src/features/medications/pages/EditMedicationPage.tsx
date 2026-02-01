import { useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'

import useGetSingleMedication from '../queries/useGetSingleMedication'
import useUpdateMedication from '../queries/useUpdateMedication'
import MedicationForm from '../components/MedicationForm'
import type { CreateMedication } from '../models/CreateMedication'

const EditMedicationPage = () => {
  const navigate = useNavigate()
  const { medicationId } = useParams()
  const { data: medication, isSuccess } = useGetSingleMedication(medicationId)
  const { mutate, isPending } = useUpdateMedication()

  const handleSubmit = (data: CreateMedication) => {
    mutate(
      { id: medicationId!, data },
      {
        onSuccess: () => {
          navigate(-1)
          toast.success('Medicamento actualizado exitosamente')
        },
      },
    )
  }

  const handleCancel = () => {
    navigate(-1)
  }

  if (!isSuccess || !medication) {
    return <div>Cargando...</div>
  }

  return (
    <MedicationForm
      onSubmit={handleSubmit}
      isLoading={isPending}
      onCancel={handleCancel}
      medication={medication}
      submitButtonText="Actualizar"
      title="Editar Medicamento"
    />
  )
}

export default EditMedicationPage
