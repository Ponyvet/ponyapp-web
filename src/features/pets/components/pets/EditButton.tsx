import { Button } from '@/components/ui/button'
import { PencilIcon } from 'lucide-react'
import { useNavigate } from 'react-router'
import type { Pet } from '../../models/Pet'

interface EditButtonProps {
  pet: Pet
}

const EditButton = ({ pet }: EditButtonProps) => {
  const navigate = useNavigate()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => navigate(`/pets/${pet.id}/edit`)}
    >
      <PencilIcon />
    </Button>
  )
}

export default EditButton
