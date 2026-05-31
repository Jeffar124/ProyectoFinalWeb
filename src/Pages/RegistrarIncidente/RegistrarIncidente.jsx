import React from 'react'
import { Link } from 'react-router-dom'
import FormularioIncidente from '../../Components/FormularioIncidente/FormularioIncidente'

const RegistrarIncidente = () => {

  return (
    <div>
      <h2>Registrar Nuevo Reporte</h2>
      <FormularioIncidente />
      <Link to='/panelusuario'>atrás</Link>
    </div>
  )
}

export default RegistrarIncidente