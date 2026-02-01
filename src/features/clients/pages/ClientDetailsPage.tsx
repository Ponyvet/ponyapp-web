import { useNavigate, useParams } from 'react-router'
import useGetSingleClient from '../queries/useGetSingleClient'
import useDeleteClient from '../queries/useDeleteClient'
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
  EditIcon,
  MapIcon,
  NotebookIcon,
  PhoneIcon,
  PlusIcon,
  TrashIcon,
  UserIcon,
} from 'lucide-react'
import ItemInfo from '@/shared/components/ItemInfo'
import { formatPhoneNumber } from '@/shared/utils/helpers'
import EmptyTable from '@/shared/components/EmptyTable'
import { DataTable } from '@/shared/components/DataTable'
import { useConfirm } from '@/hooks/use-confirm'
import { ConfirmDialog } from '@/shared/components/ConfirmDialog'
import useGetMedicalRecordsByClient from '@/features/medical-records/queries/useGetMedicalRecordsByClient'
import { columns } from '@/features/medical-records/components/medical-records/SimpleColumns'
import Map from '@/components/Map'
import { Separator } from '@/components/ui/separator'

const ClientDetailsPage = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { data: client, isSuccess } = useGetSingleClient(params.clientId)
  const { data: records = [] } = useGetMedicalRecordsByClient(params.clientId)
  const deleteClientMutation = useDeleteClient(() => navigate('/clients'))
  const { confirm, isOpen, options, handleConfirm, handleCancel } = useConfirm()

  const handleDeleteClient = async () => {
    if (!client) return

    const confirmed = await confirm({
      title: '¿Estás absolutamente seguro?',
      description: `¿Estás seguro de que deseas eliminar a ${client.name}? Esta acción no se puede deshacer.`,
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
    })

    if (confirmed) {
      deleteClientMutation.mutate(client.id)
    }
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
          {client.latitude && client.longitude && (
            <>
              <Separator className="my-4" />
              <h4 className="font-semibold mb-2">Ubicación</h4>
              <div className="h-64 rounded-lg overflow-hidden border">
                <Map
                  defaultCenter={{
                    lat: client.latitude,
                    lng: client.longitude,
                  }}
                  defaultZoom={15}
                  markerPosition={{
                    lat: client.latitude,
                    lng: client.longitude,
                  }}
                  showMarker={true}
                  className="h-full w-full"
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>
      <Separator />
      <Card>
        <CardHeader>
          <CardTitle>
            <h2 className="text-xl font-bold">Cartillas médicas</h2>
          </CardTitle>
          <CardAction>
            <Button
              size="sm"
              onClick={() =>
                navigate('/medical-records/add', {
                  state: { clientId: client.id },
                })
              }
            >
              <PlusIcon />
              Agregar Cartilla
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          {records.length > 0 ? (
            <DataTable columns={columns} data={records} filterBy="name" />
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
      <ConfirmDialog
        open={isOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title={options.title}
        description={options.description}
        confirmText={options.confirmText}
        cancelText={options.cancelText}
        isLoading={deleteClientMutation.isPending}
      />
    </div>
  )
}

export default ClientDetailsPage
