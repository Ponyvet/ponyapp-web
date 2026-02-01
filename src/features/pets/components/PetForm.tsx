import { useForm, type SubmitHandler } from 'react-hook-form'
import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/shared/components/ui/button'
import { FieldGroup } from '@/shared/components/ui/field'
import { createPetSchema, type CreatePet } from '../models/CreatePet'
import { Sex, Species } from '../utils/enum'
import type { Pet } from '../models/Pet'
import ControlledInput from '@/shared/components/ControlledInput'
import ControlledSelect from '@/shared/components/ControlledSelect'
import ControlledTextarea from '@/shared/components/ControlledTextarea'
import ControlledRadioGroup from '@/shared/components/ControlledRadioGroup'
import DatePicker from '@/shared/components/DatePicker'

const defaultValues: CreatePet = {
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
  const { handleSubmit, control, setValue, reset } = useForm({
    defaultValues,
    resolver: zodResolver(createPetSchema),
  })

  useEffect(() => {
    if (recordId) {
      setValue('recordId', recordId)
    }
  }, [recordId, setValue])

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
      <h1 className="text-xl font-bold mb-4">{title}</h1>
      <FieldGroup className="gap-3">
        <ControlledRadioGroup
          control={control}
          name="species"
          label="Tipo de mascota"
          options={[
            {
              label: 'Perro',
              value: Species.DOG,
              description: 'Perros y cachorros',
            },
            {
              label: 'Gato',
              value: Species.CAT,
              description: 'Gatos y gatitos',
            },
          ]}
        />
        <ControlledInput
          control={control}
          name="breed"
          placeholder="Labrador Retriever"
          label="Raza"
        />
        <ControlledInput
          control={control}
          name="color"
          placeholder="Negro"
          label="Color"
        />
        <ControlledSelect
          control={control}
          name="sex"
          label="Sexo"
          options={[
            { label: 'Macho', value: Sex.MALE },
            { label: 'Hembra', value: Sex.FEMALE },
          ]}
        />
        <DatePicker
          control={control}
          name="birthDate"
          label="Fecha de nacimiento"
        />
        <ControlledTextarea
          control={control}
          name="notes"
          label="Notas"
          placeholder="Agrega cualquier comentario adicional"
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

export default PetForm
