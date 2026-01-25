import { Button } from '@/components/ui/button'
import { PencilIcon } from 'lucide-react'
import { useNavigate } from 'react-router'
import type { Client } from '../../models/Client'

interface Props {
  client: Client
}

const EditButton = ({ client }: Props) => {
  const navigate = useNavigate()

  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={() => navigate(`/clients/${client.id}/edit`)}
    >
      <PencilIcon className="w-4 h-4" />
    </Button>
  )
}

export default EditButton
