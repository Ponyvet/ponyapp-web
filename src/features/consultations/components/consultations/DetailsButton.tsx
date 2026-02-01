import { Button } from '@/shared/components/ui/button'
import { Eye } from 'lucide-react'
import { useNavigate } from 'react-router'
import type { Consultation } from '../../models/Consultation'

interface DetailsButtonProps {
  consultation: Consultation
}

const DetailsButton = ({ consultation }: DetailsButtonProps) => {
  const navigate = useNavigate()
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        navigate(`/consultations/${consultation.id}`)
      }}
    >
      <Eye />
    </Button>
  )
}

export default DetailsButton
