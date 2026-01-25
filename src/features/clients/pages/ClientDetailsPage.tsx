import { useNavigate, useParams } from 'react-router'
import useGetSingleClient from '../queries/useGetSingleClient'
import useDeleteClient from '../queries/useDeleteClient'
import useGetPets from '@/features/pets/queries/useGetPets'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  EditIcon,
  MapIcon,
  NotebookIcon,
  PhoneIcon,
  TrashIcon,
  UserIcon,
} from 'lucide-react'
import ItemInfo from '@/shared/components/ItemInfo'
import { Separator } from '@radix-ui/react-separator'
import { formatPhoneNumber } from '@/shared/utils/helpers'
import PetsTable from '@/features/pets/components/pets/PetsTable'

const ClientDetailsPage = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { data: client, isSuccess } = useGetSingleClient(params.clientId)
  const { data: pets = [] } = useGetPets(params.clientId)
  const deleteClientMutation = useDeleteClient(() => navigate('/clients'))

  const handleDeleteClient = () => {
    if (!client) return
    const confirmed = window.confirm(
      `¿Estás seguro de que deseas eliminar a ${client.name}? Esta acción no se puede deshacer.`,
    )
    if (!confirmed) return
    deleteClientMutation.mutate(client.id)
  }

  if (!isSuccess) {
    return null
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <h1 className="text-xl font-bold">Detalles del Cliente</h1>
          </CardTitle>
          <CardAction className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/clients/${client.id}/edit`)}
            >
              <EditIcon />
              Editar
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteClient}
              disabled={deleteClientMutation.isPending}
            >
              <TrashIcon />
              Eliminar
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <ItemInfo
              icon={<UserIcon />}
              title="Nombre Completo"
              description={client.name}
            />
            <ItemInfo
              icon={<MapIcon />}
              title="Dirección"
              description={client.address}
            />
            <ItemInfo
              icon={<PhoneIcon />}
              title="Teléfono"
              description={
                <a
                  href={`https://wa.me/${client.phone}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {formatPhoneNumber(client.phone)}
                </a>
              }
            />
          </div>
          {client.notes && (
            <>
              <Separator className="my-4" />
              <h4 className="font-semibold mb-2">Notas</h4>
              <ItemInfo icon={<NotebookIcon />} description={client.notes} />
            </>
          )}
        </CardContent>
      </Card>
      <Separator />
      <PetsTable clientId={client.id} pets={pets} />
    </div>
  )
}

export default ClientDetailsPage
