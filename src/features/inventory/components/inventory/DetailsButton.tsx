import { Button } from '@/shared/components/ui/button'
import { Eye } from 'lucide-react'
import { useNavigate } from 'react-router'
import type { InventoryItem } from '../../models/InventoryItem'

interface DetailsButtonProps {
  item: InventoryItem
}

const DetailsButton = ({ item }: DetailsButtonProps) => {
  const navigate = useNavigate()
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        navigate(`/inventory/${item.id}`)
      }}
    >
      <Eye />
    </Button>
  )
}

export default DetailsButton
