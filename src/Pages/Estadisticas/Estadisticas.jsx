import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Context/AuthProvider';

const Estadisticas = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleVolver = () => {
    if (user && user.rol === 'Usuario') {
      navigate('/panelusuario');
    } else if (user && user.rol === 'Administrador') {
      navigate('/paneladmin');
    }
  }

  return (
    <div>
      <h2>Estadisticas</h2>
      {/* -1 significa "retroceder un paso en el historial" */}
      {/*     <button onClick={()=> navigate(-1)}>
        volver
      </button> */}
      <button onClick={handleVolver}>
        volver
      </button>
    </div>
  )
}

export default Estadisticas