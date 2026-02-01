import { Button } from '@/shared/components/ui/button'
import { PencilIcon } from 'lucide-react'
import { useNavigate } from 'react-router'
import type { Vaccination } from '../../models/Vaccination'

interface Props {
  vaccination: Vaccination
}

const EditButton = ({ vaccination }: Props) => {
  const navigate = useNavigate()

  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={() => navigate(`/vaccinations/${vaccination.id}/edit`)}
    >
      <PencilIcon className="w-4 h-4" />
    </Button>
  )
}

export default EditButton
