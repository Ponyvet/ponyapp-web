import { Route, Routes } from 'react-router'

import LoginPage from '@/features/auth/pages/LoginPage'
import ClientPage from '@/features/clients/pages/ClientPage'
import AppFrame from '@/shared/components/AppFrame'
import PrivateRoute from '@/shared/components/PrivateRoute'
import HomePage from '@/shared/page/HomePage'
import CreateClientPage from '@/features/clients/pages/CreateClientPage'
import EditClientPage from '@/features/clients/pages/EditClientPage'
import ClientDetailsPage from '@/features/clients/pages/ClientDetailsPage'
import CreatePetPage from '@/features/pets/pages/CreatePetPage'
import EditPetPage from '@/features/pets/pages/EditPetPage'
import PetDetailsPage from '@/features/pets/pages/PetDetailsPage'
import NotFound from '@/shared/page/NotFound'
import SettingsPage from '@/shared/page/SettingsPage'
import VaccinationsPage from '@/features/vaccinations/pages/VaccinationsPage'
import CreateVaccinationPage from '@/features/vaccinations/pages/CreateVaccinationPage'
import EditVaccinationPage from '@/features/vaccinations/pages/EditVaccinationPage'
import VaccinationDetailsPage from '@/features/vaccinations/pages/VaccinationDetailsPage'
import MedicalRecordsPage from '@/features/medical-records/pages/MedicalRecordsPage'
import CreateMedicalRecordPage from '@/features/medical-records/pages/CreateMedicalRecordPage'
import EditMedicalRecordPage from '@/features/medical-records/pages/EditMedicalRecordPage'
import MedicalRecordDetailsPage from '@/features/medical-records/pages/MedicalRecordDetailsPage'
import MedicationsPage from '@/features/medications/pages/MedicationsPage'
import CreateMedicationPage from '@/features/medications/pages/CreateMedicationPage'
import EditMedicationPage from '@/features/medications/pages/EditMedicationPage'
import MedicationDetailsPage from '@/features/medications/pages/MedicationDetailsPage'
import ConsultationsPage from '@/features/consultations/pages/ConsultationsPage'
import CreateConsultationPage from '@/features/consultations/pages/CreateConsultationPage'
import EditConsultationPage from '@/features/consultations/pages/EditConsultationPage'
import ConsultationDetailsPage from '@/features/consultations/pages/ConsultationDetailsPage'
import VisitsPage from '@/features/visits/pages/VisitsPage'
import CreateVisitPage from '@/features/visits/pages/CreateVisitPage'
import EditVisitPage from '@/features/visits/pages/EditVisitPage'
import VisitDetailsPage from '@/features/visits/pages/VisitDetailsPage'
import InventoryPage from '@/features/inventory/pages/InventoryPage'
import CreateInventoryItemPage from '@/features/inventory/pages/CreateInventoryItemPage'
import EditInventoryItemPage from '@/features/inventory/pages/EditInventoryItemPage'
import InventoryItemDetailsPage from '@/features/inventory/pages/InventoryItemDetailsPage'
import UsersPage from '@/features/users/pages/UsersPage'
import CreateUserPage from '@/features/users/pages/CreateUserPage'
import EditUserPage from '@/features/users/pages/EditUserPage'
import UserDetailsPage from '@/features/users/pages/UserDetailsPage'

const Router = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route element={<AppFrame />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/clients" element={<ClientPage />} />
          <Route path="/clients/add" element={<CreateClientPage />} />
          <Route path="/clients/:clientId/edit" element={<EditClientPage />} />
          <Route path="/clients/:clientId" element={<ClientDetailsPage />} />
          <Route path="/pets/add" element={<CreatePetPage />} />
          <Route path="/pets/:petId/edit" element={<EditPetPage />} />
          <Route path="/pets/:petId" element={<PetDetailsPage />} />
          <Route path="/medical-records" element={<MedicalRecordsPage />} />
          <Route
            path="/medical-records/add"
            element={<CreateMedicalRecordPage />}
          />
          <Route
            path="/medical-records/:recordId/edit"
            element={<EditMedicalRecordPage />}
          />
          <Route
            path="/medical-records/:recordId"
            element={<MedicalRecordDetailsPage />}
          />
          <Route path="/vaccinations" element={<VaccinationsPage />} />
          <Route path="/vaccinations/add" element={<CreateVaccinationPage />} />
          <Route
            path="/vaccinations/:vaccinationId/edit"
            element={<EditVaccinationPage />}
          />
          <Route
            path="/vaccinations/:vaccinationId"
            element={<VaccinationDetailsPage />}
          />
          <Route path="/medications" element={<MedicationsPage />} />
          <Route path="/medications/add" element={<CreateMedicationPage />} />
          <Route
            path="/medications/:medicationId/edit"
            element={<EditMedicationPage />}
          />
          <Route
            path="/medications/:medicationId"
            element={<MedicationDetailsPage />}
          />
          <Route path="/consultations" element={<ConsultationsPage />} />
          <Route path="/consultations/add" element={<CreateConsultationPage />} />
          <Route
            path="/consultations/:consultationId/edit"
            element={<EditConsultationPage />}
          />
          <Route
            path="/consultations/:consultationId"
            element={<ConsultationDetailsPage />}
          />
          <Route path="/visits" element={<VisitsPage />} />
          <Route path="/visits/add" element={<CreateVisitPage />} />
          <Route path="/visits/:visitId/edit" element={<EditVisitPage />} />
          <Route path="/visits/:visitId" element={<VisitDetailsPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/inventory/add" element={<CreateInventoryItemPage />} />
          <Route
            path="/inventory/:itemId/edit"
            element={<EditInventoryItemPage />}
          />
          <Route
            path="/inventory/:itemId"
            element={<InventoryItemDetailsPage />}
          />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/add" element={<CreateUserPage />} />
          <Route path="/users/:userId/edit" element={<EditUserPage />} />
          <Route path="/users/:userId" element={<UserDetailsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Router
