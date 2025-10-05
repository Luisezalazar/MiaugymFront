import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { AuthProvider } from './context/AuthContext'
import { registerSW } from 'virtual:pwa-register'
import { ThemeProvider } from './context/ThemeContext'

registerSW({
  onNeedRefresh() {
    console.log('Nueva versión disponible')
  },
  onOfflineReady() {
    console.log('App lista para usarse offline')
  }
})

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <AuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>
)