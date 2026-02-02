import { useNavigate, useParams } from 'react-router'
import {
  EditIcon,
  MailIcon,
  ShieldIcon,
  TrashIcon,
  UserIcon,
  CheckCircleIcon,
  XCircleIcon,
} from 'lucide-react'

import useGetSingleUser from '../queries/useGetSingleUser'
import useDeleteUser from '../queries/useDeleteUser'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import ItemInfo from '@/shared/components/ItemInfo'
import { useConfirm } from '@/shared/hooks/use-confirm'
import { ConfirmDialog } from '@/shared/components/ConfirmDialog'
import { userRoleLabels } from '../utils/catalogs'
import { Badge } from '@/shared/components/ui/badge'

const UserDetailsPage = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { data: user, isSuccess } = useGetSingleUser(params.userId!)
  const deleteUserMutation = useDeleteUser()
  const { confirm, isOpen, options, handleConfirm, handleCancel } = useConfirm()

  const handleDeleteUser = async () => {
    if (!user) return

    const confirmed = await confirm({
      title: '¿Estás absolutamente seguro?',
      description:
        '¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.',
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
    })

    if (confirmed) {
      deleteUserMutation.mutate(user.id, {
        onSuccess: () => navigate('/users'),
      })
    }
  }

  if (!isSuccess || !user) {
    return null
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <h1 className="text-xl font-bold flex items-center gap-2">
              {user.name}
              <Badge variant={user.isActive ? 'default' : 'secondary'}>
                {user.isActive ? 'Activo' : 'Inactivo'}
              </Badge>
            </h1>
          </CardTitle>
          <CardAction className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/users/${user.id}/edit`)}
            >
              <EditIcon />
              Editar
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteUser}
              disabled={deleteUserMutation.isPending}
            >
              <TrashIcon />
              Eliminar
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ItemInfo
              icon={<UserIcon />}
              title="Nombre"
              description={user.name}
            />
            <ItemInfo
              icon={<MailIcon />}
              title="Correo electrónico"
              description={user.email}
            />
            <ItemInfo
              icon={<ShieldIcon />}
              title="Rol"
              description={userRoleLabels[user.role]}
            />
            <ItemInfo
              icon={user.isActive ? <CheckCircleIcon /> : <XCircleIcon />}
              title="Estado"
              description={user.isActive ? 'Activo' : 'Inactivo'}
            />
            {user.client && (
              <ItemInfo
                icon={<UserIcon />}
                title="Cliente asociado"
                description={user.client.name}
              />
            )}
          </div>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={isOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title={options.title}
        description={options.description}
        confirmText={options.confirmText}
        cancelText={options.cancelText}
        isLoading={deleteUserMutation.isPending}
      />
    </div>
  )
}

export default UserDetailsPage
