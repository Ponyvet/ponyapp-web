import { Button } from '@/shared/components/ui/button'
import { Eye } from 'lucide-react'
import { useNavigate } from 'react-router'
import type { Visit } from '../../models/Visit'

interface DetailsButtonProps {
  visit: Visit
}

const DetailsButton = ({ visit }: DetailsButtonProps) => {
  const navigate = useNavigate()
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        navigate(`/visits/${visit.id}`)
      }}
    >
      <Eye />
    </Button>
  )
}

export default DetailsButton
