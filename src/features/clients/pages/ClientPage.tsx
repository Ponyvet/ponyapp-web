import useGetClients from '../queries/useGetClients'

import { columns } from '@/features/clients/components/clients/Columns'
import { DataTable } from '@/shared/components/DataTable'
import { Button } from '@/components/ui/button'
import { DogIcon, Loader, PlusIcon } from 'lucide-react'
import { useNavigate } from 'react-router'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import EmptyTable from '@/shared/components/EmptyTable'

const ClientPage = () => {
  const navigate = useNavigate()
  const { data: clients = [], isPending } = useGetClients()

  if (isPending) {
    return <Loader />
  }

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>
          <h2 className="text-xl font-bold">Lista de clientes</h2>
        </CardTitle>
        <CardAction>
          <Button
            variant="default"
            size="sm"
            onClick={() => navigate('/clients/add')}
          >
            <PlusIcon />
            Agregar Cliente
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {clients.length > 0 ? (
          <DataTable columns={columns} data={clients} filterBy="name" />
        ) : (
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
        )}
      </CardContent>
    </Card>
  )
}

export default ClientPage
