import { useForm, type SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useRef, useEffect } from 'react'
import { useMapsLibrary } from '@vis.gl/react-google-maps'

import { Button } from '@/shared/components/ui/button'
import { FieldGroup } from '@/shared/components/ui/field'
import { createClientSchema, type CreateClient } from '../models/CreateClient'
import ControlledInput from '@/shared/components/ControlledInput'
import ControlledTextarea from '@/shared/components/ControlledTextarea'
import ControlledPlaceAutocomplete from '@/shared/components/ControlledPlaceAutocomplete'
import Map from '@/shared/components/Map'
import type { Client } from '../models/Client'

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
  const [markerPosition, setMarkerPosition] = useState<{
    lat: number
    lng: number
  } | null>(
    client && client.latitude && client.longitude
      ? { lat: client.latitude, lng: client.longitude }
      : null,
  )

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
        <ControlledPlaceAutocomplete
          control={control}
          name="address"
          label="Dirección"
          placeholder="Ej. Calle Durango 123"
          onPlaceSelect={handlePlaceSelect}
        />
        <Map
          defaultZoom={13}
          defaultCenter={
            client?.latitude && client?.longitude
              ? { lat: client.latitude, lng: client.longitude }
              : { lat: 20.229, lng: -98.9984 }
          }
          markerPosition={markerPosition}
          onMarkerPositionChange={handleMarkerPositionChange}
        />
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
