import type { UserRoles } from './enum'

export const userRoleOptions = [
  { label: 'Administrador', value: 'ADMIN' },
  { label: 'Veterinario', value: 'VETERINARIAN' },
  { label: 'Cliente', value: 'CLIENT' },
]

export const userRoleLabels: Record<UserRoles, string> = {
  ADMIN: 'Administrador',
  VETERINARIAN: 'Veterinario',
  CLIENT: 'Cliente',
}
