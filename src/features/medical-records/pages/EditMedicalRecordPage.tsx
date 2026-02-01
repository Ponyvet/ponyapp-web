import { useNavigate, useParams } from 'react-router'

import useGetSingleMedicalRecord from '../queries/useGetSingleMedicalRecord'
import useUpdateMedicalRecord from '../queries/useUpdateMedicalRecord'
import MedicalRecordForm from '../components/MedicalRecordForm'
import type { CreateMedicalRecord } from '../models/CreateMedicalRecord'

const EditMedicalRecordPage = () => {
  const navigate = useNavigate()
  const { recordId } = useParams()
  const {
    data: record,
    isSuccess,
    isLoading,
  } = useGetSingleMedicalRecord(recordId)
  const { mutate, isPending } = useUpdateMedicalRecord(recordId!, () =>
    navigate(-1),
  )

  const handleSubmit = (data: CreateMedicalRecord) => {
    mutate(data)
  }

  if (isLoading) return <div>Cargando...</div>
  if (!isSuccess || !record)
    return <div>Error al cargar la cartilla médica</div>

  return (
    <MedicalRecordForm
      record={record}
      onSubmit={handleSubmit}
      isPending={isPending}
      title="Editar Cartilla Médica"
      submitText="Actualizar"
    />
  )
}

export default EditMedicalRecordPage
