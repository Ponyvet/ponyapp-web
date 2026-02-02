import { useNavigate, useParams } from 'react-router'

import InventoryItemForm from '../components/InventoryItemForm'
import useGetSingleInventoryItem from '../queries/useGetSingleInventoryItem'
import useUpdateInventoryItem from '../queries/useUpdateInventoryItem'
import type { CreateInventoryItem } from '../models/CreateInventoryItem'

const EditInventoryItemPage = () => {
  const { itemId } = useParams()
  const navigate = useNavigate()
  const { data: item, isLoading: isLoadingItem } = useGetSingleInventoryItem(
    itemId!,
  )
  const { mutate, isPending } = useUpdateInventoryItem(itemId!)

  const handleSubmit = (data: CreateInventoryItem) => {
    if (!itemId) return
    mutate(data)
  }

  if (isLoadingItem || !item) return null

  return (
    <InventoryItemForm
      onSubmit={handleSubmit}
      isLoading={isPending}
      onCancel={() => navigate(-1)}
      item={item}
      title="Editar Artículo"
      submitButtonText="Actualizar"
    />
  )
}

export default EditInventoryItemPage
