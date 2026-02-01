import type { Option } from './types'

export const getUserInitials = (name: string) => {
  const names = name.split(' ')
  const initials = names.map((n) => n.charAt(0).toUpperCase()).join('')
  return initials.slice(0, 2)
}

export const getLabelFromCatalog = (key: string, catalog: Option[]): string => {
  const item = catalog.find((item) => item.value === key)
  return item ? item.label : key
}

export const calculateAge = (birthDate: Date | null) => {
  if (!birthDate) return 'N/A'
  const today = new Date()
  const birth = new Date(birthDate)
  const diffTime = Math.abs(today.getTime() - birth.getTime())
  const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25))
  const diffMonths = Math.floor(
    (diffTime % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44),
  )

  if (diffYears > 0) {
    return `${diffYears} año${diffYears !== 1 ? 's' : ''}`
  } else {
    return `${diffMonths} mes${diffMonths !== 1 ? 'es' : ''}`
  }
}

export const formatPhoneNumber = (phoneNumber: string) => {
  if (phoneNumber.length < 10) return phoneNumber
  const formattedNumber = phoneNumber.replace(
    /(\d{3})(\d{3})(\d{4})/,
    '$1-$2-$3',
  )
  return `${formattedNumber}`
}
