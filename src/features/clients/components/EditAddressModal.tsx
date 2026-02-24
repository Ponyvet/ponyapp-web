import { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMapsLibrary } from '@vis.gl/react-google-maps'
import { LinkIcon, Trash2Icon } from 'lucide-react'
import z from 'zod'

import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { FieldGroup } from '@/shared/components/ui/field'
import { Separator } from '@/shared/components/ui/separator'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/shared/components/ui/dialog'
import Map from '@/shared/components/Map'
import ControlledPlaceAutocomplete from '@/shared/components/ControlledPlaceAutocomplete'
import { parseGoogleMapsUrl, isShortMapsUrl } from '../utils/parseMapsUrl'

const addressSchema = z.object({
  address: z.string().nonempty('La dirección es obligatoria'),
  latitude: z.number().nullish(),
  longitude: z.number().nullish(),
})

type AddressForm = z.infer<typeof addressSchema>

interface AddressData {
  address: string
  latitude: number | null
  longitude: number | null
}

interface Props {
  open: boolean
  onClose: () => void
  onSave: (data: AddressData) => void
  isSaving?: boolean
  initialAddress?: string
  initialLatitude?: number | null
  initialLongitude?: number | null
}

const EditAddressModal = ({
  open,
  onClose,
  onSave,
  isSaving = false,
  initialAddress = '',
  initialLatitude = null,
  initialLongitude = null,
}: Props) => {
  const [markerPosition, setMarkerPosition] = useState<{
    lat: number
    lng: number
  } | null>(
    initialLatitude && initialLongitude
      ? { lat: initialLatitude, lng: initialLongitude }
      : null,
  )
  const [mapsUrl, setMapsUrl] = useState('')
  const [mapsUrlError, setMapsUrlError] = useState('')

  const geocoding = useMapsLibrary('geocoding')
  const geocoder = useRef<google.maps.Geocoder | null>(null)

  const { handleSubmit, control, setValue, reset } = useForm<AddressForm>({
    defaultValues: {
      address: initialAddress,
      latitude: initialLatitude,
      longitude: initialLongitude,
    },
    resolver: zodResolver(addressSchema),
  })

  useEffect(() => {
    if (geocoding && !geocoder.current) {
      geocoder.current = new geocoding.Geocoder()
    }
  }, [geocoding])

  useEffect(() => {
    if (open) {
      reset({
        address: initialAddress,
        latitude: initialLatitude,
        longitude: initialLongitude,
      })
      setMarkerPosition(
        initialLatitude && initialLongitude
          ? { lat: initialLatitude, lng: initialLongitude }
          : null,
      )
      setMapsUrl('')
      setMapsUrlError('')
    }
  }, [open, initialAddress, initialLatitude, initialLongitude, reset])

  const reverseGeocode = async (lat: number, lng: number) => {
    if (!geocoder.current) return
    try {
      const response = await geocoder.current.geocode({
        location: { lat, lng },
      })
      if (response.results && response.results.length > 0) {
        setValue('address', response.results[0].formatted_address)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error en reverse geocoding:', error)
    }
  }

  const applyCoords = (lat: number, lng: number) => {
    setMarkerPosition({ lat, lng })
    setValue('latitude', lat)
    setValue('longitude', lng)
    reverseGeocode(lat, lng)
  }

  const handleMapsUrlChange = (value: string) => {
    setMapsUrl(value)
    setMapsUrlError('')

    if (!value.trim()) return

    if (isShortMapsUrl(value)) {
      setMapsUrlError(
        'Este es un enlace corto. Ábrelo en el navegador, copia la URL completa de la barra de direcciones y pégala aquí.',
      )
      return
    }

    const coords = parseGoogleMapsUrl(value)
    if (coords) {
      applyCoords(coords.lat, coords.lng)
      setMapsUrl('')
    } else if (
      value.includes('google.com/maps') ||
      value.includes('maps.google')
    ) {
      setMapsUrlError(
        'No se encontraron coordenadas en este enlace. Asegúrate de copiar la URL completa.',
      )
    }
  }

  const handlePlaceSelect = (place: google.maps.places.PlaceResult) => {
    if (place.geometry?.location) {
      const lat = place.geometry.location.lat()
      const lng = place.geometry.location.lng()
      setMarkerPosition({ lat, lng })
      setValue('latitude', lat)
      setValue('longitude', lng)
    }
  }

  const handleMarkerPositionChange = (position: {
    lat: number
    lng: number
  }) => {
    setMarkerPosition(position)
    setValue('latitude', position.lat)
    setValue('longitude', position.lng)
    reverseGeocode(position.lat, position.lng)
  }

  const handleClear = () => {
    setValue('address', '')
    setValue('latitude', null)
    setValue('longitude', null)
    setMarkerPosition(null)
    setMapsUrl('')
    setMapsUrlError('')
  }

  const onSubmit = (data: AddressForm) => {
    onSave({
      address: data.address,
      latitude: data.latitude ?? null,
      longitude: data.longitude ?? null,
    })
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-2xl" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Editar Dirección</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="gap-2">
            <ControlledPlaceAutocomplete
              control={control}
              name="address"
              label="Dirección"
              placeholder="Ej. Calle Durango 123"
              onPlaceSelect={handlePlaceSelect}
            />
            <div className="space-y-1.5">
              <label className="text-sm font-medium flex items-center gap-1.5">
                <LinkIcon className="size-3.5" />
                Pegar enlace de Google Maps
              </label>
              <Input
                type="text"
                placeholder="https://maps.google.com/?q=... o coordenadas 19.4326, -99.1332"
                value={mapsUrl}
                onChange={(e) => handleMapsUrlChange(e.target.value)}
              />
              {mapsUrlError && (
                <p className="text-sm text-destructive">{mapsUrlError}</p>
              )}
            </div>
            <Separator />
            <Map
              defaultZoom={15}
              defaultCenter={
                initialLatitude && initialLongitude
                  ? { lat: initialLatitude, lng: initialLongitude }
                  : { lat: 20.229, lng: -98.9984 }
              }
              markerPosition={markerPosition}
              onMarkerPositionChange={handleMarkerPositionChange}
            />
          </FieldGroup>
          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="ghost"
              className="text-destructive hover:text-destructive mr-auto"
              onClick={handleClear}
              disabled={isSaving}
            >
              <Trash2Icon />
              Limpiar dirección
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSaving}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSaving}>
              Guardar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditAddressModal
