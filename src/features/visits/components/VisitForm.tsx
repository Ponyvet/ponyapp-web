import { useForm, type SubmitHandler } from 'react-hook-form'
import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/shared/components/ui/button'
import { FieldGroup } from '@/shared/components/ui/field'
import { createVisitSchema, type CreateVisit } from '../models/CreateVisit'
import type { Visit } from '../models/Visit'
import ControlledSelect from '@/shared/components/ControlledSelect'
import ControlledTextarea from '@/shared/components/ControlledTextarea'
import DatePicker from '@/shared/components/DatePicker'
import useClients from '@/features/clients/hooks/useClients'
import useUsers from '@/features/users/hooks/useUsers'
import { generateOptions } from '@/shared/utils/helpers'

const defaultValues: CreateVisit = {
  date: new Date(),
  generalNotes: '',
  veterinarianId: '',
  clientId: '',
}

interface VisitFormProps {
  onSubmit: (data: CreateVisit) => void
  isLoading: boolean
  onCancel: () => void
  visit?: Visit
  submitButtonText?: string
  title?: string
  initialClientId?: string
}

const VisitForm = ({
  onSubmit,
  isLoading,
  onCancel,
  visit,
  submitButtonText = 'Guardar',
  title = 'Nueva Visita',
  initialClientId,
}: VisitFormProps) => {
  const { clients } = useClients()
  const { users } = useUsers()

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      ...defaultValues,
      clientId: initialClientId ?? '',
    },
    resolver: zodResolver(createVisitSchema),
  })

  useEffect(() => {
    if (visit) {
      reset({
        date: visit.date,
        generalNotes: visit.generalNotes ?? '',
        veterinarianId: visit.veterinarian.id,
        clientId: visit.client.id,
      })
    }
  }, [visit, reset])

  const handleOnSubmit: SubmitHandler<CreateVisit> = (data) => {
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <h1 className="text-xl font-bold mb-4">{title}</h1>
      <FieldGroup>
        <DatePicker
          control={control}
          name="date"
          label="Fecha de la consulta"
          fieldDescription="Selecciona la fecha de la consulta"
        />
        <ControlledSelect
          control={control}
          name="clientId"
          label="Cliente"
          options={generateOptions(clients, 'name', 'id')}
          fieldDescription="Selecciona el cliente"
        />
        <ControlledSelect
          control={control}
          name="veterinarianId"
          label="Veterinario"
          options={generateOptions(users, 'name', 'id')}
          fieldDescription="Selecciona el veterinario que atenderá"
        />
        <ControlledTextarea
          control={control}
          name="generalNotes"
          label="Descripción / Notas"
          placeholder="Notas generales de la consulta"
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

export default VisitForm
