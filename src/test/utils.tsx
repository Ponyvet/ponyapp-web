import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import type { PropsWithChildren } from 'react'
import { MemoryRouter } from 'react-router'

/**
 * Renders a React component with testing providers.
 *
 * @param props - The props object containing children to render
 * @param props.children - The React components to render within the test environment
 * @returns The render result from React Testing Library
 *
 * @remarks
 * This utility function wraps components with:
 * - QueryClientProvider (with retries disabled for queries and mutations)
 * - MemoryRouter (for routing support in tests)
 *
 * @example
 * ```tsx
 * const { getByText } = renderPage({ children: <MyComponent /> });
 * ```
 */
export const renderPage = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>,
  )
}
