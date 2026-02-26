/**
 * Test setup file that configures the testing environment.
 *
 * Initializes:
 * - MSW (Mock Service Worker) server for API mocking
 * - Jest DOM matchers for enhanced DOM assertions
 * - Window.matchMedia polyfill for media query testing
 * - Mocks for @vis.gl/react-google-maps and Map components
 * - Global test lifecycle hooks (beforeAll, afterEach, afterAll)
 *
 * @module test/setup
 */
import * as matchers from '@testing-library/jest-dom/matchers'
import { setupServer, type SetupServer } from 'msw/node'

export const server: SetupServer = setupServer()

expect.extend(matchers)

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

vi.mock('@vis.gl/react-google-maps', () => ({
  useMapsLibrary: vi.fn().mockReturnValue(null),
}))

vi.mock('@/shared/components/Map', () => ({
  default: () => <div data-testid="map" />,
}))

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
