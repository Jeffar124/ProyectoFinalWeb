import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

if (!navigator.geolocation) {
  alert('Su navegador no soporta geolocalizacion');
  throw new Error('Su navegador no soporta geolocalizacion');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
