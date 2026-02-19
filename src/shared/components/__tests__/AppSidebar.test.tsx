import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppSidebar } from '../AppSidebar'
import { SidebarProvider } from '@/shared/components/ui/sidebar'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
})

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'sidebar.title': 'PonyVet',
        'sidebar.subtitle': 'Clínica Veterinaria',
      }
      return translations[key] || key
    },
  }),
}))

const mockUseProfile = vi.fn()
vi.mock('@/features/auth/queries/useProfile', () => ({
  default: () => mockUseProfile(),
}))

const mockAuthState = {
  isAuth: false,
  session: null as { email: string; name: string } | null,
  setAuth: vi.fn(),
  setSession: vi.fn(),
}
vi.mock('@/features/auth/store/authStore', () => ({
  useAuthStore: (selector?: (state: typeof mockAuthState) => unknown) =>
    selector ? selector(mockAuthState) : mockAuthState,
}))

const renderAppSidebar = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <SidebarProvider>
          <AppSidebar />
        </SidebarProvider>
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

describe('AppSidebar', () => {
  beforeEach(() => {
    mockUseProfile.mockReset()
    mockAuthState.isAuth = false
    mockAuthState.session = null
  })

  it('renders the sidebar with title and subtitle', () => {
    mockUseProfile.mockReturnValue({ isSuccess: false, data: null })

    renderAppSidebar()

    expect(screen.getByText('PonyVet')).toBeInTheDocument()
    expect(screen.getByText('Clínica Veterinaria')).toBeInTheDocument()
  })

  it('renders navigation menu items', () => {
    mockUseProfile.mockReturnValue({ isSuccess: false, data: null })

    renderAppSidebar()

    expect(screen.getByText('Clientes')).toBeInTheDocument()
    expect(screen.getByText('Cartillas Médicas')).toBeInTheDocument()
    expect(screen.getByText('Medicamentos')).toBeInTheDocument()
  })

  it('renders NavUser when user is authenticated', () => {
    mockAuthState.isAuth = true
    mockUseProfile.mockReturnValue({
      isSuccess: true,
      data: { email: 'test@example.com', name: 'Test User' },
    })

    renderAppSidebar()

    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('test@example.com')).toBeInTheDocument()
  })

  it('does not render NavUser when user is not authenticated', () => {
    mockUseProfile.mockReturnValue({ isSuccess: false, data: null })

    renderAppSidebar()

    expect(screen.queryByText('test@example.com')).not.toBeInTheDocument()
  })

  it('renders home link in the header', () => {
    mockUseProfile.mockReturnValue({ isSuccess: false, data: null })

    renderAppSidebar()

    const homeLink = screen.getByRole('link', { name: /ponyvet/i })
    expect(homeLink).toHaveAttribute('href', '/')
  })
})
