import { Button } from '@/components/ui/button'
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { createClientSchema, type CreateClient } from '../models/CreateClient'
import { useMutation } from '@tanstack/react-query'
import { createClient } from '../api/clients'
import { toast } from 'sonner'

const defaultValues: CreateClient = {
  name: '',
  phone: '',
  address: '',
  notes: '',
}

const CreateClientPage = () => {
  const navigate = useNavigate()
  const { mutate, isPending } = useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      navigate(-1)
      toast.success('Cliente creado exitosamente')
    },
  })
  const { handleSubmit, register } = useForm({
    defaultValues,
    resolver: zodResolver(createClientSchema),
  })

  const handleOnSubmit: SubmitHandler<CreateClient> = (data) => {
    mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Crear Cliente</FieldLegend>
          <FieldGroup className="gap-3">
            <Field>
              <FieldLabel htmlFor="name">Nombre</FieldLabel>
              <Input id="name" placeholder="Juan Perez" {...register('name')} />
            </Field>
            <Field>
              <FieldLabel htmlFor="address">Dirección</FieldLabel>
              <Input
                id="address"
                placeholder="Calle Verde 123"
                {...register('address')}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="phone">Teléfono</FieldLabel>
              <Input
                id="phone"
                placeholder="123-456-7890"
                {...register('phone')}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="notes">Notas</FieldLabel>
              <Textarea
                id="notes"
                placeholder="Agrega cualquier comentario adicional"
                className="resize-none"
                {...register('notes')}
              />
            </Field>
          </FieldGroup>
        </FieldSet>
        <Field orientation="horizontal">
          <Button type="submit" disabled={isPending}>
            Guardar
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={() => navigate(-1)}
            disabled={isPending}
          >
            Cancelar
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default CreateClientPage
