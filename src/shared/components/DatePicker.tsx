import { useState, type ComponentProps } from 'react'

import { Button } from '@/shared/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover'
import { ChevronDownIcon } from 'lucide-react'
import { Calendar } from '@/shared/components/ui/calendar'
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/shared/components/ui/field'

interface DatePickerProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  fieldDescription?: string
  minDate?: Date
  maxDate?: Date
}

const DatePicker = <T extends FieldValues>({
  control,
  name,
  label,
  fieldDescription,
  ...props
}: DatePickerProps<T> &
  Omit<ComponentProps<typeof Calendar>, 'selected' | 'onSelect' | 'mode'>) => {
  const [open, setOpen] = useState(false)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild aria-invalid={fieldState.invalid}>
              <Button
                variant="outline"
                id="date"
                className="w-48 justify-between font-normal"
              >
                {field.value
                  ? new Date(field.value).toLocaleDateString()
                  : 'Seleccionar fecha'}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                {...props}
                mode="single"
                selected={field.value}
                onSelect={(date) => {
                  field.onChange(date)
                  setOpen(false)
                }}
                captionLayout="dropdown"
              />
            </PopoverContent>
          </Popover>
          {fieldDescription && (
            <FieldDescription>{fieldDescription}</FieldDescription>
          )}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}

export default DatePicker
