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
