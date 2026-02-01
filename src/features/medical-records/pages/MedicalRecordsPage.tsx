import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { BookOpenIcon, PlusIcon } from 'lucide-react'

import {
  ServerDataTable,
  type ServerSideState,
} from '@/shared/components/ServerDataTable'
import { Button } from '@/shared/components/ui/button'
import EmptyTable from '@/shared/components/EmptyTable'
import { DEFAULT_PAGE_SIZE, START_PAGE_INDEX } from '@/shared/utils/const'

import type { MedicalRecordParams } from '../models/MedicalRecordParams'
import { MEDICAL_RECORD_TYPE_CATALOG } from '../utils/catalogs'
import useGetMedicalRecords from '../queries/useGetMedicalRecords'
import { columns } from '../components/medical-records/Columns'

const defaultPagination = {
  page: START_PAGE_INDEX,
  limit: DEFAULT_PAGE_SIZE,
  total: 0,
  totalPages: 1,
  hasNext: false,
  hasPrev: false,
}

const MedicalRecordsPage = () => {
  const navigate = useNavigate()
  const [params, setParams] = useState<MedicalRecordParams>({
    page: START_PAGE_INDEX,
    limit: DEFAULT_PAGE_SIZE,
  })
  const { data, isPending, isSuccess } = useGetMedicalRecords(params)
  const records = data?.data ?? []
  const pagination = data?.pagination ?? defaultPagination
  const showEmptyState = isSuccess && records.length === 0 && params.page === 1

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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Cartillas Médicas</h2>
        <Button
          variant="default"
          size="sm"
          onClick={() => navigate('/medical-records/add')}
        >
          <PlusIcon />
          Agregar
        </Button>
      </div>
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
    </div>
  )
}

export default MedicalRecordsPage
