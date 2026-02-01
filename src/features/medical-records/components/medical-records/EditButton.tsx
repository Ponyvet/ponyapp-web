import { Button } from '@/shared/components/ui/button'
import { PencilIcon } from 'lucide-react'
import { useNavigate } from 'react-router'
import type { MedicalRecord } from '../../models/MedicalRecord'

interface Props {
  record: MedicalRecord
}

const EditButton = ({ record }: Props) => {
  const navigate = useNavigate()

  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={() => navigate(`/medical-records/${record.id}/edit`)}
    >
      <PencilIcon className="w-4 h-4" />
    </Button>
  )
}

export default EditButton
