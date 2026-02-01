import { Button } from '@/shared/components/ui/button'
import { Eye } from 'lucide-react'
import { useNavigate } from 'react-router'
import type { Vaccination } from '../../models/Vaccination'

interface DetailsButtonProps {
  vaccination: Vaccination
}

const DetailsButton = ({ vaccination }: DetailsButtonProps) => {
  const navigate = useNavigate()
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        navigate(`/vaccinations/${vaccination.id}`)
      }}
    >
      <Eye />
    </Button>
  )
}

export default DetailsButton
