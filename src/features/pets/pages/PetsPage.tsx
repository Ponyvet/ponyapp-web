import { useState } from 'react'
import useGetAllPets from '../queries/useGetAllPets'
import PetsTable from '../components/pets/PetsTable'
import type { ServerSideState } from '@/shared/components/ServerDataTable'
import type { PetsParams } from '../models/PetsParams'

const PetsPage = () => {
  const [serverState, setServerState] = useState<ServerSideState>({
    page: 1,
    limit: 10,
    sortBy: 'name',
    sortOrder: 'asc',
  })

  const {
    data: petsData,
    isLoading,
    isSuccess,
  } = useGetAllPets({
    params: {
      page: serverState.page,
      limit: serverState.limit,
      sortBy: serverState.sortBy as PetsParams['sortBy'],
      sortOrder: serverState.sortOrder || 'asc',
      ...serverState.filters,
    },
  })

  if (isSuccess) {
    return (
      <PetsTable
        pets={petsData.data}
        pagination={petsData.pagination}
        isLoading={isLoading}
        onStateChange={setServerState}
      />
    )
  }

  return null
}

export default PetsPage
