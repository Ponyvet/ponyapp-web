import { Monitor, Moon, Sun, User, Mail } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ThemeToggle } from '@/shared/components/ThemeToggle'
import { useTheme } from '@/shared/components/ThemeProvider'
import useProfile from '@/features/auth/queries/useProfile'
import { Separator } from '@/components/ui/separator'

const SettingsPage = () => {
  const { theme } = useTheme()
  const { data: user } = useProfile()

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Claro'
      case 'dark':
        return 'Oscuro'
      case 'system':
        return 'Sistema'
      default:
        return 'Sistema'
    }
  }

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-4 w-4" />
      case 'dark':
        return <Moon className="h-4 w-4" />
      case 'system':
        return <Monitor className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Configuración</h1>
        <p className="text-muted-foreground">
          Configura las preferencias generales de la aplicación.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Cuenta</CardTitle>
            <CardDescription>
              Información de tu cuenta de usuario
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {user && (
              <>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">Nombre</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{user.email}</p>
                    <p className="text-sm text-muted-foreground">
                      Correo electrónico
                    </p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Apariencia</CardTitle>
            <CardDescription>
              Personaliza la apariencia de la aplicación
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-sm font-medium">Tema</h3>
                <p className="text-sm text-muted-foreground">
                  Selecciona el tema de la aplicación
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {getThemeIcon()}
                  <span>Actual: {getThemeLabel()}</span>
                </div>
                <ThemeToggle />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acerca de</CardTitle>
            <CardDescription>Información sobre la aplicación</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-sm font-medium">PonyVet</h3>
                <p className="text-sm text-muted-foreground">
                  Sistema de gestión veterinaria
                </p>
              </div>
              <span className="text-sm text-muted-foreground">v1.0.0</span>
            </div>
            <Separator />
            <div className="text-sm text-muted-foreground">
              <p>
                Aplicación para la gestión de clientes, mascotas y registros
                médicos veterinarios.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SettingsPage
