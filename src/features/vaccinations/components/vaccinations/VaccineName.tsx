import useMedications from '@/features/medications/hooks/useMedications'

interface VaccineNameProps {
  vaccineId: string
}

const VaccineName = ({ vaccineId }: VaccineNameProps) => {
  const { getMedicationName } = useMedications()
  return <div>{getMedicationName(vaccineId)}</div>
}

export default VaccineName
