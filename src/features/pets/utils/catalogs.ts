import type { Option } from '@/shared/utils/types'
import { Sex, Species } from './enum'

export const SPECIES_CATALOG: Option[] = [
  {
    value: Species.DOG,
    label: 'Perro',
  },
  {
    value: Species.CAT,
    label: 'Gato',
  },
]

export const SEX_CATALOG: Option[] = [
  {
    value: Sex.FEMALE,
    label: 'Hembra',
  },
  {
    value: Sex.MALE,
    label: 'Macho',
  },
]
