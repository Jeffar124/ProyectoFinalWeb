import React from 'react'
import { Link } from 'react-router-dom'

const PanelUsuario = () => {
  return (
    <div>
      <h1>PanelUsuario</h1>
      <Link to="/registrarincidente">Registrar Incidente</Link>
      <Link to="/incidentesusuario">Mis Reportes</Link>
      </div>

  )
}

export default PanelUsuario