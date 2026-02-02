import { useForm, type SubmitHandler } from 'react-hook-form'
import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/shared/components/ui/button'
import { FieldGroup } from '@/shared/components/ui/field'
import {
  createInventoryItemSchema,
  type CreateInventoryItem,
} from '../models/CreateInventoryItem'
import type { InventoryItem } from '../models/InventoryItem'
import ControlledInput from '@/shared/components/ControlledInput'
import ControlledSelect from '@/shared/components/ControlledSelect'
import DatePicker from '@/shared/components/DatePicker'
import { inventoryCategoryOptions } from '../utils/catalogs'

const defaultValues: CreateInventoryItem = {
  name: '',
  category: 'MEDICATION',
  unit: '',
  quantity: 0,
  expirationDate: null,
  medicationId: null,
}

interface InventoryItemFormProps {
  onSubmit: (data: CreateInventoryItem) => void
  isLoading: boolean
  onCancel: () => void
  item?: InventoryItem
  submitButtonText?: string
  title?: string
}

const InventoryItemForm = ({
  onSubmit,
  isLoading,
  onCancel,
  item,
  submitButtonText = 'Guardar',
  title = 'Nuevo Artículo',
}: InventoryItemFormProps) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues,
    resolver: zodResolver(createInventoryItemSchema),
  })

  useEffect(() => {
    if (item) {
      reset({
        name: item.name,
        category: item.category,
        unit: item.unit,
        quantity: item.quantity,
        expirationDate: item.expirationDate ?? null,
        medicationId: item.medicationId ?? null,
      })
    }
  }, [item, reset])

  const handleOnSubmit: SubmitHandler<CreateInventoryItem> = (data) => {
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
          placeholder="Nombre del artículo"
        />
        <ControlledSelect
          control={control}
          name="category"
          label="Categoría"
          options={inventoryCategoryOptions}
          fieldDescription="Selecciona la categoría del artículo"
        />
        <ControlledInput
          control={control}
          name="unit"
          label="Unidad"
          placeholder="pz, ml, caja, etc."
        />
        <ControlledInput
          control={control}
          name="quantity"
          label="Cantidad"
          type="number"
          placeholder="0"
        />
        <DatePicker
          control={control}
          name="expirationDate"
          label="Fecha de caducidad"
          fieldDescription="Opcional: fecha de caducidad del artículo"
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

export default InventoryItemForm
