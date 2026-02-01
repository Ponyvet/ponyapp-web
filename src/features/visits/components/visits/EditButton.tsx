import { Button } from '@/shared/components/ui/button'
import { PencilIcon } from 'lucide-react'
import { useNavigate } from 'react-router'
import type { Visit } from '../../models/Visit'

interface EditButtonProps {
  visit: Visit
}

const EditButton = ({ visit }: EditButtonProps) => {
  const navigate = useNavigate()
  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={() => {
        navigate(`/visits/${visit.id}/edit`)
      }}
    >
      <PencilIcon className="w-4 h-4" />
    </Button>
  )
}

export default EditButton
