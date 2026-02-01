import useGetMedications from '../queries/useGetMedications'

const useMedications = () => {
  const { data: medications = [] } = useGetMedications()

  const getMedicationName = (medicationId: string): string => {
    const medication = medications.find((m) => m.id === medicationId)
    return medication ? medication.name : ''
  }

  const getMedicationOptions = () => {
    return medications.map((medication) => ({
      value: medication.id,
      label: medication.name,
    }))
  }

  return {
    medications,
    getMedicationName,
    getMedicationOptions,
  }
}

export default useMedications
