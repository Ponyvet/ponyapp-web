import { VaccinationStatus } from './enum'

export const VACCINE_STATUS_OPTIONS = [
  {
    value: VaccinationStatus.PENDING,
    label: 'Pendiente',
  },
  {
    value: VaccinationStatus.APPLIED,
    label: 'Aplicada',
  },
  {
    value: VaccinationStatus.CANCELLED,
    label: 'Cancelada',
  },
]
