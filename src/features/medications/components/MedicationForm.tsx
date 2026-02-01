import { useForm, type SubmitHandler } from 'react-hook-form'
import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createMedicationSchema, type CreateMedication } from '../models/CreateMedication'
import type { Medication } from '../models/Medication'
import { MEDICATION_CATEGORY_CATALOG, SPECIES_CATALOG } from '../utils/catalogs'

const defaultValues: CreateMedication = {
  name: '',
  category: 'VACCINE',
}

interface MedicationFormProps {
  onSubmit: (data: CreateMedication) => void
  isLoading: boolean
  onCancel: () => void
  medication?: Medication
  submitButtonText?: string
  title?: string
}

const MedicationForm = ({
  onSubmit,
  isLoading,
  onCancel,
  medication,
  submitButtonText = 'Guardar',
  title = 'Nuevo Medicamento',
}: MedicationFormProps) => {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(createMedicationSchema),
  })

  const categoryValue = watch('category')
  const speciesValue = watch('species')

  useEffect(() => {
    if (medication) {
      reset({
        name: medication.name,
        category: medication.category,
        species: medication.species || undefined,
        defaultIntervalDays: medication.defaultIntervalDays || undefined,
        notes: medication.notes || '',
      })
    }
  }, [medication, reset])

  const handleOnSubmit: SubmitHandler<CreateMedication> = (data) => {
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>{title}</FieldLegend>
          <FieldGroup className="gap-4">
            <Field>
              <FieldLabel htmlFor="name">Nombre</FieldLabel>
              <Input
                id="name"
                placeholder="Ej: Rabia, Parvovirus, Amoxicilina"
                {...register('name')}
              />
              {errors.name && (
                <FieldDescription className="text-destructive">
                  {errors.name.message}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="category">Categoría</FieldLabel>
              <Select
                value={categoryValue}
                onValueChange={(value) =>
                  setValue('category', value as CreateMedication['category'])
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {MEDICATION_CATEGORY_CATALOG.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <FieldDescription className="text-destructive">
                  {errors.category.message}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="species">Especie (opcional)</FieldLabel>
              <Select
                value={speciesValue || ''}
                onValueChange={(value) =>
                  setValue('species', value as CreateMedication['species'])
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todas las especies" />
                </SelectTrigger>
                <SelectContent>
                  {SPECIES_CATALOG.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel htmlFor="defaultIntervalDays">
                Intervalo de aplicación (días)
              </FieldLabel>
              <Input
                id="defaultIntervalDays"
                type="number"
                placeholder="Ej: 365"
                {...register('defaultIntervalDays')}
              />
              <FieldDescription>
                Días sugeridos entre aplicaciones (opcional)
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="notes">Notas</FieldLabel>
              <Textarea
                id="notes"
                placeholder="Observaciones adicionales"
                className="resize-none"
                {...register('notes')}
              />
            </Field>
          </FieldGroup>
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

export default MedicationForm
