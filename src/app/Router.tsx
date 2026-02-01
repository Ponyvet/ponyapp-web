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
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Router
