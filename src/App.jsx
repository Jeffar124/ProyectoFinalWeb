import { useState } from 'react'
import './App.css'
import Registro from './Pages/Registro/Registro'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home.jsx'
import InicioSesion from './Pages/InicioSesion/InicioSesion.jsx'
import PanelUsuario from './Pages/PanelUsuario/PanelUsuario.jsx'
import RegistrarIncidente from './Pages/RegistrarIncidente/RegistrarIncidente.jsx'
import IncidentesUsuario from './Pages/IncidentesUsuario/IncidentesUsuario.jsx'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/registro' element={<Registro />} />
          <Route path='/iniciosesion' element={<InicioSesion />} />
          <Route path='/panelusuario' element={<PanelUsuario/>} />
          <Route path='/registrarincidente' element={<RegistrarIncidente/>} />
          <Route path='/incidentesusuario' element={<IncidentesUsuario/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
