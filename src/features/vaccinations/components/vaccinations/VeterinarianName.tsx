import useUsers from '@/features/users/hooks/useUsers'

interface VeterinarianNameProps {
  veterinarianId: string
}

const VeterinarianName = ({ veterinarianId }: VeterinarianNameProps) => {
  const { getUserName } = useUsers()
  return <>{getUserName(veterinarianId)}</>
}

export default VeterinarianName
