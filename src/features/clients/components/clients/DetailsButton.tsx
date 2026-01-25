import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'
import { useNavigate } from 'react-router'
import type { Client } from '../../models/Client'

interface DetailsButtonProps {
  client: Client
}

const DetailsButton = ({ client }: DetailsButtonProps) => {
  const navigate = useNavigate()
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={() => {
        navigate(`/clients/${client.id}`)
      }}
    >
      <Eye />
    </Button>
  )
}

export default DetailsButton
