import useGetAllPets from '../queries/useGetAllPets'
import PetsTable from '../components/pets/PetsTable'

const PetsPage = () => {
  const {
    data: petsData,
    isLoading,
    isSuccess,
  } = useGetAllPets({
    params: {
      page: 1,
      limit: 100,
      sortBy: 'name',
      sortOrder: 'asc',
    },
  })

  if (isLoading) {
    return <div>Cargando...</div>
  }

  if (!isSuccess) {
    return <div>Error al cargar las cartillas</div>
  }

  return <PetsTable pets={petsData.data} />
}

export default PetsPage
