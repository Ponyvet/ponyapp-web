import { BrowserRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { APIProvider } from '@vis.gl/react-google-maps'

import Router from './Router'
import { ThemeProvider } from '@/shared/components/ThemeProvider'

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: false,
    },
  },
})

const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ponyvet-ui-theme">
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        <Toaster />
      </APIProvider>
    </ThemeProvider>
  )
}

export default App
