import type { ComponentProps } from 'react'

import { UserRoles } from './enum'
import type { Badge } from '@/shared/components/ui/badge'

export const getRoleBadgeVariant = (
  role: UserRoles,
): ComponentProps<typeof Badge>['variant'] => {
  switch (role) {
    case UserRoles.ADMIN:
      return 'default'
    case UserRoles.VETERINARIAN:
      return 'outline'
    case UserRoles.CLIENT:
      return 'secondary'
    default:
      return 'outline'
  }
}
