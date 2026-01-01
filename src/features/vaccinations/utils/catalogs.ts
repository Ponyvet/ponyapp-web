import { VaccinationStatus } from './enum'

export const VACCINATION_STATUS_CATALOG = [
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
