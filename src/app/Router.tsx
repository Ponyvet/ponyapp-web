import { Route, Routes } from 'react-router'

import LoginPage from '@/features/auth/pages/LoginPage'
import ClientPage from '@/features/clients/pages/ClientPage'
import AppFrame from '@/shared/components/AppFrame'
import PrivateRoute from '@/shared/components/PrivateRoute'
import HomePage from '@/shared/page/HomePage'
import CreateClientPage from '@/features/clients/pages/CreateClientPage'
import ClientDetailsPage from '@/features/clients/pages/ClientDetailsPage'
import CreatePetPage from '@/features/pets/pages/CreatePetPage'
import VaccinesPage from '@/features/vaccines/pages/VaccinesPage'
import CreateVaccinePage from '@/features/vaccines/pages/CreateVaccinePage'
import PetDetailsPage from '@/features/pets/pages/PetDetailsPage'
import NotFound from '@/shared/page/NotFound'
import CreateVaccinationPage from '@/features/vaccinations/pages/CreateVaccinationPage'

const Router = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route element={<AppFrame />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/clients" element={<ClientPage />} />
          <Route path="/clients/add" element={<CreateClientPage />} />
          <Route path="/clients/:id" element={<ClientDetailsPage />} />
          <Route path="/pets/add" element={<CreatePetPage />} />
          <Route path="/pets/:id" element={<PetDetailsPage />} />
          <Route path="/vaccines" element={<VaccinesPage />} />
          <Route path="/vaccines/add" element={<CreateVaccinePage />} />
          <Route path="/vaccination/add" element={<CreateVaccinationPage />} />
        </Route>
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Router
