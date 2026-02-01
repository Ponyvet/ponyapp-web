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
  createVaccinationSchema,
  type CreateVaccination,
} from '../models/CreateVaccination'
import type { Vaccination } from '../models/Vaccination'
import useMedications from '@/features/medications/hooks/useMedications'
import DatePicker from '@/shared/components/DatePicker'
import ControlledSelect from '@/shared/components/ControlledSelect'
import useUsers from '@/features/users/hooks/useUsers'
import useProfile from '@/features/auth/queries/useProfile'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import useClients from '@/features/clients/hooks/useClients'
import useGetMedicalRecordsByClient from '@/features/medical-records/queries/useGetMedicalRecordsByClient'
import { MedicalRecordTypes } from '@/features/medical-records/utils/enum'
import { getLabelFromCatalog } from '@/shared/utils/helpers'
import { SPECIES_CATALOG } from '@/features/pets/utils/catalogs'

const defaultValues: CreateVaccination = {
  appliedAt: null,
  nextDueDate: null,
  recordId: '',
  medicationId: '',
  veterinarianId: '',
}

interface VaccinationFormProps {
  onSubmit: (data: CreateVaccination) => void
  isLoading: boolean
  onCancel: () => void
  vaccination?: Vaccination
  submitButtonText?: string
  title?: string
  initialClientId?: string
  medicalRecordId?: string
}

const VaccinationForm = ({
  onSubmit,
  isLoading,
  onCancel,
  vaccination,
  submitButtonText = 'Guardar',
  title = 'Nueva Vacunación',
  initialClientId,
  medicalRecordId,
}: VaccinationFormProps) => {
  const [clientId, setClientId] = useState<string | undefined>(initialClientId)
  const { getUsersAsOptions, users } = useUsers()
  const { getMedicationOptions } = useMedications('VACCINE')
  const { clients } = useClients()
  const { data: session } = useProfile()
  const { data: records = [] } = useGetMedicalRecordsByClient(clientId)
  const petsRecords = records.filter(
    (record) => record.type === MedicalRecordTypes.PET,
  )

  const { handleSubmit, control, setValue, reset } = useForm({
    defaultValues,
    resolver: zodResolver(createVaccinationSchema),
  })

  useEffect(() => {
    if (clientId && medicalRecordId) {
      setValue('recordId', medicalRecordId)
    }
  }, [medicalRecordId, setValue, clientId])

  useEffect(() => {
    if (vaccination) {
      reset({
        appliedAt: vaccination.appliedAt,
        nextDueDate: vaccination.nextDueDate,
        medicationId: vaccination.medicationId,
        veterinarianId: vaccination.veterinarianId,
        recordId: vaccination.record.id,
      })
    }
  }, [vaccination, reset])

  useEffect(() => {
    if (users.length > 0 && session?.id && !vaccination) {
      setValue('veterinarianId', session.id)
    }
  }, [session?.id, setValue, users, vaccination])

  const handleOnSubmit: SubmitHandler<CreateVaccination> = (data) => {
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
          name="recordId"
          label="Cartilla de la mascota"
          options={petsRecords.map((record) => ({
            value: record.id,
            label: `${getLabelFromCatalog(record.pet?.species ?? '', SPECIES_CATALOG)} - ${record.name}`,
          }))}
          fieldDescription="Selecciona la cartilla de la mascota"
        />
        <DatePicker
          control={control}
          name="appliedAt"
          label="Fecha de aplicación"
        />
        <ControlledSelect
          control={control}
          name="medicationId"
          options={getMedicationOptions()}
          label="Vacuna"
          fieldDescription="Selecciona la vacuna aplicada"
        />
        <DatePicker
          control={control}
          name="nextDueDate"
          label="Fecha de próxima aplicación"
        />
        <ControlledSelect
          control={control}
          name="veterinarianId"
          options={getUsersAsOptions()}
          label="Veterinario"
          fieldDescription="Selecciona el veterinario que aplicó la vacuna"
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

export default VaccinationForm
