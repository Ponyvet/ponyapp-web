import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  calculateAge,
  cn,
  formatPhoneNumber,
  getLabelFromCatalog,
} from '@/shared/utils/helpers'
import { SEX_CATALOG, SPECIES_CATALOG } from '../../utils/catalogs'
import ItemInfo from '@/shared/components/ItemInfo'
import {
  CalendarIcon,
  CatIcon,
  DnaIcon,
  DogIcon,
  Map,
  NotebookIcon,
  PaletteIcon,
  UserIcon,
} from 'lucide-react'
import type { Pet } from '../../models/Pet'
import useClients from '@/features/clients/hooks/useClients'
import { Sex, Species } from '../../utils/enum'
import { Link } from 'react-router'

interface PetInfoProps {
  pet: Pet
}

const PetInfo = ({ pet }: PetInfoProps) => {
  const { getClientName, selectClientById } = useClients()
  const owner = selectClientById(pet.clientId)

  const getSpeciesIcon = (species: string) => {
    switch (species) {
      case Species.DOG:
        return <DogIcon />
      case Species.CAT:
        return <CatIcon />
      default:
        return ''
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback>{getSpeciesIcon(pet.species)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl">{pet.name}</CardTitle>
            <div className="flex items-center space-x-2 mt-1">
              <Badge
                variant="secondary"
                className={cn({
                  'bg-blue-100 text-blue-800': pet.sex === Sex.MALE,
                  'bg-pink-100 text-pink-800': pet.sex === Sex.FEMALE,
                })}
              >
                {getLabelFromCatalog(pet.sex, SEX_CATALOG)}
              </Badge>
              <Badge variant="outline">
                {getLabelFromCatalog(pet.species, SPECIES_CATALOG)}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
              Información Básica
            </h3>
            {pet.breed && (
              <ItemInfo
                icon={<DnaIcon />}
                title="Raza"
                description={pet.breed}
              />
            )}
            {pet.color && (
              <ItemInfo
                icon={<PaletteIcon />}
                title="Color"
                description={pet.color}
              />
            )}
            {pet.birthDate && (
              <ItemInfo
                icon={<CalendarIcon />}
                title="Edad"
                description={calculateAge(pet.birthDate)}
              />
            )}
            {pet.birthDate && (
              <ItemInfo
                icon={<CalendarIcon />}
                title="Fecha de Nacimiento"
                description={new Date(pet.birthDate).toLocaleDateString()}
              />
            )}
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
              Propietario
            </h3>
            <ItemInfo
              icon={<UserIcon />}
              title="Nombre"
              description={
                <Link to={`/clients/${pet.clientId}`}>
                  {getClientName(pet.clientId)}
                </Link>
              }
            />
            {owner?.address && (
              <ItemInfo
                icon={<Map />}
                title="Dirección"
                description={owner.address}
              />
            )}
            {owner?.phone && (
              <ItemInfo
                icon={<UserIcon />}
                title="Teléfono"
                description={
                  <a
                    href={`https://wa.me/${owner.phone}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {formatPhoneNumber(owner.phone)}
                  </a>
                }
              />
            )}
          </div>
          {pet.notes && (
            <div className="space-y-4 md:col-span-2 lg:col-span-1">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                Notas
              </h3>
              <ItemInfo icon={<NotebookIcon />} description={pet.notes} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default PetInfo
