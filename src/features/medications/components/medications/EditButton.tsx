import { Button } from '@/components/ui/button'
import { PencilIcon } from 'lucide-react'
import { useNavigate } from 'react-router'
import type { Medication } from '../../models/Medication'

interface Props {
  medication: Medication
}

const EditButton = ({ medication }: Props) => {
  const navigate = useNavigate()

  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={() => navigate(`/medications/${medication.id}/edit`)}
    >
      <PencilIcon className="w-4 h-4" />
    </Button>
  )
}

export default EditButton
