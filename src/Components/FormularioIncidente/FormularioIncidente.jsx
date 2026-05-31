import { Box, Button, MenuItem, TextField } from '@mui/material'
import React, { useState } from 'react'
import PhotoCameraBackOutlinedIcon from '@mui/icons-material/PhotoCameraBackOutlined';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';

const FormularioIncidente = ({ onRegisterIncidenceSubmit }) => {
    const [formulario, setFormulario] = useState({
        tipoIncidencia: "",
        descripcion: "",
        ubicacion: "",
        imagen: null,
        coords: {
            latitude: 0,
            longitude: 0,
        }
    })
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

    const handleChange = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        });
    };

    const handleImagenChange = (e) => {
        const archivo = e.target.files[0];

        if (archivo) {
            setFormulario({
                ...formulario,
                imagen: archivo,
            });
        }
    };
    const getLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            const { latitude, longitude } = position.coords;
            setFormulario({
                ...formulario,
                coords: {
                    latitude: latitude,
                    longitude: longitude,
                }
            });
        },
            (error) => {
                console.error(error);
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        alert("Debes permitir el acceso a la ubicación.");
                        break;

                    case error.POSITION_UNAVAILABLE:
                        alert("La ubicación no está disponible.");
                        break;

                    case error.TIMEOUT:
                        alert("Se agotó el tiempo para obtener la ubicación.");
                        break;

                    default:
                        alert("Ocurrió un error al obtener la ubicación.");
                }
            }
        );
    }

    const handelSubmit = async (e) => {
        e.preventDefault();
        onRegisterIncidenceSubmit(formulario.tipoIncidencia, formulario.descripcion, formulario.ubicacion, formulario.imagen, formulario.coords);
    }

    return (
        <div>
            <form onSubmit={handelSubmit}>
                <TextField
                    select
                    label="Tipo de Incidencia"
                    fullWidth
                    name='tipoIncidencia'
                    value={formulario.tipoIncidencia}
                    onChange={handleChange}
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
                    name='descripcion'
                    value={formulario.descripcion}
                    onChange={handleChange}
                ></TextField>
                <TextField
                    label="¿Donde Ocurrio la Incidencia?"
                    helperText="Ejemplo: Bloque A, salón 204"
                    fullWidth
                    name='ubicacion'
                    value={formulario.ubicacion}
                    onChange={handleChange}
                ></TextField>
                <Button
                    component="label"
                    variant='outlined'
                    startIcon={<PhotoCameraBackOutlinedIcon />}
                >
                    Adjuntar Fotografia
                    <input
                        hidden
                        type='file'
                        accept='image/*'
                        capture='environment'
                        name='imagen'
                        onChange={handleImagenChange}
                    />
                </Button>
                {formulario.imagen && (
                    <Box mt={2}>
                        <img
                            src={URL.createObjectURL(formulario.imagen)}
                            alt='Vista Previa'
                            width={300}
                        />
                    </Box>
                )}
                <Button
                    variant='outlined'
                    startIcon={<AddLocationAltOutlinedIcon />}
                    name='coords'
                    value={formulario.coords}
                    onChange={getLocation}
                >
                    Obtener Ubicacion GPS
                </Button>
                <Button
                    variant='contained'
                    type='submit'
                >
                    Registrar Incidencia
                </Button>
            </form>
        </div >
    )
}

export default FormularioIncidente