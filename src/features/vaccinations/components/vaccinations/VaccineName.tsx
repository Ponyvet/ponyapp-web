import useVaccines from '@/features/vaccines/hooks/useVaccines'

interface VaccineNameProps {
  vaccineId: string
}

const VaccineName = ({ vaccineId }: VaccineNameProps) => {
  const { getVaccineName } = useVaccines()
  return <div>{getVaccineName(vaccineId)}</div>
}

export default VaccineName
