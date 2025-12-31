import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import useGetClients from '../queries/useGetClients'

import { columns } from '@/features/components/clients/Columns'
import { DataTable } from '@/features/components/clients/DataTable'
import { Button } from '@/components/ui/button'
import { PlusIcon, Search } from 'lucide-react'
import { useMemo, useState } from 'react'

const ClientPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const { data: clients, isSuccess } = useGetClients()
  const filteredClients = useMemo(() => {
    if (!isSuccess) return []
    return clients.filter((client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [clients, isSuccess, searchTerm])

  return (
    <div>
      <div className="flex items-center justify-end gap-4 pb-4">
        <InputGroup className="max-w-xs">
          <InputGroupInput
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          {/* <InputGroupAddon align="inline-end">12 results</InputGroupAddon> */}
        </InputGroup>
        <Button variant="outline" size="sm">
          <PlusIcon />
          Agregar Cliente
        </Button>
      </div>
      {isSuccess && <DataTable columns={columns} data={filteredClients} />}
    </div>
  )
}

export default ClientPage
