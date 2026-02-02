import { type LucideIcon } from 'lucide-react'
import { Link } from 'react-router'

import { Card, CardContent } from '@/shared/components/ui/card'
import { Skeleton } from '@/shared/components/ui/skeleton'

interface StatCardProps {
  title: string
  value: number | string
  icon: LucideIcon
  href: string
  isLoading?: boolean
  description?: string
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  href,
  isLoading,
  description,
}: StatCardProps) => {
  return (
    <Link to={href}>
      <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
        <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
          <div className="flex items-center justify-between gap-2">
            <div className="space-y-0.5 sm:space-y-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">
                {title}
              </p>
              {isLoading ? (
                <Skeleton className="h-6 sm:h-8 w-12 sm:w-16" />
              ) : (
                <p className="text-xl sm:text-2xl font-bold">{value}</p>
              )}
              {description && (
                <p className="text-xs text-muted-foreground truncate">{description}</p>
              )}
            </div>
            <div className="p-2 sm:p-3 bg-primary/10 rounded-full shrink-0">
              <Icon className="h-4 w-4 sm:h-6 sm:w-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default StatCard
