import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import useGetSingleClient from '../queries/useGetSingleClient'
import useDeleteClient from '../queries/useDeleteClient'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import {
  CalendarDaysIcon,
  DogIcon,
  EditIcon,
  ExternalLinkIcon,
  MapIcon,
  MapPinIcon,
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
import { useConfirm } from '@/shared/hooks/use-confirm'
import { ConfirmDialog } from '@/shared/components/ConfirmDialog'
import useGetMedicalRecordsByClient from '@/features/medical-records/queries/useGetMedicalRecordsByClient'
import { columns } from '@/features/medical-records/components/medical-records/SimpleColumns'
import { columns as visitColumns } from '@/features/visits/components/visits/SimpleColumns'
import useGetVisitsByClient from '@/features/visits/queries/useGetVisitsByClient'
import Map from '@/shared/components/Map'
import { Separator } from '@/shared/components/ui/separator'
import EditAddressModal from '../components/EditAddressModal'
import useUpdateClient from '../queries/useUpdateClient'

const ClientDetailsPage = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { data: client, isSuccess } = useGetSingleClient(params.clientId)
  const { data: records = [] } = useGetMedicalRecordsByClient(params.clientId)
  const { data: visits = [] } = useGetVisitsByClient(params.clientId)
  const deleteClientMutation = useDeleteClient(() => navigate('/clients'))
  const [isEditAddressOpen, setIsEditAddressOpen] = useState(false)
  const updateAddressMutation = useUpdateClient(params.clientId!, () =>
    setIsEditAddressOpen(false),
  )
  const { confirm, isOpen, options, handleConfirm, handleCancel } = useConfirm()

  const handleSaveAddress = (data: {
    address: string
    latitude: number | null
    longitude: number | null
  }) => {
    if (!client) return
    updateAddressMutation.mutate({
      name: client.name,
      phone: client.phone,
      notes: client.notes ?? '',
      ...data,
    })
  }

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
          <Separator className="my-4" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
            <h4 className="font-semibold">Ubicación</h4>
            <div className="flex flex-col sm:flex-row gap-2">
              {client.latitude && client.longitude && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="w-full sm:w-auto"
                >
                  <a
                    href={`https://www.google.com/maps?q=${client.latitude},${client.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExternalLinkIcon className="w-4 h-4" />
                    <span className="ml-2">Abrir en Maps</span>
                  </a>
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditAddressOpen(true)}
                className="w-full sm:w-auto"
              >
                <MapPinIcon className="w-4 h-4" />
                <span className="ml-2">Editar dirección</span>
              </Button>
            </div>
          </div>
          {client.latitude && client.longitude ? (
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
                readOnly={true}
                className="h-full w-full"
              />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Sin ubicación registrada.
            </p>
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
                navigate('/medical-records/add', {
                  state: { clientId: client.id },
                })
              }
            />
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            <h2 className="text-xl font-bold">Consultas</h2>
          </CardTitle>
          <CardAction>
            <Button
              size="sm"
              onClick={() =>
                navigate('/visits/add', {
                  state: { clientId: client.id },
                })
              }
            >
              <PlusIcon />
              Agregar Consulta
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          {visits.length > 0 ? (
            <DataTable columns={visitColumns} data={visits} filterBy="date" />
          ) : (
            <EmptyTable
              icon={<CalendarDaysIcon />}
              title="No hay consultas registradas"
              description="Agrega una nueva consulta para este cliente."
              buttonText={
                <>
                  <PlusIcon className="mr-2" />
                  Agregar primera consulta
                </>
              }
              onclick={() =>
                navigate('/visits/add', { state: { clientId: client.id } })
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
      <EditAddressModal
        open={isEditAddressOpen}
        onClose={() => setIsEditAddressOpen(false)}
        onSave={handleSaveAddress}
        isSaving={updateAddressMutation.isPending}
        initialAddress={client.address}
        initialLatitude={client.latitude}
        initialLongitude={client.longitude}
      />
    </div>
  )
}

export default ClientDetailsPage
