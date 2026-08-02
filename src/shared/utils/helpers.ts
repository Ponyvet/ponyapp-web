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

  let years = today.getFullYear() - birth.getFullYear()
  let months = today.getMonth() - birth.getMonth()

  if (today.getDate() < birth.getDate()) {
    months--
  }
  if (months < 0) {
    years--
    months += 12
  }

  if (years > 0) {
    return `${years} año${years !== 1 ? 's' : ''}`
  } else {
    return `${months} mes${months !== 1 ? 'es' : ''}`
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

/**
 * Generates an array of Option objects from a given array of items.
 *
 * @template T - The type of items in the input array
 * @param items - Array of items to transform into options
 * @param labelKey - The key from item T to use as the option label
 * @param valueKey - The key from item T to use as the option value
 * @returns An array of Option objects with string label and value properties
 *
 * @example
 * ```typescript
 * const users = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
 * const options = generateOptions(users, 'name', 'id');
 * // Result: [{ label: 'John', value: '1' }, { label: 'Jane', value: '2' }]
 * ```
 */
export const generateOptions = <T>(
  items: T[],
  labelKey: keyof T,
  valueKey: keyof T,
): Option[] => {
  return items.map((item) => ({
    label: String(item[labelKey]),
    value: String(item[valueKey]),
  }))
}
