import { useNavigate, useParams } from 'react-router'
import useGetSingleClient from '../queries/useGetSingleClient'
import useGetPets from '@/features/pets/queries/useGetPets'
import { DataTable } from '@/features/pets/components/pets/DataTable'
import { columns } from '@/features/pets/components/pets/Columns'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'

const ClientDetailsPage = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { data: client, isSuccess } = useGetSingleClient(params.id)
  const { data: pets = [] } = useGetPets(params.id)

  if (!isSuccess) {
    return null
  }

  return (
    <div>
      <h1 className="mb-4 flex items-center gap-4 text-2xl font-bold">
        Detalles del Cliente
      </h1>
      <Card>
        <CardContent className="space-y-2">
          <p>
            <span className="font-semibold">Name:</span> {client.name}
          </p>
          <p>
            <span className="font-semibold">Dirección:</span> {client.address}
          </p>
          <p>
            <span className="font-semibold">Teléfono:</span> {client.phone}
          </p>
          <p>
            <span className="font-semibold">Notas:</span> {client.notes}
          </p>
        </CardContent>
      </Card>

      <div className="my-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Mascotas</h2>
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
      </div>
      <DataTable columns={columns} data={pets} />
    </div>
  )
}

export default ClientDetailsPage
