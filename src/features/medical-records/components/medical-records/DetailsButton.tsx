import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'
import { useNavigate } from 'react-router'
import type { MedicalRecord } from '../../models/MedicalRecord'

interface DetailsButtonProps {
  record: MedicalRecord
}

const DetailsButton = ({ record }: DetailsButtonProps) => {
  const navigate = useNavigate()
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={() => {
        navigate(`/medical-records/${record.id}`)
      }}
    >
      <Eye />
    </Button>
  )
}

export default DetailsButton
