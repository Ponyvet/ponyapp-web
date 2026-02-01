import { Button } from '@/shared/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { Home } from 'lucide-react'
import { Link } from 'react-router'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="pb-4">
          <div className="mx-auto mb-4 text-6xl font-bold text-muted-foreground">
            404
          </div>
          <CardTitle className="text-2xl">Página No Encontrada</CardTitle>
          <CardDescription className="text-base">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Ir al Inicio
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
