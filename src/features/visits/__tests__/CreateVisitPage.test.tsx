import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'

import { server } from '@/test/setup'
import { renderPage } from '@/test/utils'

import CreateVisitPage from '../pages/CreateVisitPage'

const mockNavigate = vi.fn()
vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>()
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ state: null }),
  }
})

const mockClients = [
  {
    id: '1',
    name: 'Juan Pérez',
    phone: '1234567890',
    address: 'Calle Durango 123',
    latitude: null,
    longitude: null,
    notes: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'María García',
    phone: '0987654321',
    address: 'Av. Reforma 456',
    latitude: null,
    longitude: null,
    notes: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const mockUsers = [
  {
    id: '1',
    name: 'Dr. García',
    email: 'garcia@vet.com',
  },
  {
    id: '2',
    name: 'Dra. López',
    email: 'lopez@vet.com',
  },
]

const mockCreatedVisit = {
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
}

describe('CreateVisitPage', () => {
  beforeEach(() => {
    server.use(
      http.get('/clients', () => {
        return HttpResponse.json(mockClients)
      }),
      http.get('/users/list', () => {
        return HttpResponse.json(mockUsers)
      }),
    )
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('renders all form elements by default', async () => {
    renderPage({ children: <CreateVisitPage /> })

    expect(screen.getByText('Crear Consulta')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('Fecha de la consulta')).toBeInTheDocument()
    })
    expect(screen.getByText('Cliente')).toBeInTheDocument()
    expect(screen.getByText('Veterinario')).toBeInTheDocument()
    expect(screen.getByText('Descripción / Notas')).toBeInTheDocument()

    expect(screen.getByRole('button', { name: /Guardar/i })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Cancelar/i }),
    ).toBeInTheDocument()
  })

  it('loads client and veterinarian options', async () => {
    renderPage({ children: <CreateVisitPage /> })

    await waitFor(() => {
      expect(screen.getByText('Cliente')).toBeInTheDocument()
    })

    // Verify select triggers are present
    expect(screen.getByText('Selecciona el cliente')).toBeInTheDocument()
    expect(
      screen.getByText('Selecciona el veterinario que atenderá'),
    ).toBeInTheDocument()

    // Verify notes field is present
    expect(
      screen.getByPlaceholderText('Notas generales de la consulta'),
    ).toBeInTheDocument()
  })

  it('shows validation errors when submitting without required fields', async () => {
    const user = userEvent.setup()
    let requestMade = false

    server.use(
      http.post('/visits', () => {
        requestMade = true
        return HttpResponse.json(mockCreatedVisit)
      }),
    )

    renderPage({ children: <CreateVisitPage /> })

    await waitFor(() => {
      expect(screen.getByText('Cliente')).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: /Guardar/i }))

    await waitFor(() => {
      expect(
        screen.getByText('El cliente es obligatorio'),
      ).toBeInTheDocument()
    })
    expect(
      screen.getByText('El veterinario es obligatorio'),
    ).toBeInTheDocument()

    expect(requestMade).toBe(false)
  })

  it('navigates back when clicking cancel button', async () => {
    const user = userEvent.setup()

    renderPage({ children: <CreateVisitPage /> })

    await user.click(screen.getByRole('button', { name: /Cancelar/i }))

    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })
})
