import { useState, useEffect, useRef } from 'react'
import { useMapsLibrary } from '@vis.gl/react-google-maps'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface PlaceAutocompleteProps {
  onPlaceSelect?: (place: google.maps.places.PlaceResult) => void
  placeholder?: string
  label?: string
  value?: string
  onChange?: (value: string) => void
  className?: string
  error?: string
}

const PlaceAutocomplete = ({
  onPlaceSelect,
  placeholder = 'Buscar dirección...',
  label,
  value = '',
  onChange,
  className,
  error,
}: PlaceAutocompleteProps) => {
  const [inputValue, setInputValue] = useState(value)
  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([])
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const places = useMapsLibrary('places')
  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null)
  const placesService = useRef<google.maps.places.PlacesService | null>(null)

  useEffect(() => {
    if (!places) return

    autocompleteService.current = new places.AutocompleteService()
    // Crear un div temporal para PlacesService
    const div = document.createElement('div')
    placesService.current = new places.PlacesService(div)
  }, [places])

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    onChange?.(newValue)

    if (!autocompleteService.current || !newValue.trim()) {
      setPredictions([])
      setIsOpen(false)
      return
    }

    autocompleteService.current.getPlacePredictions(
      {
        input: newValue,
        componentRestrictions: { country: 'mx' }, // Restringir a México
        types: ['address'],
      },
      (
        predictions: google.maps.places.AutocompletePrediction[] | null,
        status: google.maps.places.PlacesServiceStatus,
      ) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          predictions
        ) {
          setPredictions(predictions)
          setIsOpen(predictions.length > 0)
        } else {
          setPredictions([])
          setIsOpen(false)
        }
      },
    )
  }

  const handlePredictionClick = (
    prediction: google.maps.places.AutocompletePrediction,
  ) => {
    if (!placesService.current) return

    setInputValue(prediction.description)
    onChange?.(prediction.description)
    setIsOpen(false)

    // Obtener detalles del lugar
    placesService.current.getDetails(
      { placeId: prediction.place_id },
      (
        place: google.maps.places.PlaceResult | null,
        status: google.maps.places.PlacesServiceStatus,
      ) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place) {
          onPlaceSelect?.(place)
        }
      },
    )
  }

  const handleInputFocus = () => {
    if (predictions.length > 0) {
      setIsOpen(true)
    }
  }

  const handleInputBlur = () => {
    // Delay para permitir clicks en las predicciones
    setTimeout(() => setIsOpen(false), 150)
  }

  return (
    <div className="relative">
      {label && <Label className="mb-2 block">{label}</Label>}
      <Input
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder={placeholder}
        className={cn(error && 'border-red-500', className)}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

      {isOpen && predictions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
          {predictions.map((prediction) => (
            <button
              key={prediction.place_id}
              type="button"
              onClick={() => handlePredictionClick(prediction)}
              className="w-full px-4 py-2 text-left hover:bg-accent focus:bg-accent focus:outline-none border-none bg-transparent"
            >
              <div className="font-medium text-popover-foreground">
                {prediction.structured_formatting.main_text}
              </div>
              <div className="text-sm text-muted-foreground">
                {prediction.structured_formatting.secondary_text}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default PlaceAutocomplete
