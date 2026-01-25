import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'
import { useNavigate } from 'react-router'
import type { Pet } from '../../models/Pet'

interface DetailsButtonProps {
  pet: Pet
}

const DetailsButton = ({ pet }: DetailsButtonProps) => {
  const navigate = useNavigate()
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={() => {
        navigate(`/clients/${pet.clientId}/pets/${pet.id}`)
      }}
    >
      <Eye />
    </Button>
  )
}

export default DetailsButton
