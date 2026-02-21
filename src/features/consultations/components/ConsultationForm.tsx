import { useForm, type SubmitHandler } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/shared/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/shared/components/ui/field'
import {
  createConsultationSchema,
  type CreateConsultation,
} from '../models/CreateConsultation'
import type { Consultation } from '../models/Consultation'
import ControlledSelect from '@/shared/components/ControlledSelect'
import ControlledTextarea from '@/shared/components/ControlledTextarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import useClients from '@/features/clients/hooks/useClients'
import useGetMedicalRecordsByClient from '@/features/medical-records/queries/useGetMedicalRecordsByClient'
import { getLabelFromCatalog } from '@/shared/utils/helpers'
import { SPECIES_CATALOG } from '@/features/pets/utils/catalogs'
import useGetVisitsByClient from '@/features/visits/queries/useGetVisitsByClient'

const defaultValues: CreateConsultation = {
  reason: '',
  diagnosis: '',
  treatment: '',
  notes: '',
  recordId: '',
  visitId: '',
}

interface ConsultationFormProps {
  onSubmit: (data: CreateConsultation) => void
  isLoading: boolean
  onCancel: () => void
  consultation?: Consultation
  submitButtonText?: string
  title?: string
  initialClientId?: string
  medicalRecordId?: string
  initialVisitId?: string
}

const ConsultationForm = ({
  onSubmit,
  isLoading,
  onCancel,
  consultation,
  submitButtonText = 'Guardar',
  title = 'Nuevo Tratamiento',
  initialClientId,
  medicalRecordId,
  initialVisitId,
}: ConsultationFormProps) => {
  const [clientId, setClientId] = useState<string | undefined>(initialClientId)
  const { clients } = useClients()
  const { data: records = [] } = useGetMedicalRecordsByClient(clientId)
  const { data: visits = [] } = useGetVisitsByClient(clientId)
  const visitsOptions = visits.map((visit) => ({
    value: visit.id,
    label: `${visit.date.toLocaleDateString()} - ${visit.veterinarian.name}`,
  }))

  const { handleSubmit, control, setValue, reset } = useForm({
    defaultValues,
    resolver: zodResolver(createConsultationSchema),
  })

  useEffect(() => {
    if (
      initialVisitId &&
      visitsOptions.some((r) => r.value === initialVisitId)
    ) {
      setValue('visitId', initialVisitId)
    }
  }, [initialVisitId, setValue, visitsOptions])

  useEffect(() => {
    if (medicalRecordId && records.some((r) => r.id === medicalRecordId)) {
      setValue('recordId', medicalRecordId)
    }
  }, [medicalRecordId, setValue, records])

  useEffect(() => {
    if (consultation) {
      reset({
        reason: consultation.reason ?? '',
        diagnosis: consultation.diagnosis ?? '',
        treatment: consultation.treatment ?? '',
        notes: consultation.notes ?? '',
        recordId: consultation.record.id,
        visitId: consultation.visitId,
      })
    }
  }, [consultation, reset])

  const handleOnSubmit: SubmitHandler<CreateConsultation> = (data) => {
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <h1 className="text-xl font-bold mb-4">{title}</h1>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="clientId">Cliente</FieldLabel>
          <Select name="clientId" value={clientId} onValueChange={setClientId}>
            <SelectTrigger id="clientId">
              <SelectValue placeholder="Selecciona un cliente" />
            </SelectTrigger>
            <SelectContent>
              {clients.map((client) => (
                <SelectItem key={client.id} value={client.id}>
                  {client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldDescription>
            Selecciona el cliente propietario de la mascota
          </FieldDescription>
        </Field>
        <ControlledSelect
          control={control}
          name="visitId"
          label="Consulta"
          options={visitsOptions}
        />
        <ControlledSelect
          control={control}
          name="recordId"
          label="Cartilla"
          options={records.map((record) => ({
            value: record.id,
            label: record.pet
              ? `${getLabelFromCatalog(record.pet.species ?? '', SPECIES_CATALOG)} - ${record.name}`
              : record.name,
          }))}
          fieldDescription="Selecciona la cartilla de la mascota o grupo"
        />
        <ControlledTextarea
          control={control}
          name="reason"
          label="Motivo de tratamiento"
          placeholder="Describe el motivo del tratamiento..."
        />
        <ControlledTextarea
          control={control}
          name="diagnosis"
          label="Diagnóstico"
          placeholder="Ingresa el diagnóstico..."
        />
        <ControlledTextarea
          control={control}
          name="treatment"
          label="Tratamiento"
          placeholder="Describe el tratamiento indicado..."
        />
        <ControlledTextarea
          control={control}
          name="notes"
          label="Notas adicionales"
          placeholder="Notas adicionales..."
        />
      </FieldGroup>

      <div className="mt-6 flex gap-2 items-start">
        <Button type="submit" disabled={isLoading}>
          {submitButtonText}
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancelar
        </Button>
      </div>
    </form>
  )
}

export default ConsultationForm
