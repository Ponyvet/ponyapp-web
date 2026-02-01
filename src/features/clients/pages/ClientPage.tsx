import { DogIcon, PlusIcon } from 'lucide-react'
import { useNavigate } from 'react-router'

import { columns } from '@/features/clients/components/clients/Columns'
import { DataTable } from '@/shared/components/DataTable'
import { Button } from '@/shared/components/ui/button'
import EmptyTable from '@/shared/components/EmptyTable'

import useGetClients from '../queries/useGetClients'

const ClientPage = () => {
  const navigate = useNavigate()
  const { data: clients = [], isLoading } = useGetClients()

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
        <DataTable columns={columns} data={clients} isLoading={isLoading} />
      )}
    </div>
  )
}

export default ClientPage
