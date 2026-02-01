import useGetMedicalRecords from '../queries/useGetMedicalRecords'

const useMedicalRecords = () => {
  const { data } = useGetMedicalRecords()
  const medicalRecords = data?.data ?? []

  const getMedicalRecordName = (recordId: string): string => {
    const record = medicalRecords.find((r) => r.id === recordId)
    return record?.name ?? ''
  }

  const selectMedicalRecordById = (recordId: string) => {
    return medicalRecords.find((r) => r.id === recordId)
  }

  const getMedicalRecordOptions = () => {
    return medicalRecords.map((record) => ({
      value: record.id,
      label: record.name,
    }))
  }

  return {
    medicalRecords,
    getMedicalRecordName,
    selectMedicalRecordById,
    getMedicalRecordOptions,
  }
}

export default useMedicalRecords
