import { useNavigate } from 'react-router'

import InventoryItemForm from '../components/InventoryItemForm'
import useCreateInventoryItem from '../queries/useCreateInventoryItem'
import type { CreateInventoryItem } from '../models/CreateInventoryItem'

const CreateInventoryItemPage = () => {
  const navigate = useNavigate()

  const { mutate, isPending } = useCreateInventoryItem()

  const handleSubmit = (data: CreateInventoryItem) => {
    mutate(data)
  }

  return (
    <InventoryItemForm
      onSubmit={handleSubmit}
      isLoading={isPending}
      onCancel={() => navigate(-1)}
      title="Agregar Artículo"
    />
  )
}

export default CreateInventoryItemPage
