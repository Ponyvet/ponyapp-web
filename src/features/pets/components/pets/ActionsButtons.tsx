import type { Pet } from '../../models/Pet'
import DetailsButton from './DetailsButton'
import EditButton from './EditButton'
import DeleteButton from './DeleteButton'

interface ActionsButtonsProps {
  pet: Pet
  petsPage: boolean
}

const ActionsButtons = ({ pet, petsPage }: ActionsButtonsProps) => {
  return (
    <div className="flex items-center gap-1">
      <DetailsButton pet={pet} petsPage={petsPage} />
      <EditButton pet={pet} />
      <DeleteButton pet={pet} />
    </div>
  )
}

export default ActionsButtons
