import useGetClients from '../queries/useGetClients'

const useClients = () => {
  const { data: clients = [] } = useGetClients()

  const getClientName = (clientId: string): string => {
    const client = clients.find((c) => c.id === clientId)
    return client?.name ?? ''
  }

  return { clients, getClientName }
}

export default useClients
