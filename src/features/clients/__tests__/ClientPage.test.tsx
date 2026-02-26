import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'

import { server } from '@/test/setup'
import { renderPage } from '@/test/utils'

import ClientPage from '../pages/ClientPage'

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
    notes: 'Cliente frecuente',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

describe('ClientPage', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('renders correctly with client data', async () => {
    server.use(
      http.get('/clients', () => {
        return HttpResponse.json(mockClients)
      }),
    )

    renderPage({ children: <ClientPage /> })

    expect(screen.getByText('Clientes')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Agregar/i })).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('Juan Pérez')).toBeInTheDocument()
    })
    expect(screen.getByText('María García')).toBeInTheDocument()
    expect(screen.getByText('123-456-7890')).toBeInTheDocument()
    expect(screen.getByText('098-765-4321')).toBeInTheDocument()
    expect(screen.getByText('Calle Durango 123')).toBeInTheDocument()
    expect(screen.getByText('Av. Reforma 456')).toBeInTheDocument()
  })

  it('renders empty state when there are no clients', async () => {
    server.use(
      http.get('/clients', () => {
        return HttpResponse.json([])
      }),
    )

    renderPage({ children: <ClientPage /> })

    await waitFor(() => {
      expect(screen.getByText('No hay clientes aún')).toBeInTheDocument()
    })
    expect(
      screen.getByText(
        'Agrega tu primer cliente para comenzar a gestionar sus cartillas.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Agregar primer cliente/i }),
    ).toBeInTheDocument()
  })

  it('navigates to add client page when clicking "Agregar" button', async () => {
    const user = userEvent.setup()

    server.use(
      http.get('/clients', () => {
        return HttpResponse.json(mockClients)
      }),
    )

    renderPage({ children: <ClientPage /> })

    await waitFor(() => {
      expect(screen.getByText('Juan Pérez')).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: /Agregar/i }))

    expect(mockNavigate).toHaveBeenCalledWith('/clients/add')
  })

  it('navigates to edit client page when clicking edit button', async () => {
    const user = userEvent.setup()

    server.use(
      http.get('/clients', () => {
        return HttpResponse.json(mockClients)
      }),
    )

    renderPage({ children: <ClientPage /> })

    await waitFor(() => {
      expect(screen.getByText('Juan Pérez')).toBeInTheDocument()
    })

    const row = screen.getByText('Juan Pérez').closest('tr')
    const editButton = row!.querySelector('.lucide-pencil')?.closest('button')

    await user.click(editButton!)

    expect(mockNavigate).toHaveBeenCalledWith('/clients/1/edit')
  })

  it('navigates to add client page when clicking "Agregar primer cliente" button', async () => {
    const user = userEvent.setup()

    server.use(
      http.get('/clients', () => {
        return HttpResponse.json([])
      }),
    )

    renderPage({ children: <ClientPage /> })

    await waitFor(() => {
      expect(screen.getByText('No hay clientes aún')).toBeInTheDocument()
    })

    await user.click(
      screen.getByRole('button', { name: /Agregar primer cliente/i }),
    )

    expect(mockNavigate).toHaveBeenCalledWith('/clients/add')
  })

  it('deletes a client successfully when confirming deletion', async () => {
    const user = userEvent.setup()
    let deleteRequestMade = false

    server.use(
      http.get('/clients', () => {
        return HttpResponse.json(mockClients)
      }),
      http.delete('/clients/1', () => {
        deleteRequestMade = true
        return new HttpResponse(null, { status: 204 })
      }),
    )

    renderPage({ children: <ClientPage /> })

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
      expect(
        screen.getByText('¿Estás absolutamente seguro?'),
      ).toBeInTheDocument()
    })
    expect(
      screen.getByText(
        /¿Estás seguro de que deseas eliminar a Juan Pérez\?/,
      ),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /Eliminar/i }))

    await waitFor(() => {
      expect(deleteRequestMade).toBe(true)
    })
  })
})
