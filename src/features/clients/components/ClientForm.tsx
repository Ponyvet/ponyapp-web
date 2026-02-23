import { useForm, useWatch, type SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useRef, useEffect } from 'react'
import { useMapsLibrary } from '@vis.gl/react-google-maps'
import { ExternalLinkIcon, LinkIcon, MapPinIcon } from 'lucide-react'

import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { FieldGroup } from '@/shared/components/ui/field'
import { createClientSchema, type CreateClient } from '../models/CreateClient'
import ControlledInput from '@/shared/components/ControlledInput'
import ControlledTextarea from '@/shared/components/ControlledTextarea'
import ControlledPlaceAutocomplete from '@/shared/components/ControlledPlaceAutocomplete'
import Map from '@/shared/components/Map'
import type { Client } from '../models/Client'
import EditAddressModal from './EditAddressModal'
import { parseGoogleMapsUrl, isShortMapsUrl } from '../utils/parseMapsUrl'

const defaultValues: CreateClient = {
  name: '',
  phone: '',
  address: '',
  notes: '',
  latitude: null,
  longitude: null,
}

interface Props {
  client?: Client
  onSubmit: (data: CreateClient) => void
  isPending: boolean
  title: string
  submitText: string
}

const ClientForm = ({
  client,
  onSubmit,
  isPending,
  title,
  submitText,
}: Props) => {
  const navigate = useNavigate()
  const [isEditAddressOpen, setIsEditAddressOpen] = useState(false)
  const [markerPosition, setMarkerPosition] = useState<{
    lat: number
    lng: number
  } | null>(
    client && client.latitude && client.longitude
      ? { lat: client.latitude, lng: client.longitude }
      : null,
  )
  const [mapsUrl, setMapsUrl] = useState('')
  const [mapsUrlError, setMapsUrlError] = useState('')

  const geocoding = useMapsLibrary('geocoding')
  const geocoder = useRef<google.maps.Geocoder | null>(null)

  const { handleSubmit, control, setValue } = useForm({
    defaultValues: client
      ? {
          name: client.name,
          address: client.address,
          phone: client.phone,
          notes: client.notes ?? '',
          latitude: client.latitude ?? null,
          longitude: client.longitude ?? null,
        }
      : defaultValues,
    resolver: zodResolver(createClientSchema),
  })
  useEffect(() => {
    if (geocoding && !geocoder.current) {
      geocoder.current = new geocoding.Geocoder()
    }
  }, [geocoding])
  const handleOnSubmit: SubmitHandler<CreateClient> = (data) => {
    onSubmit(data)
  }

  const reverseGeocode = async (lat: number, lng: number) => {
    if (!geocoder.current) return

    try {
      const response = await geocoder.current.geocode({
        location: { lat, lng },
      })

      if (response.results && response.results.length > 0) {
        const address = response.results[0].formatted_address
        setValue('address', address)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error en reverse geocoding:', error)
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
      setMarkerPosition(coords)
      setValue('latitude', coords.lat)
      setValue('longitude', coords.lng)
      reverseGeocode(coords.lat, coords.lng)
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

  const currentAddress = useWatch({ control, name: 'address' })

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <h1 className="text-xl font-bold mb-4">{title}</h1>
      <FieldGroup className="gap-2">
        <ControlledInput
          control={control}
          name="name"
          label="Nombre completo"
          placeholder="Ej. Juan Pérez"
        />
        {client ? (
          <div className="space-y-1.5">
            <Label>Dirección</Label>
            <Input value={currentAddress ?? ''} disabled readOnly />
          </div>
        ) : (
          <ControlledPlaceAutocomplete
            control={control}
            name="address"
            label="Dirección"
            placeholder="Ej. Calle Durango 123"
            onPlaceSelect={handlePlaceSelect}
          />
        )}
        {client ? (
          <>
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">Ubicación</h4>
                <div className="flex gap-2">
                  {markerPosition && (
                    <Button type="button" variant="outline" size="sm" asChild>
                      <a
                        href={`https://www.google.com/maps?q=${markerPosition.lat},${markerPosition.lng}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ExternalLinkIcon />
                        Abrir en Maps
                      </a>
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditAddressOpen(true)}
                  >
                    <MapPinIcon />
                    Editar dirección
                  </Button>
                </div>
              </div>
              {markerPosition ? (
                <div className="h-64 rounded-lg overflow-hidden border">
                  <Map
                    defaultCenter={markerPosition}
                    defaultZoom={15}
                    markerPosition={markerPosition}
                    showMarker={true}
                    readOnly={true}
                    className="h-full w-full"
                  />
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Sin ubicación registrada.
                </p>
              )}
            </div>
            <EditAddressModal
              open={isEditAddressOpen}
              onClose={() => setIsEditAddressOpen(false)}
              onSave={(data) => {
                setValue('address', data.address)
                setValue('latitude', data.latitude)
                setValue('longitude', data.longitude)
                setMarkerPosition(
                  data.latitude && data.longitude
                    ? { lat: data.latitude, lng: data.longitude }
                    : null,
                )
                setIsEditAddressOpen(false)
              }}
              initialAddress={markerPosition ? currentAddress : client.address}
              initialLatitude={markerPosition?.lat ?? client.latitude}
              initialLongitude={markerPosition?.lng ?? client.longitude}
            />
          </>
        ) : (
          <>
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
            <Map
              defaultZoom={13}
              defaultCenter={{ lat: 20.229, lng: -98.9984 }}
              markerPosition={markerPosition}
              onMarkerPositionChange={handleMarkerPositionChange}
            />
          </>
        )}
        <ControlledInput
          control={control}
          name="phone"
          label="Teléfono"
          placeholder="123-456-7890"
          maxLength={10}
        />
        <ControlledTextarea
          control={control}
          name="notes"
          label="Notas"
          placeholder="Agrega cualquier comentario adicional"
        />
      </FieldGroup>
      <div className="mt-6 flex gap-2 items-start">
        <Button type="submit" disabled={isPending}>
          {submitText}
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => navigate(-1)}
          disabled={isPending}
        >
          Cancelar
        </Button>
      </div>
    </form>
  )
}

export default ClientForm
