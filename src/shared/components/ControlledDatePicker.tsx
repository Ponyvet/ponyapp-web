import { useState } from 'react'
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form'
import { Field, FieldDescription, FieldError, FieldLabel } from './ui/field'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { ChevronDownIcon } from 'lucide-react'
import { Calendar } from './ui/calendar'

interface ControlledDatePickerProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label?: string
  fieldDescription?: string
}

const ControlledDatePicker = <T extends FieldValues>({
  control,
  name,
  label,
  fieldDescription,
}: ControlledDatePickerProps<T>) => {
  const [open, setOpen] = useState(false)
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
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
          {fieldDescription && !fieldState.invalid && (
            <FieldDescription>{fieldDescription}</FieldDescription>
          )}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}

export default ControlledDatePicker
