import { Link } from 'react-router'
import { formatDate, isPast, isWithinInterval, addDays } from 'date-fns'
import { Syringe, ArrowRight, AlertTriangle } from 'lucide-react'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { Badge } from '@/shared/components/ui/badge'
import useGetVaccinations from '@/features/vaccinations/queries/useGetVaccinations'

const UpcomingVaccinations = () => {
  const { data, isLoading } = useGetVaccinations({ page: 1, limit: 10 })

  const vaccinations = data?.data ?? []
  const today = new Date()

  const upcomingVaccinations = vaccinations
    .filter((v) => v.nextDueDate)
    .map((v) => {
      const nextDueDate = new Date(v.nextDueDate!)
      const isOverdue = isPast(nextDueDate)
      const isDueSoon = isWithinInterval(nextDueDate, {
        start: today,
        end: addDays(today, 7),
      })

      return {
        ...v,
        isOverdue,
        isDueSoon,
      }
    })
    .sort((a, b) => {
      const dateA = new Date(a.nextDueDate!)
      const dateB = new Date(b.nextDueDate!)
      return dateA.getTime() - dateB.getTime()
    })
    .slice(0, 5)

  const getStatusBadge = (isOverdue: boolean, isDueSoon: boolean) => {
    if (isOverdue) {
      return <Badge variant="destructive">Vencida</Badge>
    }
    if (isDueSoon) {
      return <Badge variant="secondary">Próxima</Badge>
    }
    return null
  }

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2">
          <Syringe className="h-5 w-5" />
          Próximas Vacunaciones
        </CardTitle>
        <CardAction>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/vaccinations">
              Ver todas
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="pt-4">
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        ) : upcomingVaccinations.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <Syringe className="h-10 w-10 mx-auto mb-2 opacity-50" />
            <p>No hay vacunaciones programadas</p>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingVaccinations.map((vaccination) => (
              <Link
                key={vaccination.id}
                to={`/vaccinations/${vaccination.id}`}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{vaccination.medication.name}</p>
                    {getStatusBadge(vaccination.isOverdue, vaccination.isDueSoon)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {vaccination.record.client.name}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {vaccination.isOverdue && (
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                  )}
                  <span className="text-sm text-muted-foreground">
                    {formatDate(vaccination.nextDueDate!, 'dd/MM/yyyy')}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default UpcomingVaccinations
