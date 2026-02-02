import { useNavigate } from 'react-router'
import { PlusIcon, UsersIcon } from 'lucide-react'

import { Button } from '@/shared/components/ui/button'
import EmptyTable from '@/shared/components/EmptyTable'
import { DataTable } from '@/shared/components/DataTable'

import useGetUserList from '../queries/useGetUserList'
import columns from '../components/users/Columns'

const UsersPage = () => {
  const navigate = useNavigate()

  const { data: users = [], isLoading } = useGetUserList()

  const showEmptyState = !isLoading && users.length === 0

  if (showEmptyState) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Usuarios</h1>
        </div>
        <EmptyTable
          icon={<UsersIcon className="h-12 w-12" />}
          title="No hay usuarios registrados"
          description="Agrega tu primer usuario para comenzar."
          buttonText={
            <>
              <PlusIcon className="mr-2 h-4 w-4" />
              Agregar usuario
            </>
          }
          onclick={() => navigate('/users/add')}
        />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Usuarios</h1>
        <Button size="sm" onClick={() => navigate('/users/add')}>
          <PlusIcon />
          Agregar
        </Button>
      </div>
      <DataTable columns={columns} data={users} isLoading={isLoading} />
    </div>
  )
}

export default UsersPage
