import { useCallback } from 'react'
import type { MedicationsParams } from '../models/MedicationsParams'
import useGetMedications from '../queries/useGetMedications'

const useMedications = (category: MedicationsParams['category']) => {
  const { data } = useGetMedications({
    limit: 100,
    page: 1,
    category,
  })

  const getMedicationOptions = useCallback(() => {
    const medications = data?.data ?? []
    return medications.map((medication) => ({
      value: medication.id,
      label: medication.name,
    }))
  }, [data])

  return {
    getMedicationOptions,
  }
}

export default useMedications
