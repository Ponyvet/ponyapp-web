import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { BookOpenIcon, PlusIcon } from 'lucide-react'

import useGetMedicalRecords from '../queries/useGetMedicalRecords'
import { columns } from '../components/medical-records/Columns'
import {
  ServerDataTable,
  type ServerSideState,
} from '@/shared/components/ServerDataTable'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import EmptyTable from '@/shared/components/EmptyTable'
import type { MedicalRecordParams } from '../models/MedicalRecordParams'
import { MEDICAL_RECORD_TYPE_CATALOG } from '../utils/catalogs'

const MedicalRecordsPage = () => {
  const navigate = useNavigate()
  const [params, setParams] = useState<MedicalRecordParams>({
    page: 1,
    limit: 10,
  })

  const { data, isPending, isSuccess } = useGetMedicalRecords(params)

  const handleStateChange = useCallback((state: ServerSideState) => {
    setParams({
      page: state.page,
      limit: state.limit,
      sortBy: state.sortBy,
      sortOrder: state.sortOrder,
      name: state.filters?.name as string | undefined,
      type: state.filters?.type as string | undefined,
    })
  }, [])

  const records = data?.data ?? []
  const pagination = data?.pagination ?? {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
  }

  const showEmptyState = isSuccess && records.length === 0 && params.page === 1

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>
          <h2 className="text-xl font-bold">Cartillas Médicas</h2>
        </CardTitle>
        <CardAction>
          <Button
            variant="default"
            size="sm"
            onClick={() => navigate('/medical-records/add')}
          >
            <PlusIcon />
            Agregar Cartilla
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {showEmptyState ? (
          <EmptyTable
            icon={<BookOpenIcon />}
            title="No hay cartillas médicas aún"
            description="Agrega tu primera cartilla médica para comenzar a gestionar el historial clínico."
            buttonText={
              <>
                <PlusIcon className="mr-2" />
                Agregar primera cartilla
              </>
            }
            onclick={() => navigate('/medical-records/add')}
          />
        ) : (
          <ServerDataTable
            columns={columns}
            data={records}
            pagination={pagination}
            isLoading={isPending}
            onStateChange={handleStateChange}
            filterConfig={{
              searchPlaceholder: 'Buscar por nombre...',
              searchBy: 'name',
              filters: [
                {
                  key: 'type',
                  label: 'Tipo',
                  type: 'select',
                  options: MEDICAL_RECORD_TYPE_CATALOG,
                },
              ],
            }}
          />
        )}
      </CardContent>
    </Card>
  )
}

export default MedicalRecordsPage
