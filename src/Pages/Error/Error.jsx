import React from 'react'
import '../Error/Error.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Error = () => {
    const [seg, setSeg] = useState(5)
    const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => {
            setSeg(seg - 1)
            if (seg === 1) {
                navigate('/')
            }
        }, 1000)
        return () => clearTimeout(timer)
    }, [seg])

    return (
        <div className='error-page'>
            <div className='error-card'>

                {/* Código de error */}
                <h1 className='error-code'>404</h1>

                {/* Mensaje */}
                <p className='error-title'>Página no encontrada</p>
                <p className='error-subtitle'>
                    La ruta que intentas acceder no existe o ha sido movida.<br />
                    Serás redireccionado al inicio automáticamente.
                </p>

                {/* Contador de redirección */}
                <div className='error-redirect'>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 12a9 9 0 1018 0A9 9 0 003 12zm9-4v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Redireccionando en
                    <span className='error-countdown'>{seg}</span>
                </div>
            </div>
        </div>
    )
}

export default Error