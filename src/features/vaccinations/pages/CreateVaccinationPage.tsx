import { useLocation, useNavigate } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  createVaccinationSchema,
  type CreateVaccination,
} from '../models/CreateVaccination'
import { VaccinationStatus } from '../utils/enum'
import { createVaccination } from '../api/vaccinations'
import useGetPets from '@/features/pets/queries/useGetPets'
import useClients from '@/features/clients/hooks/useClients'
import useVaccines from '@/features/vaccines/hooks/useVaccines'
import DatePicker from '@/shared/components/DatePicker'
import ControlledSelect from '@/shared/components/ControlledSelect'
import useUsers from '@/features/users/hooks/useUsers'
import { VACCINATION_STATUS_CATALOG } from '../utils/catalogs'
import useProfile from '@/features/auth/queries/useProfile'

const defaultValues: CreateVaccination = {
  appliedAt: new Date(),
  nextDueDate: null,
  status: VaccinationStatus.APPLIED,
  petId: '',
  vaccineId: '',
  veterinarianId: '',
}

const CreateVaccinationPage = () => {
  const { state } = useLocation()
  const [clientId, setClientId] = useState<string>(state?.clientId ?? '')
  const navigate = useNavigate()
  const petId = state?.petId as string | undefined
  const { data: pets = [] } = useGetPets(clientId)
  const { clients } = useClients()
  const { getUsersAsOptions, users } = useUsers()
  const { getVaccineOptions } = useVaccines()
  const { data: session } = useProfile()
  const { mutate, isPending } = useMutation({
    mutationFn: createVaccination,
    onSuccess: () => {
      navigate(-1)
      toast.success('Esquema de vacunación creado con éxito')
    },
    onError: (error) => {
      toast.error('Error al crear el esquema de vacunación', {
        description: error instanceof Error ? error.message : undefined,
      })
    },
  })
  const { handleSubmit, control, setValue } = useForm({
    defaultValues,
    resolver: zodResolver(createVaccinationSchema),
  })

  useEffect(() => {
    if (petId && pets.length > 0 && clientId) {
      setValue('petId', petId)
    }
  }, [petId, setValue, pets, clientId])

  useEffect(() => {
    if (users.length > 0 && session?.id) {
      setValue('veterinarianId', session.id)
    }
  }, [session?.id, setValue, users])

  const handleOnSubmit: SubmitHandler<CreateVaccination> = (data) => {
    mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Crear Esquema de Vacunación</FieldLegend>
          <FieldGroup className="gap-3">
            <Field>
              <FieldLabel htmlFor="clientId">Cliente</FieldLabel>
              <Select
                name="clientId"
                value={clientId}
                onValueChange={setClientId}
              >
                <SelectTrigger id="clientId">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {`${client.name} (${client.address})`}
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
              name="petId"
              label="Mascota"
              options={pets.map((pet) => ({
                value: pet.id,
                label: `${pet.name} (${pet.species})`,
              }))}
              fieldDescription="Selecciona la mascota a vacunar"
            />
            <DatePicker
              control={control}
              name="appliedAt"
              label="Fecha de aplicación"
            />
            <ControlledSelect
              control={control}
              name="vaccineId"
              options={getVaccineOptions()}
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
              name="status"
              options={VACCINATION_STATUS_CATALOG}
              label="Estado"
              fieldDescription="Selecciona el estado de la vacunación"
            />
            <ControlledSelect
              control={control}
              name="veterinarianId"
              options={getUsersAsOptions()}
              label="Veterinario"
              fieldDescription="Selecciona el veterinario que aplicó la vacuna"
            />
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

export default CreateVaccinationPage
