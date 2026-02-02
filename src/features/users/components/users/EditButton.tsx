import { Button } from '@/shared/components/ui/button'
import { PencilIcon } from 'lucide-react'
import { useNavigate } from 'react-router'
import type { User } from '../../models/User'

interface EditButtonProps {
  user: User
}

const EditButton = ({ user }: EditButtonProps) => {
  const navigate = useNavigate()
  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={() => {
        navigate(`/users/${user.id}/edit`)
      }}
    >
      <PencilIcon className="w-4 h-4" />
    </Button>
  )
}

export default EditButton
