import useGetClients from '../queries/useGetClients'

import { columns } from '@/features/clients/components/clients/Columns'
import { DataTable } from '@/shared/components/DataTable'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { useNavigate } from 'react-router'

const ClientPage = () => {
  const navigate = useNavigate()
  const { data: clients, isSuccess } = useGetClients()

  return (
    <div>
      <div className="flex items-center justify-end gap-4 pb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/clients/add')}
        >
          <PlusIcon />
          Agregar Cliente
        </Button>
      </div>
      {isSuccess && (
        <DataTable columns={columns} data={clients} filterBy="name" />
      )}
    </div>
  )
}

export default ClientPage
