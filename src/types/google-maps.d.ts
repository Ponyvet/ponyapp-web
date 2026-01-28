/// <reference types="@types/google.maps" />

declare global {
  namespace google {
    namespace maps {
      namespace places {
        class AutocompleteService {
          constructor()
          getPlacePredictions(
            request: google.maps.places.AutocompletionRequest,
            callback: (
              predictions: google.maps.places.AutocompletePrediction[] | null,
              status: google.maps.places.PlacesServiceStatus,
            ) => void,
          ): void
        }

        class PlacesService {
          constructor(attrContainer: HTMLDivElement | google.maps.Map)
          getDetails(
            request: google.maps.places.PlaceDetailsRequest,
            callback: (
              place: google.maps.places.PlaceResult | null,
              status: google.maps.places.PlacesServiceStatus,
            ) => void,
          ): void
        }

        interface PlaceResult {
          geometry?: {
            location?: {
              lat(): number
              lng(): number
            }
          }
        }

        interface AutocompletePrediction {
          place_id: string
          description: string
          structured_formatting: {
            main_text: string
            secondary_text: string
          }
        }

        enum PlacesServiceStatus {
          OK = 'OK',
        }

        interface AutocompletionRequest {
          input: string
          componentRestrictions?: { country: string }
          types?: string[]
        }

        interface PlaceDetailsRequest {
          placeId: string
        }
      }
    }
  }
}

export {}
