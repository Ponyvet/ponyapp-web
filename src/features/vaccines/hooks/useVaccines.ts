import useGetVaccines from '../queries/useGetVaccines'

const useVaccines = () => {
  const { data: vaccines = [] } = useGetVaccines()

  const getVaccineName = (vaccineId: string): string => {
    const vaccine = vaccines.find((v) => v.id === vaccineId)
    return vaccine ? vaccine.name : ''
  }

  return {
    vaccines,
    getVaccineName,
  }
}

export default useVaccines
