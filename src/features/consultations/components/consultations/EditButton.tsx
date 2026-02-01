import { Button } from '@/shared/components/ui/button'
import { PencilIcon } from 'lucide-react'
import { useNavigate } from 'react-router'
import type { Consultation } from '../../models/Consultation'

interface Props {
  consultation: Consultation
}

const EditButton = ({ consultation }: Props) => {
  const navigate = useNavigate()

  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={() => navigate(`/consultations/${consultation.id}/edit`)}
    >
      <PencilIcon className="w-4 h-4" />
    </Button>
  )
}

export default EditButton
