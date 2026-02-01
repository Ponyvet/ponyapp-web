import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'
import { useNavigate } from 'react-router'
import type { Medication } from '../../models/Medication'

interface DetailsButtonProps {
  medication: Medication
}

const DetailsButton = ({ medication }: DetailsButtonProps) => {
  const navigate = useNavigate()
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        navigate(`/medications/${medication.id}`)
      }}
    >
      <Eye />
    </Button>
  )
}

export default DetailsButton
