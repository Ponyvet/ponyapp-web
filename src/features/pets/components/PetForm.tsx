import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { ChevronDownIcon } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'

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
import { createPetSchema, type CreatePet } from '../models/CreatePet'
import { Sex, Species } from '../utils/enum'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { Textarea } from '@/components/ui/textarea'
import type { Pet } from '../models/Pet'

const defaultValues: CreatePet = {
  name: '',
  recordId: '',
  sex: Sex.MALE,
  species: Species.DOG,
}

interface PetFormProps {
  onSubmit: (data: CreatePet) => void
  isLoading: boolean
  onCancel: () => void
  recordId: string
  pet?: Pet
  submitButtonText?: string
  title?: string
}

const PetForm = ({
  onSubmit,
  isLoading,
  onCancel,
  recordId,
  pet,
  submitButtonText = 'Guardar',
  title = 'Datos de la Mascota',
}: PetFormProps) => {
  const [open, setOpen] = useState(false)

  const { handleSubmit, register, control, setValue, reset } = useForm({
    defaultValues,
    resolver: zodResolver(createPetSchema),
  })

  // Set recordId when provided
  useEffect(() => {
    if (recordId) {
      setValue('recordId', recordId)
    }
  }, [recordId, setValue])

  // Populate form when editing existing pet
  useEffect(() => {
    if (pet) {
      reset({
        recordId: pet.recordId,
        sex: pet.sex,
        species: pet.species,
        breed: pet.breed || '',
        color: pet.color || '',
        birthDate: pet.birthDate ? new Date(pet.birthDate) : undefined,
        notes: pet.notes || '',
      })
    }
  }, [pet, reset])

  const handleOnSubmit: SubmitHandler<CreatePet> = (data) => {
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>{title}</FieldLegend>
          <FieldGroup className="gap-3">
            <Controller
              name="species"
              control={control}
              render={({ field, fieldState }) => {
                const isInvalid = fieldState.invalid
                return (
                  <FieldSet data-invalid={isInvalid}>
                    <FieldLegend variant="label">Tipo de mascota</FieldLegend>
                    <FieldDescription>
                      Selecciona la especie de la mascota
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
                              Perros y cachorros
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
                            <FieldDescription>Gatos y gatitos</FieldDescription>
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
              <Input id="name" placeholder="Puppy" {...register('name')} />
            </Field>
            <Field>
              <FieldLabel htmlFor="breed">Raza</FieldLabel>
              <Input
                id="breed"
                placeholder="Labrador Retriever"
                {...register('breed')}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="color">Color</FieldLabel>
              <Input id="color" placeholder="Negro" {...register('color')} />
            </Field>
            <Field>
              <FieldLabel htmlFor="sex">Sexo</FieldLabel>
              <Controller
                name="sex"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    id="sex"
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value={Sex.MALE} id="r2" />
                      <Label htmlFor="r2">Macho</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value={Sex.FEMALE} id="r3" />
                      <Label htmlFor="r3">Hembra</Label>
                    </div>
                  </RadioGroup>
                )}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="birthDate">Fecha de nacimiento</FieldLabel>
              <Controller
                name="birthDate"
                control={control}
                render={({ field }) => (
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date"
                        className="w-48 justify-between font-normal"
                      >
                        {field.value
                          ? new Date(field.value).toLocaleDateString()
                          : 'Select date'}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          field.onChange(date)
                          setOpen(false)
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
            </Field>
          </FieldGroup>
          <Field>
            <FieldLabel htmlFor="notes">Notas</FieldLabel>
            <Textarea
              id="notes"
              placeholder="Agrega cualquier comentario adicional"
              className="resize-none"
              {...register('notes')}
            />
          </Field>
        </FieldSet>
        <Field orientation="horizontal">
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
        </Field>
      </FieldGroup>
    </form>
  )
}

export default PetForm
