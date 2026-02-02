import { DogIcon, PlusIcon } from 'lucide-react'
import { useNavigate } from 'react-router'

import { columns } from '@/features/clients/components/clients/Columns'
import { DataTable, type DataTableMobileConfig } from '@/shared/components/DataTable'
import { Button } from '@/shared/components/ui/button'
import EmptyTable from '@/shared/components/EmptyTable'
import EditButton from '../components/clients/EditButton'
import DeleteButton from '../components/clients/DeleteButton'

import useGetClients from '../queries/useGetClients'
import type { Client } from '../models/Client'

const ClientPage = () => {
  const navigate = useNavigate()
  const { data: clients = [], isLoading } = useGetClients()

  const mobileConfig: DataTableMobileConfig<Client> = {
    fields: [
      {
        key: 'name',
        label: 'Nombre',
        isTitle: true,
      },
      {
        key: 'phone',
        label: 'Teléfono',
      },
      {
        key: 'address',
        label: 'Dirección',
      },
    ],
    onItemClick: (client) => navigate(`/clients/${client.id}`),
    renderActions: (client) => (
      <div className="flex">
        <EditButton client={client} />
        <DeleteButton client={client} />
      </div>
    ),
    getItemId: (client) => client.id,
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Clientes</h2>
        <Button
          variant="default"
          size="sm"
          onClick={() => navigate('/clients/add')}
        >
          <PlusIcon />
          Agregar
        </Button>
      </div>
      {clients.length === 0 && !isLoading ? (
        <EmptyTable
          icon={<DogIcon />}
          title="No hay clientes aún"
          description="Agrega tu primer cliente para comenzar a gestionar sus cartillas."
          buttonText={
            <>
              <PlusIcon className="mr-2" />
              Agregar primer cliente
            </>
          }
          onclick={() => navigate('/clients/add')}
        />
      ) : (
        <DataTable columns={columns} data={clients} isLoading={isLoading} mobileConfig={mobileConfig} />
      )}
    </div>
  )
}

export default ClientPage
