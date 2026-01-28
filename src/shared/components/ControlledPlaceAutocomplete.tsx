import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form'
import PlaceAutocomplete from '@/components/PlaceAutocomplete'

interface ControlledPlaceAutocompleteProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>
  name: TName
  label?: string
  placeholder?: string
  onPlaceSelect?: (place: google.maps.places.PlaceResult) => void
  className?: string
}

const ControlledPlaceAutocomplete = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  placeholder,
  onPlaceSelect,
  className,
}: ControlledPlaceAutocompleteProps<TFieldValues, TName>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <PlaceAutocomplete
          label={label}
          placeholder={placeholder}
          value={field.value || ''}
          onChange={field.onChange}
          onPlaceSelect={onPlaceSelect}
          error={fieldState.error?.message}
          className={className}
        />
      )}
    />
  )
}

export default ControlledPlaceAutocomplete
