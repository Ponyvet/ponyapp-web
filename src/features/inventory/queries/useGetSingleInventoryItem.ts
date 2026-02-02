import { useQuery } from '@tanstack/react-query'

import { getSingleInventoryItem } from '../api/inventory'
import type { InventoryItem } from '../models/InventoryItem'

const useGetSingleInventoryItem = (id: InventoryItem['id']) => {
  return useQuery({
    queryKey: ['inventory', id],
    queryFn: () => getSingleInventoryItem(id),
    enabled: !!id,
  })
}

export default useGetSingleInventoryItem
