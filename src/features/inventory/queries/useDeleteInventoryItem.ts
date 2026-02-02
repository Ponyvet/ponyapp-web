import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteInventoryItem } from '../api/inventory'
import type { InventoryItem } from '../models/InventoryItem'

const useDeleteInventoryItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: InventoryItem['id']) => deleteInventoryItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] })
    },
  })
}

export default useDeleteInventoryItem
