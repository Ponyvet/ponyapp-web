import {
  ContactRound,
  ClipboardList,
  Stethoscope,
  CalendarDays,
  Package,
  Syringe,
} from 'lucide-react'

import StatCard from '../components/StatCard'
import RecentVisits from '../components/RecentVisits'
import UpcomingVaccinations from '../components/UpcomingVaccinations'
import LowStockAlert from '../components/LowStockAlert'

import useGetClients from '@/features/clients/queries/useGetClients'
import useGetMedicalRecords from '@/features/medical-records/queries/useGetMedicalRecords'
import useGetVisits from '@/features/visits/queries/useGetVisits'
import useGetConsultations from '@/features/consultations/queries/useGetConsultations'
import useGetVaccinations from '@/features/vaccinations/queries/useGetVaccinations'
import useGetInventory from '@/features/inventory/queries/useGetInventory'

const DashboardPage = () => {
  const { data: clients, isLoading: isLoadingClients } = useGetClients()
  const { data: medicalRecords, isLoading: isLoadingRecords } = useGetMedicalRecords({ page: 1, limit: 1 })
  const { data: visits, isLoading: isLoadingVisits } = useGetVisits({ page: 1, limit: 1 })
  const { data: consultations, isLoading: isLoadingConsultations } = useGetConsultations({ page: 1, limit: 1 })
  const { data: vaccinations, isLoading: isLoadingVaccinations } = useGetVaccinations({ page: 1, limit: 1 })
  const { data: inventory, isLoading: isLoadingInventory } = useGetInventory({ page: 1, limit: 1 })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Resumen general del sistema veterinario
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Clientes"
          value={clients?.length ?? 0}
          icon={ContactRound}
          href="/clients"
          isLoading={isLoadingClients}
        />
        <StatCard
          title="Cartillas Médicas"
          value={medicalRecords?.pagination.total ?? 0}
          icon={ClipboardList}
          href="/medical-records"
          isLoading={isLoadingRecords}
        />
        <StatCard
          title="Visitas"
          value={visits?.pagination.total ?? 0}
          icon={CalendarDays}
          href="/visits"
          isLoading={isLoadingVisits}
        />
        <StatCard
          title="Consultas"
          value={consultations?.pagination.total ?? 0}
          icon={Stethoscope}
          href="/consultations"
          isLoading={isLoadingConsultations}
        />
        <StatCard
          title="Vacunaciones"
          value={vaccinations?.pagination.total ?? 0}
          icon={Syringe}
          href="/vaccinations"
          isLoading={isLoadingVaccinations}
        />
        <StatCard
          title="Artículos en Inventario"
          value={inventory?.pagination.total ?? 0}
          icon={Package}
          href="/inventory"
          isLoading={isLoadingInventory}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <RecentVisits />
        <UpcomingVaccinations />
        <LowStockAlert />
      </div>
    </div>
  )
}

export default DashboardPage
