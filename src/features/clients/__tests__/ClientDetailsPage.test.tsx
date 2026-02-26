import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'

import { server } from '@/test/setup'
import { renderPage } from '@/test/utils'

import ClientDetailsPage from '../pages/ClientDetailsPage'

const mockNavigate = vi.fn()
vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>()
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ clientId: '1' }),
  }
})

vi.mock('@/shared/hooks/use-mobile', () => ({
  useIsMobile: () => false,
}))

const mockClient = {
  id: '1',
  name: 'Juan Pérez',
  phone: '1234567890',
  address: 'Calle Durango 123',
  latitude: 19.4326,
  longitude: -99.1332,
  notes: 'Cliente frecuente',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

const mockMedicalRecords = [
  {
    id: '1',
    type: 'PET',
    name: 'Firulais',
    notes: null,
    clientId: '1',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    client: {
      id: '1',
      name: 'Juan Pérez',
      phone: '1234567890',
      address: 'Calle Durango 123',
    },
    pet: {
      id: '1',
      species: 'dog',
      sex: 'male',
      breed: 'Labrador',
      birthDate: '2020-01-01',
      color: 'Dorado',
      notes: null,
    },
    animalGroup: null,
    latestVaccination: null,
  },
  {
    id: '2',
    type: 'PET',
    name: 'Michi',
    notes: 'Gato juguetón',
    clientId: '1',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    client: {
      id: '1',
      name: 'Juan Pérez',
      phone: '1234567890',
      address: 'Calle Durango 123',
    },
    pet: {
      id: '2',
      species: 'cat',
      sex: 'female',
      breed: 'Siamés',
      birthDate: '2021-06-15',
      color: 'Blanco',
      notes: null,
    },
    animalGroup: null,
    latestVaccination: null,
  },
]

const mockVisits = [
  {
    id: '1',
    date: '2024-01-15T10:00:00.000Z',
    generalNotes: 'Revisión general',
    veterinarianId: '1',
    clientId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    veterinarian: {
      id: '1',
      name: 'Dr. García',
    },
    client: {
      id: '1',
      name: 'Juan Pérez',
    },
    consultations: [],
  },
  {
    id: '2',
    date: '2024-02-20T14:30:00.000Z',
    generalNotes: 'Vacunación',
    veterinarianId: '1',
    clientId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    veterinarian: {
      id: '1',
      name: 'Dr. García',
    },
    client: {
      id: '1',
      name: 'Juan Pérez',
    },
    consultations: [],
  },
]

describe('ClientDetailsPage', () => {
  beforeEach(() => {
    server.use(
      http.get('/clients/1', () => {
        return HttpResponse.json(mockClient)
      }),
      http.get('/medical-records/client/1', () => {
        return HttpResponse.json(mockMedicalRecords)
      }),
      http.get('/visits/client/1', () => {
        return HttpResponse.json(mockVisits)
      }),
    )
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('renders all client details correctly', async () => {
    renderPage({ children: <ClientDetailsPage /> })

    await waitFor(() => {
      expect(screen.getByText('Detalles del Cliente')).toBeInTheDocument()
    })

    expect(screen.getByText('Juan Pérez')).toBeInTheDocument()
    expect(screen.getByText('Calle Durango 123')).toBeInTheDocument()
    expect(screen.getByText('123-456-7890')).toBeInTheDocument()
    expect(screen.getByText('Cliente frecuente')).toBeInTheDocument()

    expect(screen.getByText('Cartillas médicas')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Agregar Cartilla/i }),
    ).toBeInTheDocument()

    expect(screen.getByText('Consultas')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Agregar Consulta/i }),
    ).toBeInTheDocument()

    expect(screen.getByTestId('map')).toBeInTheDocument()
  })

  it('navigates to edit page when clicking edit button', async () => {
    const user = userEvent.setup()

    renderPage({ children: <ClientDetailsPage /> })

    await waitFor(() => {
      expect(screen.getByText('Detalles del Cliente')).toBeInTheDocument()
    })

    const editButton = screen
      .getByText('Detalles del Cliente')
      .closest('[data-slot="card"]')
      ?.querySelector('button[data-variant="outline"]')

    await user.click(editButton!)

    expect(mockNavigate).toHaveBeenCalledWith('/clients/1/edit')
  })

  it('deletes client successfully when confirming deletion', async () => {
    const user = userEvent.setup()
    let deleteRequestMade = false

    server.use(
      http.delete('/clients/1', () => {
        deleteRequestMade = true
        return new HttpResponse(null, { status: 204 })
      }),
    )

    renderPage({ children: <ClientDetailsPage /> })

    await waitFor(() => {
      expect(screen.getByText('Detalles del Cliente')).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: /Eliminar/i }))

    await waitFor(() => {
      expect(
        screen.getByText('¿Estás absolutamente seguro?'),
      ).toBeInTheDocument()
    })
    expect(
      screen.getByText(/¿Estás seguro de que deseas eliminar a Juan Pérez\?/),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /^Eliminar$/i }))

    await waitFor(() => {
      expect(deleteRequestMade).toBe(true)
    })

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/clients')
    })
  })

  it('has correct WhatsApp link when clicking phone number', async () => {
    renderPage({ children: <ClientDetailsPage /> })

    await waitFor(() => {
      expect(screen.getByText('123-456-7890')).toBeInTheDocument()
    })

    const phoneLink = screen.getByText('123-456-7890').closest('a')

    expect(phoneLink).toHaveAttribute('href', 'https://wa.me/1234567890')
    expect(phoneLink).toHaveAttribute('target', '_blank')
  })

  it('has correct Google Maps link when clicking "Abrir en Maps" button', async () => {
    renderPage({ children: <ClientDetailsPage /> })

    await waitFor(() => {
      expect(screen.getByText('Detalles del Cliente')).toBeInTheDocument()
    })

    const mapsLink = screen.getByRole('link', { name: /Abrir en Maps/i })

    expect(mapsLink).toHaveAttribute(
      'href',
      'https://www.google.com/maps?q=19.4326,-99.1332',
    )
    expect(mapsLink).toHaveAttribute('target', '_blank')
  })

  it('opens edit address modal when clicking "Editar dirección" button', async () => {
    const user = userEvent.setup()

    renderPage({ children: <ClientDetailsPage /> })

    await waitFor(() => {
      expect(screen.getByText('Detalles del Cliente')).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: /Editar dirección/i }))

    await waitFor(() => {
      expect(screen.getByText('Editar Dirección')).toBeInTheDocument()
    })

    expect(screen.getByLabelText(/Dirección/i)).toBeInTheDocument()
    expect(screen.getByText('Pegar enlace de Google Maps')).toBeInTheDocument()
    expect(screen.getAllByTestId('map').length).toBeGreaterThanOrEqual(1)
    expect(
      screen.getByRole('button', { name: /Limpiar dirección/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Cancelar/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Guardar/i })).toBeInTheDocument()
  })

  it('navigates to add medical record page when clicking "Agregar Cartilla" button', async () => {
    const user = userEvent.setup()

    renderPage({ children: <ClientDetailsPage /> })

    await waitFor(() => {
      expect(screen.getByText('Detalles del Cliente')).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: /Agregar Cartilla/i }))

    expect(mockNavigate).toHaveBeenCalledWith('/medical-records/add', {
      state: { clientId: '1' },
    })
  })

  it('navigates to add medical record page when clicking "Agregar primera cartilla" button', async () => {
    const user = userEvent.setup()

    server.use(
      http.get('/medical-records/client/1', () => {
        return HttpResponse.json([])
      }),
    )

    renderPage({ children: <ClientDetailsPage /> })

    await waitFor(() => {
      expect(
        screen.getByText('No hay mascotas registradas'),
      ).toBeInTheDocument()
    })

    await user.click(
      screen.getByRole('button', { name: /Agregar primera cartilla/i }),
    )

    expect(mockNavigate).toHaveBeenCalledWith('/medical-records/add', {
      state: { clientId: '1' },
    })
  })

  it('navigates to add visit page when clicking "Agregar Consulta" button', async () => {
    const user = userEvent.setup()

    renderPage({ children: <ClientDetailsPage /> })

    await waitFor(() => {
      expect(screen.getByText('Detalles del Cliente')).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: /Agregar Consulta/i }))

    expect(mockNavigate).toHaveBeenCalledWith('/visits/add', {
      state: { clientId: '1' },
    })
  })

  it('navigates to add visit page when clicking "Agregar primera consulta" button', async () => {
    const user = userEvent.setup()

    server.use(
      http.get('/visits/client/1', () => {
        return HttpResponse.json([])
      }),
    )

    renderPage({ children: <ClientDetailsPage /> })

    await waitFor(() => {
      expect(
        screen.getByText('No hay consultas registradas'),
      ).toBeInTheDocument()
    })

    await user.click(
      screen.getByRole('button', { name: /Agregar primera consulta/i }),
    )

    expect(mockNavigate).toHaveBeenCalledWith('/visits/add', {
      state: { clientId: '1' },
    })
  })
})
