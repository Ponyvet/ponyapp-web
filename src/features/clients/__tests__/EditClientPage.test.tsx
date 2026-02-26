import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'

import { server } from '@/test/setup'
import { renderPage } from '@/test/utils'

import EditClientPage from '../pages/EditClientPage'

const mockNavigate = vi.fn()
vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>()
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ clientId: '1' }),
  }
})

const mockClient = {
  id: '1',
  name: 'Juan Pérez',
  phone: '1234567890',
  address: 'Calle Durango 123',
  latitude: 19.4326,
  longitude: -99.1332,
  notes: 'Nota original',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

describe('EditClientPage', () => {
  beforeEach(() => {
    server.use(
      http.get('/clients/1', () => {
        return HttpResponse.json(mockClient)
      }),
    )
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('renders all form elements with client data', async () => {
    renderPage({ children: <EditClientPage /> })

    expect(screen.getByText('Cargando...')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('Editar Cliente')).toBeInTheDocument()
    })

    expect(screen.getByText(/Campos obligatorios/)).toBeInTheDocument()

    expect(screen.getByLabelText(/Nombre completo/i)).toHaveValue('Juan Pérez')
    expect(screen.getByDisplayValue('Calle Durango 123')).toBeInTheDocument()
    expect(screen.getByLabelText(/Teléfono/i)).toHaveValue('1234567890')
    expect(screen.getByLabelText(/Notas/i)).toHaveValue('Nota original')

    expect(screen.getByTestId('map')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Editar dirección/i }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: /Actualizar/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Cancelar/i }),
    ).toBeInTheDocument()
  })

  it('submits the form successfully with updated data', async () => {
    const user = userEvent.setup()
    let requestBody: unknown

    server.use(
      http.put('/clients/1', async ({ request }) => {
        requestBody = await request.json()
        return HttpResponse.json({
          ...mockClient,
          name: 'Juan Pérez Actualizado',
          phone: '0987654321',
          notes: 'Nota actualizada',
        })
      }),
    )

    renderPage({ children: <EditClientPage /> })

    await waitFor(() => {
      expect(screen.getByText('Editar Cliente')).toBeInTheDocument()
    })

    const nameInput = screen.getByLabelText(/Nombre completo/i)
    const phoneInput = screen.getByLabelText(/Teléfono/i)
    const notesInput = screen.getByLabelText(/Notas/i)

    await user.clear(nameInput)
    await user.type(nameInput, 'Juan Pérez Actualizado')

    await user.clear(phoneInput)
    await user.type(phoneInput, '0987654321')

    await user.clear(notesInput)
    await user.type(notesInput, 'Nota actualizada')

    await user.click(screen.getByRole('button', { name: /Actualizar/i }))

    await waitFor(() => {
      expect(requestBody).toMatchObject({
        name: 'Juan Pérez Actualizado',
        phone: '0987654321',
        address: 'Calle Durango 123',
        notes: 'Nota actualizada',
      })
    })

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith(-1))
  })

  it('shows validation errors and makes no backend request when submitting with empty required fields', async () => {
    const user = userEvent.setup()
    let requestMade = false

    server.use(
      http.put('/clients/1', () => {
        requestMade = true
        return HttpResponse.json(mockClient)
      }),
    )

    renderPage({ children: <EditClientPage /> })

    await waitFor(() => {
      expect(screen.getByText('Editar Cliente')).toBeInTheDocument()
    })

    const nameInput = screen.getByLabelText(/Nombre completo/i)
    const phoneInput = screen.getByLabelText(/Teléfono/i)

    await user.clear(nameInput)
    await user.clear(phoneInput)

    await user.click(screen.getByRole('button', { name: /Actualizar/i }))

    await waitFor(() => {
      expect(screen.getByText('El nombre es obligatorio')).toBeInTheDocument()
    })
    expect(screen.getByText('El teléfono es obligatorio')).toBeInTheDocument()

    expect(requestMade).toBe(false)
  })
})
