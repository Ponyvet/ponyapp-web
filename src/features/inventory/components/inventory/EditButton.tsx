import { Button } from '@/shared/components/ui/button'
import { PencilIcon } from 'lucide-react'
import { useNavigate } from 'react-router'
import type { InventoryItem } from '../../models/InventoryItem'

interface EditButtonProps {
  item: InventoryItem
}

const EditButton = ({ item }: EditButtonProps) => {
  const navigate = useNavigate()
  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={() => {
        navigate(`/inventory/${item.id}/edit`)
      }}
    >
      <PencilIcon className="w-4 h-4" />
    </Button>
  )
}

export default EditButton
