import useGetVaccines from '../queries/useGetVaccines'

const useVaccines = () => {
  const { data: vaccines = [] } = useGetVaccines()

  const getVaccineName = (vaccineId: string): string => {
    const vaccine = vaccines.find((v) => v.id === vaccineId)
    return vaccine ? vaccine.name : ''
  }

  const getVaccineOptions = () => {
    return vaccines.map((vaccine) => ({
      value: vaccine.id,
      label: vaccine.name,
    }))
  }

  return {
    vaccines,
    getVaccineName,
    getVaccineOptions,
  }
}

export default useVaccines
