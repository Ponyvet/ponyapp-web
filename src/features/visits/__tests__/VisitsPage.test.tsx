import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'

import { server } from '@/test/setup'
import { renderPage } from '@/test/utils'

import VisitsPage from '../pages/VisitsPage'

const mockNavigate = vi.fn()
vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>()
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

vi.mock('@/shared/hooks/use-mobile', () => ({
  useIsMobile: () => false,
}))

const mockVisits = {
  data: [
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
      veterinarianId: '2',
      clientId: '2',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      veterinarian: {
        id: '2',
        name: 'Dra. López',
      },
      client: {
        id: '2',
        name: 'María García',
      },
      consultations: [],
    },
  ],
  pagination: {
    page: 1,
    limit: 10,
    total: 2,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
  },
}

describe('VisitsPage', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('renders correctly with visits data', async () => {
    server.use(
      http.get('/visits', () => {
        return HttpResponse.json(mockVisits)
      }),
    )

    renderPage({ children: <VisitsPage /> })

    expect(screen.getByText('Consultas')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Agregar consulta/i }),
    ).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('Juan Pérez')).toBeInTheDocument()
    })
    expect(screen.getByText('María García')).toBeInTheDocument()
    expect(screen.getByText('Dr. García')).toBeInTheDocument()
    expect(screen.getByText('Dra. López')).toBeInTheDocument()
    expect(screen.getByText('Revisión general')).toBeInTheDocument()
    expect(screen.getByText('Vacunación')).toBeInTheDocument()
  })

  it('renders empty state when there are no visits', async () => {
    server.use(
      http.get('/visits', () => {
        return HttpResponse.json({
          data: [],
          pagination: {
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 1,
            hasNext: false,
            hasPrev: false,
          },
        })
      }),
    )

    renderPage({ children: <VisitsPage /> })

    await waitFor(() => {
      expect(
        screen.getByText('No hay consultas registradas'),
      ).toBeInTheDocument()
    })
    expect(
      screen.getByText('Agrega tu primera consulta para comenzar.'),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Agregar consulta/i }),
    ).toBeInTheDocument()
  })

  it('navigates to add visit page when clicking "Agregar consulta" button', async () => {
    const user = userEvent.setup()

    server.use(
      http.get('/visits', () => {
        return HttpResponse.json(mockVisits)
      }),
    )

    renderPage({ children: <VisitsPage /> })

    await waitFor(() => {
      expect(screen.getByText('Juan Pérez')).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: /Agregar consulta/i }))

    expect(mockNavigate).toHaveBeenCalledWith('/visits/add')
  })

  it('navigates to edit visit page when clicking edit button', async () => {
    const user = userEvent.setup()

    server.use(
      http.get('/visits', () => {
        return HttpResponse.json(mockVisits)
      }),
    )

    renderPage({ children: <VisitsPage /> })

    await waitFor(() => {
      expect(screen.getByText('Juan Pérez')).toBeInTheDocument()
    })

    const row = screen.getByText('Juan Pérez').closest('tr')
    const editButton = row!.querySelector('.lucide-pencil')?.closest('button')

    await user.click(editButton!)

    expect(mockNavigate).toHaveBeenCalledWith('/visits/1/edit')
  })

  it('navigates to visit details page when clicking details button', async () => {
    const user = userEvent.setup()

    server.use(
      http.get('/visits', () => {
        return HttpResponse.json(mockVisits)
      }),
    )

    renderPage({ children: <VisitsPage /> })

    await waitFor(() => {
      expect(screen.getByText('María García')).toBeInTheDocument()
    })

    const row = screen.getByText('María García').closest('tr')
    const detailsButton = row!.querySelector('.lucide-eye')?.closest('button')

    await user.click(detailsButton!)

    expect(mockNavigate).toHaveBeenCalledWith('/visits/2')
  })

  it('navigates to add visit page when clicking empty state button', async () => {
    const user = userEvent.setup()

    server.use(
      http.get('/visits', () => {
        return HttpResponse.json({
          data: [],
          pagination: {
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 1,
            hasNext: false,
            hasPrev: false,
          },
        })
      }),
    )

    renderPage({ children: <VisitsPage /> })

    await waitFor(() => {
      expect(
        screen.getByText('No hay consultas registradas'),
      ).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: /Agregar consulta/i }))

    expect(mockNavigate).toHaveBeenCalledWith('/visits/add')
  })

  it('deletes a visit successfully when confirming deletion', async () => {
    const user = userEvent.setup()
    let deleteRequestMade = false

    server.use(
      http.get('/visits', () => {
        return HttpResponse.json(mockVisits)
      }),
      http.delete('/visits/1', () => {
        deleteRequestMade = true
        return new HttpResponse(null, { status: 204 })
      }),
    )

    renderPage({ children: <VisitsPage /> })

    await waitFor(() => {
      expect(screen.getByText('Juan Pérez')).toBeInTheDocument()
    })

    const row = screen.getByText('Juan Pérez').closest('tr')
    const buttons = within(row!).getAllByRole('button')
    const deleteButton = buttons.find((btn) =>
      btn.classList.contains('text-destructive'),
    )

    await user.click(deleteButton!)

    await waitFor(() => {
      expect(screen.getByText('¿Eliminar consulta?')).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: /Eliminar/i }))

    await waitFor(() => {
      expect(deleteRequestMade).toBe(true)
    })
  })
})
