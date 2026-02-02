import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getInventory } from '../api/inventory'
import type { InventoryParams } from '../models/InventoryParams'

const useGetInventory = (params?: InventoryParams) => {
  return useQuery({
    queryKey: ['inventory', params],
    queryFn: () => getInventory(params),
    placeholderData: keepPreviousData,
  })
}

export default useGetInventory
