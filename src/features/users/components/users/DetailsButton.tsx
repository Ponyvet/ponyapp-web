import { Button } from '@/shared/components/ui/button'
import { Eye } from 'lucide-react'
import { useNavigate } from 'react-router'
import type { User } from '../../models/User'

interface DetailsButtonProps {
  user: User
}

const DetailsButton = ({ user }: DetailsButtonProps) => {
  const navigate = useNavigate()
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        navigate(`/users/${user.id}`)
      }}
    >
      <Eye />
    </Button>
  )
}

export default DetailsButton
