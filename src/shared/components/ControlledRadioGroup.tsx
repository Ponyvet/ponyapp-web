import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form'

import {
  FieldSet,
  FieldLegend,
  FieldDescription,
  FieldLabel,
  Field,
  FieldContent,
  FieldTitle,
  FieldError,
} from './ui/field'
import type { Option } from '../utils/types'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'

type RadioGroupOption = Option & { description: string }

interface ControlledRadioGroupProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  options: RadioGroupOption[]
  label: string
  fieldDescription?: string
}

const ControlledRadioGroup = <T extends FieldValues>({
  control,
  name,
  options,
  label,
  fieldDescription,
}: ControlledRadioGroupProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const isInvalid = fieldState.invalid
        return (
          <FieldSet data-invalid={isInvalid} id={name}>
            <FieldLegend variant="label">{label}</FieldLegend>
            <FieldDescription>{fieldDescription}</FieldDescription>
            <RadioGroup
              id={name}
              name={field.name}
              value={field.value}
              onValueChange={field.onChange}
              aria-invalid={isInvalid}
            >
              {options.map((option) => (
                <FieldLabel
                  htmlFor={`${name}-${option.value}`}
                  key={option.value}
                >
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>{option.label}</FieldTitle>
                      <FieldDescription>{option.description}</FieldDescription>
                    </FieldContent>
                    <RadioGroupItem
                      value={option.value}
                      id={`${name}-${option.value}`}
                    />
                  </Field>
                </FieldLabel>
              ))}
            </RadioGroup>
            {isInvalid && <FieldError errors={[fieldState.error]} />}
          </FieldSet>
        )
      }}
    />
  )
}

export default ControlledRadioGroup
