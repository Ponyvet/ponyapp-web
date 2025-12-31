import { useNavigate } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  createVaccineSchema,
  type CreateVaccine,
} from '../models/CreateVaccine'
import { Species } from '@/features/pets/utils/enum'
import { createVaccine } from '../api/vaccines'

const defaultValues: CreateVaccine = {
  name: '',
  species: Species.DOG,
  intervalDays: 0,
  type: '',
}

const CreatePetPage = () => {
  const navigate = useNavigate()
  const { mutate, isPending } = useMutation({
    mutationFn: createVaccine,
    onSuccess: () => {
      navigate(-1)
      toast.success('Vacuna creada exitosamente')
    },
  })
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(createVaccineSchema),
  })
  console.log({ errors })

  const handleOnSubmit: SubmitHandler<CreateVaccine> = (data) => {
    mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Crear Vacuna</FieldLegend>
          <FieldGroup className="gap-3">
            <Controller
              name="species"
              control={control}
              render={({ field, fieldState }) => {
                const isInvalid = fieldState.invalid
                return (
                  <FieldSet data-invalid={isInvalid}>
                    <FieldLegend variant="label">Especie</FieldLegend>
                    <FieldDescription>
                      Selecciona la especie para la que es apta la vacuna
                    </FieldDescription>
                    <RadioGroup
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                      aria-invalid={isInvalid}
                    >
                      <FieldLabel htmlFor="species-dog">
                        <Field orientation="horizontal">
                          <FieldContent>
                            <FieldTitle>Perro</FieldTitle>
                            <FieldDescription>
                              Vacunas para perros y cachorros
                            </FieldDescription>
                          </FieldContent>
                          <RadioGroupItem
                            value={Species.DOG}
                            id="species-dog"
                          />
                        </Field>
                      </FieldLabel>
                      <FieldLabel htmlFor="species-cat">
                        <Field orientation="horizontal">
                          <FieldContent>
                            <FieldTitle>Gato</FieldTitle>
                            <FieldDescription>
                              Vacunas para gatos
                            </FieldDescription>
                          </FieldContent>
                          <RadioGroupItem
                            value={Species.CAT}
                            id="species-cat"
                          />
                        </Field>
                      </FieldLabel>
                    </RadioGroup>
                    {isInvalid && <FieldError errors={[fieldState.error]} />}
                  </FieldSet>
                )
              }}
            />
            <Field>
              <FieldLabel htmlFor="name">Nombre</FieldLabel>
              <Input id="name" placeholder="" {...register('name')} />
            </Field>
            <Field>
              <FieldLabel htmlFor="type">Tipo</FieldLabel>
              <Input
                id="type"
                placeholder="Vacuna antirrábica"
                {...register('type')}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="intervalDays">Intervalo (días)</FieldLabel>
              <Input
                id="intervalDays"
                type="number"
                placeholder="30"
                {...register('intervalDays')}
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

export default CreatePetPage
