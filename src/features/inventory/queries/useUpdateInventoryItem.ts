import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

import { updateInventoryItem } from '../api/inventory'
import type { CreateInventoryItem } from '../models/CreateInventoryItem'
import type { InventoryItem } from '../models/InventoryItem'

const useUpdateInventoryItem = (id: InventoryItem['id']) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: Partial<CreateInventoryItem>) =>
      updateInventoryItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] })
      navigate('/inventory')
    },
  })
}

export default useUpdateInventoryItem
