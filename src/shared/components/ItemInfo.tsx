import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/shared/components/ui/item'
import type { ReactNode } from 'react'

interface ItemInfoProps {
  icon: ReactNode
  title?: ReactNode
  description: ReactNode
}

const ItemInfo = ({ icon, title, description }: ItemInfoProps) => {
  return (
    <Item variant="default" className="p-1 gap-3">
      <ItemMedia variant="icon" className="bg-transparent my-auto size-6">
        {icon}
      </ItemMedia>
      <ItemContent className="gap-0.5">
        {title && <ItemTitle>{title}</ItemTitle>}
        <ItemDescription>{description}</ItemDescription>
      </ItemContent>
    </Item>
  )
}

export default ItemInfo
