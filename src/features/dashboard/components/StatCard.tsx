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
      <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                {title}
              </p>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <p className="text-2xl font-bold">{value}</p>
              )}
              {description && (
                <p className="text-xs text-muted-foreground">{description}</p>
              )}
            </div>
            <div className="p-3 bg-primary/10 rounded-full">
              <Icon className="h-6 w-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default StatCard
