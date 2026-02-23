export function parseGoogleMapsUrl(
  input: string,
): { lat: number; lng: number } | null {
  const text = input.trim()

  const patterns = [
    // ?q=lat,lng  →  WhatsApp location share, direct links
    /[?&]q=(-?\d+\.?\d*),(-?\d+\.?\d*)/,
    // @lat,lng,zoom  →  /maps/place/... URLs
    /@(-?\d+\.?\d*),(-?\d+\.?\d*),\d+/,
    // loc:lat,lng
    /loc:(-?\d+\.?\d*),(-?\d+\.?\d*)/,
    // ll=lat,lng
    /[?&]ll=(-?\d+\.?\d*),(-?\d+\.?\d*)/,
    // Bare coordinates: "19.4326, -99.1332" or "19.4326,-99.1332"
    /^(-?\d{1,2}\.\d+),\s*(-?\d{1,3}\.\d+)$/,
  ]

  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match) {
      const lat = parseFloat(match[1])
      const lng = parseFloat(match[2])
      if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        return { lat, lng }
      }
    }
  }

  return null
}

export function isShortMapsUrl(input: string): boolean {
  return (
    input.includes('goo.gl/maps') ||
    input.includes('maps.app.goo.gl') ||
    input.includes('g.co/maps')
  )
}
