import { render } from '@testing-library/react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { CartProvider } from '../context/CartContext'
import { ThemeProvider } from '../context/ThemeContext'

function customRender(ui, { route = '/', ...options } = {}) {
  function AllProviders({ children }) {
    return (
      <HelmetProvider>
        <MemoryRouter initialEntries={[route]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ThemeProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </ThemeProvider>
        </MemoryRouter>
      </HelmetProvider>
    )
  }

  return render(ui, { wrapper: AllProviders, ...options })
}

function renderWithBrowserRouter(ui, options = {}) {
  function Providers({ children }) {
    return (
      <HelmetProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ThemeProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
    )
  }

  return render(ui, { wrapper: Providers, ...options })
}

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react'
export { customRender as render, renderWithBrowserRouter }
