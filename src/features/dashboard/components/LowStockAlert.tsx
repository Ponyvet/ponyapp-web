import { Link } from 'react-router'
import { Package, ArrowRight, AlertTriangle } from 'lucide-react'

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
import useGetInventory from '@/features/inventory/queries/useGetInventory'

const LOW_STOCK_THRESHOLD = 10

const LowStockAlert = () => {
  const { data, isLoading } = useGetInventory({ page: 1, limit: 50 })

  const items = data?.data ?? []

  const lowStockItems = items
    .filter((item) => item.quantity <= LOW_STOCK_THRESHOLD)
    .sort((a, b) => a.quantity - b.quantity)
    .slice(0, 5)

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Inventario Bajo
        </CardTitle>
        <CardAction>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/inventory">
              Ver todo
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="pt-4">
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
            ))}
          </div>
        ) : lowStockItems.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <Package className="h-10 w-10 mx-auto mb-2 opacity-50" />
            <p>Todo el inventario tiene stock suficiente</p>
          </div>
        ) : (
          <div className="space-y-3">
            {lowStockItems.map((item) => (
              <Link
                key={item.id}
                to={`/inventory/${item.id}`}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{item.name}</p>
                    {item.quantity === 0 && (
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{item.unit}</p>
                </div>
                <Badge
                  variant={item.quantity === 0 ? 'destructive' : 'secondary'}
                >
                  {item.quantity} {item.unit}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default LowStockAlert
