import { useForm, type SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { createClientSchema, type CreateClient } from '../models/CreateClient'
import ControlledInput from '@/shared/components/ControlledInput'
import ControlledTextarea from '@/shared/components/ControlledTextarea'
import type { Client } from '../models/Client'

const defaultValues: CreateClient = {
  name: '',
  phone: '',
  address: '',
  notes: '',
}

interface Props {
  client?: Client
  onSubmit: (data: CreateClient) => void
  isPending: boolean
  title: string
  submitText: string
}

const ClientForm = ({
  client,
  onSubmit,
  isPending,
  title,
  submitText,
}: Props) => {
  const navigate = useNavigate()
  const { handleSubmit, control } = useForm({
    defaultValues: client
      ? {
          name: client.name,
          address: client.address,
          phone: client.phone,
          notes: client.notes ?? '',
        }
      : defaultValues,
    resolver: zodResolver(createClientSchema),
  })

  const handleOnSubmit: SubmitHandler<CreateClient> = (data) => {
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <h1 className="text-xl font-bold mb-4">{title}</h1>
      <FieldGroup className="gap-2">
        <ControlledInput
          control={control}
          name="name"
          label="Nombre completo"
          placeholder="Ej. Juan Pérez"
        />
        <ControlledInput
          control={control}
          name="address"
          label="Dirección"
          placeholder="Ej. Calle Durango 123"
        />
        <ControlledInput
          control={control}
          name="phone"
          label="Teléfono"
          placeholder="123-456-7890"
          maxLength={10}
        />
        <ControlledTextarea
          control={control}
          name="notes"
          label="Notas"
          placeholder="Agrega cualquier comentario adicional"
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

export default ClientForm
