import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'
import { useNavigate } from 'react-router'
import type { Pet } from '../../models/Pet'
import type { ComponentProps } from 'react'

interface DetailsButtonProps extends ComponentProps<typeof Button> {
  pet: Pet
  petsPage: boolean
}

const DetailsButton = ({ pet, petsPage, ...props }: DetailsButtonProps) => {
  const navigate = useNavigate()
  return (
    <Button
      {...props}
      variant="ghost"
      size="icon-sm"
      onClick={() => {
        if (petsPage) {
          navigate(`/pets/${pet.id}`)
        } else {
          navigate(`/clients/${pet.clientId}/pets/${pet.id}`)
        }
      }}
    >
      <Eye />
    </Button>
  )
}

export default DetailsButton
