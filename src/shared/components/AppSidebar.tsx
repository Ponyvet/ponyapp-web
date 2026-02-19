import * as React from 'react'
import { ContactRound, Hospital, ClipboardList, PillBottle, Syringe, Stethoscope, CalendarDays, Package, Users } from 'lucide-react'

import { NavUser } from './NavUser'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/components/ui/sidebar'
import { useTranslation } from 'react-i18next'
import { NavMain } from './NavMain'
import { Link } from 'react-router'
import useProfile from '@/features/auth/queries/useProfile'
import { useAuthStore } from '@/features/auth/store/authStore'

const data = {
  menus: [
    {
      name: 'Clientes',
      url: '/clients',
      icon: ContactRound,
    },
    {
      name: 'Cartillas Médicas',
      url: '/medical-records',
      icon: ClipboardList,
    },
    {
      name: 'Medicamentos',
      url: '/medications',
      icon: PillBottle,
    },
    {
      name: 'Vacunaciones',
      url: '/vaccinations',
      icon: Syringe,
    },
    {
      name: 'Consultas',
      url: '/consultations',
      icon: Stethoscope,
    },
    {
      name: 'Visitas',
      url: '/visits',
      icon: CalendarDays,
    },
    {
      name: 'Inventario',
      url: '/inventory',
      icon: Package,
    },
    {
      name: 'Usuarios',
      url: '/users',
      icon: Users,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t } = useTranslation('shared')
  const { isSuccess, data: profileData } = useProfile()
  const isAuth = useAuthStore((state) => state.isAuth)
  const session = useAuthStore((state) => state.session)

  const userData = isSuccess ? profileData : session

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Hospital className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {t('sidebar.title')}
                  </span>
                  <span className="truncate text-xs">
                    {t('sidebar.subtitle')}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain menus={data.menus} />
      </SidebarContent>
      {isAuth && (
        <SidebarFooter>
          <NavUser
            user={{
              email: userData?.email ?? '',
              name: userData?.name ?? '',
            }}
          />
        </SidebarFooter>
      )}
    </Sidebar>
  )
}
