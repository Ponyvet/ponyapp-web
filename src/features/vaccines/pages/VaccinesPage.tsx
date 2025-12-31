import { PlusIcon } from 'lucide-react'

import { columns } from '../components/vaccines/Columns'
import { DataTable } from '../components/vaccines/DataTable'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router'
import useGetVaccines from '../queries/useGetVaccines'

const VaccinesPage = () => {
  const navigate = useNavigate()
  const { data: vaccines = [] } = useGetVaccines()

  return (
    <div>
      <div className="flex items-center justify-end gap-4 pb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/vaccines/add')}
        >
          <PlusIcon />
          Agregar Vacuna
        </Button>
      </div>
      <DataTable columns={columns} data={vaccines} />
    </div>
  )
}

export default VaccinesPage
