import { Link } from 'react-router'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ItemInfo from '@/shared/components/ItemInfo'
import {
  UserIcon,
  PawPrintIcon,
  UsersIcon,
  HashIcon,
  PhoneIcon,
  MapIcon,
  NotebookIcon,
} from 'lucide-react'
import WhatsAppLink from '@/shared/components/WhatsAppLink'
import { isAnimalGroupRecord } from '../utils/formatters'
import type { MedicalRecord } from '../models/MedicalRecord'

interface AnimalGroupInfoProps {
  record: MedicalRecord
}

const AnimalGroupInfo = ({ record }: AnimalGroupInfoProps) => {
  if (!isAnimalGroupRecord(record)) return null

  const { animalGroup } = record
  const owner = record.client

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback>
              <UsersIcon />
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl">{record.name}</CardTitle>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="secondary">
                {animalGroup.quantity} {animalGroup.animalType}(s)
              </Badge>
              <Badge variant="outline">Grupo</Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
              Información del Grupo
            </h3>
            <ItemInfo
              icon={<PawPrintIcon />}
              title="Tipo de Animal"
              description={animalGroup.animalType}
            />
            <ItemInfo
              icon={<HashIcon />}
              title="Cantidad"
              description={animalGroup.quantity.toString()}
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
              Propietario
            </h3>
            <ItemInfo
              icon={<UserIcon />}
              title="Nombre"
              description={
                <Link to={`/clients/${record.clientId}`}>
                  {record.client.name}
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
          {animalGroup.notes && (
            <div className="space-y-4 md:col-span-2 lg:col-span-1">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                Notas del Grupo
              </h3>
              <ItemInfo
                icon={<NotebookIcon />}
                description={animalGroup.notes}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default AnimalGroupInfo
