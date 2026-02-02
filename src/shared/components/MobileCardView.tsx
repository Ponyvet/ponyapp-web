import { Card, CardContent } from '@/shared/components/ui/card'
import { Skeleton } from '@/shared/components/ui/skeleton'

export interface MobileCardField<TData> {
  key: string
  label: string
  render?: (item: TData) => React.ReactNode
  className?: string
  isTitle?: boolean
}

interface MobileCardViewProps<TData> {
  data: TData[]
  fields: MobileCardField<TData>[]
  isLoading?: boolean
  loadingCount?: number
  onItemClick?: (item: TData) => void
  renderActions?: (item: TData) => React.ReactNode
  getItemId: (item: TData) => string
}

export function MobileCardView<TData>({
  data,
  fields,
  isLoading = false,
  loadingCount = 5,
  onItemClick,
  renderActions,
  getItemId,
}: MobileCardViewProps<TData>) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: loadingCount }).map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          No se encontraron datos.
        </CardContent>
      </Card>
    )
  }

  const titleField = fields.find((f) => f.isTitle)
  const regularFields = fields.filter((f) => !f.isTitle)

  return (
    <div className="space-y-3">
      {data.map((item) => (
        <Card
          key={getItemId(item)}
          className={onItemClick ? 'cursor-pointer hover:bg-muted/50 transition-colors' : ''}
          onClick={() => onItemClick?.(item)}
        >
          <CardContent className="pt-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0 space-y-2">
                {titleField && (
                  <p className={`font-semibold truncate ${titleField.className || ''}`}>
                    {titleField.render
                      ? titleField.render(item)
                      : String((item as Record<string, unknown>)[titleField.key] ?? '')}
                  </p>
                )}
                {regularFields.map((field) => (
                  <div key={field.key} className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground shrink-0">{field.label}:</span>
                    <span className={`truncate ${field.className || ''}`}>
                      {field.render
                        ? field.render(item)
                        : String((item as Record<string, unknown>)[field.key] ?? '-')}
                    </span>
                  </div>
                ))}
              </div>
              {renderActions && (
                <div className="flex items-center shrink-0" onClick={(e) => e.stopPropagation()}>
                  {renderActions(item)}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
