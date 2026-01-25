import { Button } from '@/components/ui/button'
import { PencilIcon } from 'lucide-react'
import { useNavigate } from 'react-router'
import type { Vaccine } from '../../models/Vaccine'

interface Props {
  vaccine: Vaccine
}

const EditButton = ({ vaccine }: Props) => {
  const navigate = useNavigate()

  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={() => navigate(`/vaccines/${vaccine.id}/edit`)}
    >
      <PencilIcon className="w-4 h-4" />
    </Button>
  )
}

export default EditButton
