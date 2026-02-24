import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/shared/components/ui/field'
import { Input } from '@/shared/components/ui/input'
import type { ComponentProps } from 'react'
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form'

interface ControlledInputProps<T extends FieldValues> extends ComponentProps<
  typeof Input
> {
  control: Control<T>
  name: Path<T>
  label?: string
  fieldDescription?: string
  placeholder?: string
  required?: boolean
}
const ControlledInput = <T extends FieldValues>({
  control,
  name,
  label,
  fieldDescription,
  placeholder,
  required,
  ...props
}: ControlledInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && (
            <FieldLabel htmlFor={field.name}>
              {label}
              {required && <span className="text-destructive ml-0.5">*</span>}
            </FieldLabel>
          )}
          <Input
            {...props}
            aria-invalid={fieldState.invalid}
            id={field.name}
            placeholder={placeholder}
            name={field.name}
            value={field.value || ''}
            onChange={field.onChange}
          />
          {fieldDescription && !fieldState.invalid && (
            <FieldDescription>{fieldDescription}</FieldDescription>
          )}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}

export default ControlledInput
