import { Link } from 'react-router'
import { formatDate } from 'date-fns'
import { CalendarDays, ArrowRight } from 'lucide-react'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Skeleton } from '@/shared/components/ui/skeleton'
import useGetVisits from '@/features/visits/queries/useGetVisits'

const RecentVisits = () => {
  const { data, isLoading } = useGetVisits({ page: 1, limit: 5, sortBy: 'date', sortOrder: 'desc' })

  const visits = data?.data ?? []

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5" />
          Consultas Recientes
        </CardTitle>
        <CardAction>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/visits">
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
        ) : visits.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <CalendarDays className="h-10 w-10 mx-auto mb-2 opacity-50" />
            <p>No hay consultas registradas</p>
          </div>
        ) : (
          <div className="space-y-3">
            {visits.map((visit) => (
              <Link
                key={visit.id}
                to={`/visits/${visit.id}`}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="space-y-0.5">
                  <p className="font-medium">{visit.client.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {visit.veterinarian.name}
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">
                  {formatDate(visit.date, 'dd/MM/yyyy')}
                </span>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default RecentVisits
