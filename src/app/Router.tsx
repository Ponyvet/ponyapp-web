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
import PetsPage from '@/features/pets/pages/PetsPage'
import PetDetailsPage from '@/features/pets/pages/PetDetailsPage'
import NotFound from '@/shared/page/NotFound'
import CreateVaccinationPage from '@/features/vaccinations/pages/CreateVaccinationPage'
import MedicalRecordsPage from '@/features/medical-records/pages/MedicalRecordsPage'
import CreateMedicalRecordPage from '@/features/medical-records/pages/CreateMedicalRecordPage'
import EditMedicalRecordPage from '@/features/medical-records/pages/EditMedicalRecordPage'
import MedicalRecordDetailsPage from '@/features/medical-records/pages/MedicalRecordDetailsPage'

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
          <Route path="/pets" element={<PetsPage />} />
          <Route path="/pets/add" element={<CreatePetPage />} />
          <Route path="/pets/:petId/edit" element={<EditPetPage />} />
          <Route
            path="/clients/:clientId/pets/:petId"
            element={<PetDetailsPage />}
          />
          <Route path="/pets/:petId" element={<PetDetailsPage />} />
          <Route path="/medical-records" element={<MedicalRecordsPage />} />
          <Route path="/medical-records/add" element={<CreateMedicalRecordPage />} />
          <Route path="/medical-records/:recordId/edit" element={<EditMedicalRecordPage />} />
          <Route path="/medical-records/:recordId" element={<MedicalRecordDetailsPage />} />
          <Route path="/vaccination/add" element={<CreateVaccinationPage />} />
        </Route>
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Router
