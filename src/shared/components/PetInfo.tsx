import { Link, useNavigate } from 'react-router'

import { Avatar, AvatarFallback } from '@/shared/components/ui/avatar'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from '@/shared/components/ui/card'
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import ItemInfo from '@/shared/components/ItemInfo'
import {
  CalendarIcon,
  CatIcon,
  DnaIcon,
  DogIcon,
  MapIcon,
  NotebookIcon,
  PaletteIcon,
  PhoneIcon,
  UserIcon,
  EditIcon,
} from 'lucide-react'
import { calculateAge, cn, getLabelFromCatalog } from '@/shared/utils/helpers'
import { SEX_CATALOG, SPECIES_CATALOG } from '@/features/pets/utils/catalogs'
import { Sex, Species } from '@/features/pets/utils/enum'
import WhatsAppLink from '@/shared/components/WhatsAppLink'
import useClients from '@/features/clients/hooks/useClients'

// Tipos para diferentes fuentes de datos de mascotas
interface BasePetData {
  species: string
  sex?: string
  breed?: string | null
  birthDate?: Date | null
  color?: string | null
  notes?: string | null
}

interface PetWithClient {
  clientId: string
  client?: {
    id: string
    name: string
    phone?: string
    address?: string
  }
}

interface PetFromPetsFeature extends BasePetData, PetWithClient {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}

interface PetFromMedicalRecord extends BasePetData {
  id: string
}

interface PetInfoProps {
  pet: PetFromPetsFeature | PetFromMedicalRecord
  name: string // Nombre de la mascota/cartilla
  clientId: string
  client: {
    id: string
    name: string
    phone?: string
    address?: string
  }
  showEditButton?: boolean
  editUrl?: string
  recordId?: string // Para mascotas dentro de medical records
}

const PetInfo = ({
  pet,
  name,
  clientId,
  client,
  showEditButton = false,
  editUrl,
  recordId,
}: PetInfoProps) => {
  const navigate = useNavigate()
  const { selectClientById } = useClients()

  // Si client no viene completo, intentar obtenerlo del hook
  const owner = client || selectClientById(clientId)

  const handleEdit = () => {
    if (editUrl) {
      navigate(editUrl)
    } else if ('name' in pet && pet.id) {
      // Es un Pet completo, usar ruta de pets
      navigate(`/pets/${pet.id}/edit`)
    } else if (recordId) {
      // Es un pet dentro de medical record
      navigate(`/medical-records/${recordId}/edit`)
    }
  }

  const getSpeciesIcon = (species: string) => {
    switch (species) {
      case Species.DOG:
        return <DogIcon />
      case Species.CAT:
        return <CatIcon />
      default:
        return <DogIcon />
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
            <CardTitle className="text-xl">{name}</CardTitle>
            <div className="flex items-center space-x-2 mt-1">
              {pet.sex && (
                <Badge
                  variant="secondary"
                  className={cn({
                    'bg-blue-100 text-blue-800': pet.sex === Sex.MALE,
                    'bg-pink-100 text-pink-800': pet.sex === Sex.FEMALE,
                  })}
                >
                  {getLabelFromCatalog(pet.sex, SEX_CATALOG)}
                </Badge>
              )}
              <Badge variant="outline">
                {getLabelFromCatalog(pet.species, SPECIES_CATALOG)}
              </Badge>
            </div>
          </div>
        </div>
        {showEditButton && (
          <CardAction>
            <Button variant="outline" size="sm" onClick={handleEdit}>
              <EditIcon className="h-4 w-4" />
              Editar detalles
            </Button>
          </CardAction>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 dark:text-gray-100">
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
            <h3 className="text-lg font-semibold border-b pb-2">Propietario</h3>
            <ItemInfo
              icon={<UserIcon />}
              title="Nombre"
              description={
                <Link to={`/clients/${clientId}`}>
                  {owner?.name || 'No disponible'}
                </Link>
              }
            />
            {owner?.address && (
              <ItemInfo
                icon={<MapIcon />}
                title="Dirección"
                description={owner.address}
              />
            )}
            {owner?.phone && (
              <ItemInfo
                icon={<PhoneIcon />}
                title="Teléfono"
                description={<WhatsAppLink phone={owner.phone} />}
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
