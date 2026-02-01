import { Button } from '@/shared/components/ui/button'
import type { ReactNode } from 'react'

interface EmptyTableProps {
  icon: ReactNode
  title: string
  description?: string
  onclick?: () => void
  buttonText?: ReactNode
}

const EmptyTable = ({
  icon,
  title,
  description,
  onclick,
  buttonText,
}: EmptyTableProps) => {
  return (
    <div className="text-center py-8">
      <div className="mx-auto h-12 w-12 text-muted-foreground">{icon}</div>
      <h3 className="mt-2 text-sm font-medium text-foreground">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      <div className="mt-4">
        <Button variant="outline" size="sm" onClick={onclick}>
          {buttonText}
        </Button>
      </div>
    </div>
  )
}

export default EmptyTable
