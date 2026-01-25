import { PlusIcon } from 'lucide-react'

import { columns } from '../components/vaccines/Columns'
import { DataTable } from '@/shared/components/DataTable'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router'
import useGetVaccines from '../queries/useGetVaccines'
import { Card, CardAction, CardContent, CardHeader } from '@/components/ui/card'
import EmptyTable from '@/shared/components/EmptyTable'

const VaccinesPage = () => {
  const navigate = useNavigate()
  const { data: vaccines = [] } = useGetVaccines()

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <h2 className="text-2xl font-bold">Vacunas</h2>
        <CardAction>
          <Button size="sm" onClick={() => navigate('/vaccines/add')}>
            <PlusIcon />
            Agregar Vacuna
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {vaccines.length > 0 ? (
          <DataTable columns={columns} data={vaccines} />
        ) : (
          <EmptyTable
            icon={<PlusIcon />}
            title="No hay vacunas aún"
            description="Agrega tu primera vacuna para comenzar a gestionar las aplicaciones."
            buttonText={
              <>
                <PlusIcon className="mr-2" />
                Agregar primera vacuna
              </>
            }
            onclick={() => navigate('/vaccines/add')}
          />
        )}
      </CardContent>
    </Card>
  )
}

export default VaccinesPage
