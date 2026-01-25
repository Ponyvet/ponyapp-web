import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { createClientSchema, type CreateClient } from '../models/CreateClient'
import { useMutation } from '@tanstack/react-query'
import { createClient } from '../api/clients'
import { toast } from 'sonner'
import ControlledInput from '@/shared/components/ControlledInput'
import ControlledTextarea from '@/shared/components/ControlledTextarea'

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
    onError: (error) => {
      toast.error('Error al crear el cliente', {
        description: (error as Error).message,
      })
    },
  })
  const { handleSubmit, control } = useForm({
    defaultValues,
    resolver: zodResolver(createClientSchema),
  })

  const handleOnSubmit: SubmitHandler<CreateClient> = (data) => {
    const phoneWithLada = `52${data.phone}`
    mutate({ ...data, phone: phoneWithLada })
  }

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <h1 className="text-xl font-bold mb-4">Agregar Nuevo Cliente</h1>
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
      </div>
    </form>
  )
}

export default CreateClientPage
