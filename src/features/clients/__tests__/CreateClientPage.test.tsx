import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'

import { server } from '@/test/setup'
import { renderPage } from '@/test/utils'

import CreateClientPage from '../pages/CreateClientPage'

const mockToastError = vi.fn()
const mockToastSuccess = vi.fn()
vi.mock('sonner', () => ({
  toast: {
    error: (...args: unknown[]) => mockToastError(...args),
    success: (...args: unknown[]) => mockToastSuccess(...args),
  },
}))

const mockNavigate = vi.fn()
vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>()
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

const mockCreatedClient = {
  id: '1',
  name: 'Juan Pérez',
  phone: '1234567890',
  address: 'Calle Durango 123',
  latitude: null,
  longitude: null,
  notes: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

describe('CreateClientPage', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('renders all form elements by default', () => {
    renderPage({ children: <CreateClientPage /> })

    expect(screen.getByText('Agregar Nuevo Cliente')).toBeInTheDocument()
    expect(screen.getByText(/Campos obligatorios/)).toBeInTheDocument()

    expect(screen.getByLabelText(/Nombre completo/i)).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText(/Ej\. Calle Durango 123/i),
    ).toBeInTheDocument()
    expect(screen.getByLabelText(/Teléfono/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Notas/i)).toBeInTheDocument()

    expect(screen.getByTestId('map')).toBeInTheDocument()

    expect(screen.getByRole('button', { name: /Guardar/i })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Cancelar/i }),
    ).toBeInTheDocument()
  })

  it('submits the form successfully with all fields filled in', async () => {
    const user = userEvent.setup()
    let requestBody: unknown

    server.use(
      http.post('/clients', async ({ request }) => {
        requestBody = await request.json()
        return HttpResponse.json(mockCreatedClient, { status: 201 })
      }),
    )

    renderPage({ children: <CreateClientPage /> })

    await user.type(screen.getByLabelText(/Nombre completo/i), 'Juan Pérez')
    await user.type(
      screen.getByPlaceholderText(/Ej\. Calle Durango 123/i),
      'Calle Durango 123',
    )
    await user.type(screen.getByLabelText(/Teléfono/i), '1234567890')
    await user.type(screen.getByLabelText(/Notas/i), 'Nota de prueba')

    await user.click(screen.getByRole('button', { name: /Guardar/i }))

    await waitFor(() => {
      expect(requestBody).toMatchObject({
        name: 'Juan Pérez',
        phone: '1234567890',
        address: 'Calle Durango 123',
        notes: 'Nota de prueba',
      })
    })

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith(-1))
    await waitFor(() => {
      expect(mockToastSuccess).toHaveBeenCalledWith(
        'Cliente creado exitosamente',
      )
    })
  })

  it('shows validation errors and makes no backend request when submitting an empty form', async () => {
    const user = userEvent.setup()
    let requestMade = false

    server.use(
      http.post('/clients', () => {
        requestMade = true
        return HttpResponse.json(mockCreatedClient)
      }),
    )

    renderPage({ children: <CreateClientPage /> })

    await user.click(screen.getByRole('button', { name: /Guardar/i }))

    await waitFor(() => {
      expect(screen.getByText('El nombre es obligatorio')).toBeInTheDocument()
    })
    expect(screen.getByText('La dirección es obligatoria')).toBeInTheDocument()
    expect(screen.getByText('El teléfono es obligatorio')).toBeInTheDocument()

    expect(requestMade).toBe(false)
  })

  it('shows an error toast when the backend request fails', async () => {
    const user = userEvent.setup()

    server.use(
      http.post('/clients', () => {
        return HttpResponse.json(
          { message: 'Internal server error' },
          { status: 500 },
        )
      }),
    )

    renderPage({ children: <CreateClientPage /> })

    await user.type(screen.getByLabelText(/Nombre completo/i), 'Juan Pérez')
    await user.type(
      screen.getByPlaceholderText(/Ej\. Calle Durango 123/i),
      'Calle Durango 123',
    )
    await user.type(screen.getByLabelText(/Teléfono/i), '1234567890')

    await user.click(screen.getByRole('button', { name: /Guardar/i }))

    await waitFor(() => {
      expect(mockToastError).toHaveBeenCalledWith(
        'Error al crear el cliente',
        expect.any(Object),
      )
    })
  })
})
