import useGetClients from '../queries/useGetClients'

const useClients = () => {
  const { data: clients = [] } = useGetClients()

  const getClientName = (clientId: string): string => {
    const client = clients.find((c) => c.id === clientId)
    return client?.name ?? ''
  }

  const selectClientById = (clientId: string) => {
    return clients.find((c) => c.id === clientId)
  }

  return { clients, getClientName, selectClientById }
}

export default useClients
