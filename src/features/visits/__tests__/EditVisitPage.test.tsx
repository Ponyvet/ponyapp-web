import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'

import { server } from '@/test/setup'
import { renderPage } from '@/test/utils'

import EditVisitPage from '../pages/EditVisitPage'

const mockNavigate = vi.fn()
vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>()
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ visitId: '1' }),
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

const mockVisit = {
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

describe('EditVisitPage', () => {
  beforeEach(() => {
    server.use(
      http.get('/visits/1', () => {
        return HttpResponse.json(mockVisit)
      }),
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

  it('renders all form elements with visit data', async () => {
    renderPage({ children: <EditVisitPage /> })

    await waitFor(() => {
      expect(screen.getByText('Editar Consulta')).toBeInTheDocument()
    })

    expect(screen.getByText('Fecha de la consulta')).toBeInTheDocument()
    expect(screen.getByText('Cliente')).toBeInTheDocument()
    expect(screen.getByText('Veterinario')).toBeInTheDocument()
    expect(screen.getByText('Descripción / Notas')).toBeInTheDocument()

    expect(screen.getByDisplayValue('Revisión general')).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: /Actualizar/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Cancelar/i }),
    ).toBeInTheDocument()
  })

  it('allows editing notes field', async () => {
    const user = userEvent.setup()

    renderPage({ children: <EditVisitPage /> })

    await waitFor(() => {
      expect(screen.getByText('Editar Consulta')).toBeInTheDocument()
    })

    const notesTextarea = screen.getByDisplayValue('Revisión general')
    expect(notesTextarea).toBeInTheDocument()

    await user.clear(notesTextarea)
    await user.type(notesTextarea, 'Notas actualizadas')

    expect(screen.getByDisplayValue('Notas actualizadas')).toBeInTheDocument()
  })

  it('navigates back when clicking cancel button', async () => {
    const user = userEvent.setup()

    renderPage({ children: <EditVisitPage /> })

    await waitFor(() => {
      expect(screen.getByText('Editar Consulta')).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: /Cancelar/i }))

    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })
})
