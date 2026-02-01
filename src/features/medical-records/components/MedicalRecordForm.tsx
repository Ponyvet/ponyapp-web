import { useForm, type SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import {
  createMedicalRecordSchema,
  type CreateMedicalRecord,
} from '../models/CreateMedicalRecord'
import ControlledInput from '@/shared/components/ControlledInput'
import ControlledTextarea from '@/shared/components/ControlledTextarea'
import ControlledSelect from '@/shared/components/ControlledSelect'
import useClients from '@/features/clients/hooks/useClients'
import type { MedicalRecord } from '../models/MedicalRecord'
import { MEDICAL_RECORD_TYPE_CATALOG } from '../utils/catalogs'
import { MedicalRecordTypes } from '../utils/enum'

const defaultValues: CreateMedicalRecord = {
  type: MedicalRecordTypes.PET,
  name: '',
  notes: '',
  clientId: '',
}

interface Props {
  record?: MedicalRecord
  onSubmit: (data: CreateMedicalRecord) => void
  isPending: boolean
  title: string
  submitText: string
  defaultClientId?: string
}

const MedicalRecordForm = ({
  record,
  onSubmit,
  isPending,
  title,
  submitText,
  defaultClientId,
}: Props) => {
  const navigate = useNavigate()
  const { clients } = useClients()

  const { handleSubmit, control } = useForm({
    defaultValues: record
      ? {
          type: record.type as MedicalRecordTypes,
          name: record.name,
          notes: record.notes ?? '',
          clientId: record.clientId,
        }
      : {
          ...defaultValues,
          clientId: defaultClientId ?? '',
        },
    resolver: zodResolver(createMedicalRecordSchema),
  })

  const handleOnSubmit: SubmitHandler<CreateMedicalRecord> = (data) => {
    onSubmit(data)
  }

  const clientOptions = clients.map((client) => ({
    value: client.id,
    label: `${client.name} (${client.address})`,
  }))

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <h1 className="text-xl font-bold mb-4">{title}</h1>
      <FieldGroup className="gap-2">
        <ControlledSelect
          control={control}
          name="type"
          label="Tipo de cartilla"
          options={MEDICAL_RECORD_TYPE_CATALOG}
          fieldDescription="Selecciona si es una mascota individual o un grupo de animales"
        />
        <ControlledInput
          control={control}
          name="name"
          label="Nombre"
          placeholder="Ej. Luna, Rebaño Norte"
        />
        <ControlledSelect
          control={control}
          name="clientId"
          label="Cliente"
          options={clientOptions}
          fieldDescription="Selecciona el cliente propietario"
        />
        <ControlledTextarea
          control={control}
          name="notes"
          label="Notas"
          placeholder="Agrega cualquier observación adicional"
        />
      </FieldGroup>
      <div className="mt-6 flex gap-2 items-start">
        <Button type="submit" disabled={isPending}>
          {submitText}
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => navigate(-1)}
          disabled={isPending}
        >
          Cancelar
        </Button>
      </div>
    </form>
  )
}

export default MedicalRecordForm
