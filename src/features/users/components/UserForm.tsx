import { useForm, type SubmitHandler } from 'react-hook-form'
import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/shared/components/ui/button'
import { FieldGroup } from '@/shared/components/ui/field'
import {
  createUserSchema,
  updateUserSchema,
  type CreateUser,
  type UpdateUser,
} from '../models/CreateUser'
import type { User } from '../models/User'
import ControlledInput from '@/shared/components/ControlledInput'
import ControlledSelect from '@/shared/components/ControlledSelect'
import { userRoleOptions } from '../utils/catalogs'
import useClients from '@/features/clients/hooks/useClients'
import { generateOptions } from '@/shared/utils/helpers'
import { UserRoles } from '../utils/enum'

const defaultValues: CreateUser = {
  name: '',
  email: '',
  password: '',
  role: UserRoles.VETERINARIAN,
  clientId: null,
}

interface UserFormProps {
  onSubmit: (data: CreateUser | UpdateUser) => void
  isLoading: boolean
  onCancel: () => void
  user?: User
  submitButtonText?: string
  title?: string
}

const UserForm = ({
  onSubmit,
  isLoading,
  onCancel,
  user,
  submitButtonText = 'Guardar',
  title = 'Nuevo Usuario',
}: UserFormProps) => {
  const { clients } = useClients()
  const isEditing = !!user

  const { handleSubmit, control, reset, watch } = useForm<
    CreateUser | UpdateUser
  >({
    defaultValues,
    resolver: zodResolver(isEditing ? updateUserSchema : createUserSchema),
  })

  const selectedRole = watch('role')

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        password: '',
        role: user.role,
        clientId: user.clientId ?? null,
      })
    }
  }, [user, reset])

  const handleOnSubmit: SubmitHandler<CreateUser | UpdateUser> = (data) => {
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <h1 className="text-xl font-bold mb-4">{title}</h1>
      <FieldGroup>
        <ControlledInput
          control={control}
          name="name"
          label="Nombre"
          placeholder="Nombre del usuario"
        />
        <ControlledInput
          control={control}
          name="email"
          label="Correo electrónico"
          type="email"
          placeholder="correo@ejemplo.com"
        />
        <ControlledInput
          control={control}
          name="password"
          label={isEditing ? 'Nueva contraseña (opcional)' : 'Contraseña'}
          type="password"
          placeholder={
            isEditing ? 'Dejar vacío para mantener la actual' : 'Contraseña'
          }
        />
        <ControlledSelect
          control={control}
          name="role"
          label="Rol"
          options={userRoleOptions}
          fieldDescription="Selecciona el rol del usuario"
        />
        {selectedRole === UserRoles.CLIENT && (
          <ControlledSelect
            control={control}
            name="clientId"
            label="Cliente asociado"
            options={generateOptions(clients, 'name', 'id')}
            fieldDescription="Selecciona el cliente asociado a este usuario"
          />
        )}
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

export default UserForm
