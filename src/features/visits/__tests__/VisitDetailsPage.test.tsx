import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'

import { server } from '@/test/setup'
import { renderPage } from '@/test/utils'

import VisitDetailsPage from '../pages/VisitDetailsPage'

const mockNavigate = vi.fn()
vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>()
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ visitId: '1' }),
  }
})

const mockVisit = {
  id: '1',
  date: '2024-01-15T10:00:00.000Z',
  generalNotes: 'Revisión general del paciente',
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
  consultations: [
    {
      id: '1',
      reason: 'Control de rutina',
      diagnosis: 'Sano',
      treatment: 'Ninguno',
      notes: null,
      record: {
        id: '1',
        name: 'Firulais',
      },
    },
    {
      id: '2',
      reason: 'Vacunación',
      diagnosis: null,
      treatment: 'Vacuna antirrábica',
      notes: null,
      record: {
        id: '2',
        name: 'Michi',
      },
    },
  ],
}

const mockVisitNoConsultations = {
  ...mockVisit,
  consultations: [],
}

describe('VisitDetailsPage', () => {
  beforeEach(() => {
    server.use(
      http.get('/visits/1', () => {
        return HttpResponse.json(mockVisit)
      }),
    )
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('renders all visit details correctly', async () => {
    renderPage({ children: <VisitDetailsPage /> })

    await waitFor(() => {
      expect(screen.getByText('Detalles de la Consulta')).toBeInTheDocument()
    })

    expect(screen.getByText('15/01/2024')).toBeInTheDocument()
    expect(screen.getByText('Juan Pérez')).toBeInTheDocument()
    expect(screen.getByText('Dr. García')).toBeInTheDocument()
    expect(
      screen.getByText('Revisión general del paciente'),
    ).toBeInTheDocument()

    expect(screen.getByText('Tratamientos (2)')).toBeInTheDocument()
    expect(screen.getByText('Firulais')).toBeInTheDocument()
    expect(screen.getByText('Michi')).toBeInTheDocument()
    expect(screen.getByText(/Control de rutina/)).toBeInTheDocument()
    expect(screen.getByText(/Vacunación/)).toBeInTheDocument()
  })

  it('renders empty consultations state correctly', async () => {
    server.use(
      http.get('/visits/1', () => {
        return HttpResponse.json(mockVisitNoConsultations)
      }),
    )

    renderPage({ children: <VisitDetailsPage /> })

    await waitFor(() => {
      expect(screen.getByText('Detalles de la Consulta')).toBeInTheDocument()
    })

    expect(screen.getByText('Tratamientos (0)')).toBeInTheDocument()
    expect(
      screen.getByText('No hay tratamientos registrados para esta consulta.'),
    ).toBeInTheDocument()
  })

  it('navigates to edit page when clicking edit button', async () => {
    const user = userEvent.setup()

    renderPage({ children: <VisitDetailsPage /> })

    await waitFor(() => {
      expect(screen.getByText('Detalles de la Consulta')).toBeInTheDocument()
    })

    const editButton = screen
      .getByText('Detalles de la Consulta')
      .closest('[data-slot="card"]')
      ?.querySelector('button[data-variant="outline"]')

    await user.click(editButton!)

    expect(mockNavigate).toHaveBeenCalledWith('/visits/1/edit')
  })

  it('deletes visit successfully when confirming deletion', async () => {
    const user = userEvent.setup()
    let deleteRequestMade = false

    server.use(
      http.delete('/visits/1', () => {
        deleteRequestMade = true
        return new HttpResponse(null, { status: 204 })
      }),
    )

    renderPage({ children: <VisitDetailsPage /> })

    await waitFor(() => {
      expect(screen.getByText('Detalles de la Consulta')).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: /Eliminar/i }))

    await waitFor(() => {
      expect(
        screen.getByText('¿Estás absolutamente seguro?'),
      ).toBeInTheDocument()
    })
    expect(
      screen.getByText(
        /¿Estás seguro de que deseas eliminar esta visita\?/,
      ),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /^Eliminar$/i }))

    await waitFor(() => {
      expect(deleteRequestMade).toBe(true)
    })

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/visits')
    })
  })

  it('navigates to add treatment page when clicking "Agregar tratamiento" button', async () => {
    const user = userEvent.setup()

    renderPage({ children: <VisitDetailsPage /> })

    await waitFor(() => {
      expect(screen.getByText('Detalles de la Consulta')).toBeInTheDocument()
    })

    await user.click(
      screen.getByRole('button', { name: /Agregar tratamiento/i }),
    )

    expect(mockNavigate).toHaveBeenCalledWith('/consultations/add', {
      state: { clientId: '1', visitId: '1' },
    })
  })

  it('navigates to consultation details when clicking on a treatment', async () => {
    const user = userEvent.setup()

    renderPage({ children: <VisitDetailsPage /> })

    await waitFor(() => {
      expect(screen.getByText('Firulais')).toBeInTheDocument()
    })

    await user.click(screen.getByText('Firulais'))

    expect(mockNavigate).toHaveBeenCalledWith('/consultations/1')
  })
})
