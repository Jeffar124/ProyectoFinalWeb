import { MenuItem, TextField } from '@mui/material'
import React, { useState } from 'react'

const FormularioIncidente = () => {
    const tipoIncidencias = [
        {
            value: 'Infraestructra'
        },
        {
            value: 'Electricidad'
        },
        {
            value: 'Equipos Informaticos'
        },
        {
            value: 'Mobiliario'
        },
        {
            value: 'Aseo'
        },
        {
            value: 'Areas Verdes'
        },
        {
            value: 'Otros'
        }
    ]
    const [tipo, setTipo] = useState('');
    return (
        <div>
            <form>
                <TextField
                    select
                    label="Tipo de Incidencia"
                    fullWidth
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                >
                    {tipoIncidencias.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.value}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    label="Descripcion"
                    multiline
                    rows={4}
                    fullWidth
                ></TextField>
                <TextField
                    label="Ubicacion"
                ></TextField>
            </form>
        </div>
    )
}

export default FormularioIncidente