import { useNavigate, useParams } from 'react-router'
import useGetSingleClient from '../queries/useGetSingleClient'
import useGetPets from '@/features/pets/queries/useGetPets'
import { DataTable } from '@/shared/components/DataTable'
import { columns } from '@/features/pets/components/pets/Columns'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  DogIcon,
  MapIcon,
  NotebookIcon,
  PhoneIcon,
  PlusIcon,
  UserIcon,
} from 'lucide-react'
import ItemInfo from '@/shared/components/ItemInfo'
import { Separator } from '@radix-ui/react-separator'
import { formatPhoneNumber } from '@/shared/utils/helpers'
import EmptyTable from '@/shared/components/EmptyTable'

const ClientDetailsPage = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { data: client, isSuccess } = useGetSingleClient(params.id)
  const { data: pets = [] } = useGetPets(params.id)

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
      <Card>
        <CardHeader>
          <CardTitle>
            <h2 className="text-xl font-bold">Mascotas</h2>
          </CardTitle>
          <CardAction>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                navigate('/pets/add', { state: { clientId: client.id } })
              }
            >
              <PlusIcon />
              Agregar Cartilla
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          {pets.length > 0 ? (
            <DataTable columns={columns} data={pets} />
          ) : (
            <EmptyTable
              icon={<DogIcon />}
              title="No hay mascotas registradas"
              description="Agrega una nueva cartilla para este cliente."
              buttonText={
                <>
                  <PlusIcon className="mr-2" />
                  Agregar primera cartilla
                </>
              }
              onclick={() =>
                navigate('/pets/add', { state: { clientId: client.id } })
              }
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ClientDetailsPage
