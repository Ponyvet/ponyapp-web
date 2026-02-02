import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

import { createInventoryItem } from '../api/inventory'
import type { CreateInventoryItem } from '../models/CreateInventoryItem'

const useCreateInventoryItem = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: CreateInventoryItem) => createInventoryItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] })
      navigate('/inventory')
    },
  })
}

export default useCreateInventoryItem
