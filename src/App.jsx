import { useState } from 'react'
import './App.css'
import Registro from './Pages/Registro/Registro'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home.jsx'
import InicioSesion from './Pages/InicioSesion/InicioSesion.jsx'
import PanelUsuario from './Pages/PanelUsuario/PanelUsuario.jsx'
import RegistrarIncidente from './Pages/RegistrarIncidente/RegistrarIncidente.jsx'
import IncidentesUsuario from './Pages/IncidentesUsuario/IncidentesUsuario.jsx'
import PanelAdmin from './Pages/PanelAdmin/PanelAdmin.jsx'
import { AuthProvider } from './Context/AuthProvider.jsx'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx'
import Estadisticas from './Pages/Estadisticas/Estadisticas.jsx'

function App() {

  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/registro' element={<Registro />} />
            <Route path='/iniciosesion' element={<InicioSesion />} />

            <Route element={<ProtectedRoute allowedRoles={["Usuario"]} />}>
              <Route path='/panelusuario' element={<PanelUsuario />} />
              <Route path='/registrarincidente' element={<RegistrarIncidente />} />
              <Route path='/incidentesusuario' element={<IncidentesUsuario />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["Usuario", "Administrador"]} />}>
              <Route path='/estadisticas' element={<Estadisticas />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["Administrador"]} />}>
              <Route path='/paneladmin' element={<PanelAdmin />} />
            </Route>

          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
