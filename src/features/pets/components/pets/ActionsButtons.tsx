import type { Pet } from '../../models/Pet'
import DetailsButton from './DetailsButton'
import EditButton from './EditButton'
import DeleteButton from './DeleteButton'

interface ActionsButtonsProps {
  pet: Pet
}

const ActionsButtons = ({ pet }: ActionsButtonsProps) => {
  return (
    <div className="flex items-center gap-1">
      <DetailsButton pet={pet} />
      <EditButton pet={pet} />
      <DeleteButton pet={pet} />
    </div>
  )
}

export default ActionsButtons
