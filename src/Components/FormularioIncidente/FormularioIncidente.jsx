import { Box, Button, MenuItem, TextField, Typography } from '@mui/material'
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
            value: 'Infraestructura'
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
        if (!formulario.tipoIncidencia) {
            alert("Por favor selecciona un tipo de incidencia.");
            return;
        }
        if (!formulario.imagen) {
            alert("Por favor adjunta una fotografía como evidencia.");
            return;
        }
        onRegisterSubmit(formulario.tipoIncidencia, formulario.descripcion, formulario.ubicacion, formulario.imagen, formulario.coords);
    }

    const onRegisterSubmit = onRegisterIncidenceSubmit;

    return (
        <div>
            <form onSubmit={handelSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField
                        select
                        label="Tipo de Incidencia"
                        fullWidth
                        name='tipoIncidencia'
                        value={formulario.tipoIncidencia}
                        onChange={handleChange}
                        variant="outlined"
                        required
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '10px',
                            }
                        }}
                    >
                        {tipoIncidencias.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.value}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Descripción del Incidente"
                        multiline
                        rows={4}
                        fullWidth
                        name='descripcion'
                        value={formulario.descripcion}
                        onChange={handleChange}
                        variant="outlined"
                        required
                        placeholder="Describe detalladamente el problema observado..."
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '10px',
                            }
                        }}
                    />

                    <TextField
                        label="¿Dónde ocurrió la Incidencia?"
                        helperText="Ejemplo: Bloque A, salón 204, o zona verde junto a biblioteca"
                        fullWidth
                        name='ubicacion'
                        value={formulario.ubicacion}
                        onChange={handleChange}
                        variant="outlined"
                        required
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '10px',
                            }
                        }}
                    />

                    {/* Fila de Botones Auxiliares (Foto y Ubicación) */}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: 2
                    }}>
                        <Button
                            component="label"
                            variant='outlined'
                            startIcon={<PhotoCameraBackOutlinedIcon />}
                            sx={{
                                flex: 1,
                                borderRadius: '10px',
                                textTransform: 'none',
                                py: 1.2,
                                borderColor: '#cbd5e1',
                                color: '#475569',
                                '&:hover': {
                                    borderColor: '#1e40af',
                                    color: '#1e40af',
                                    backgroundColor: '#f1f5f9'
                                }
                            }}
                        >
                            {formulario.imagen ? "Cambiar Fotografía" : "Adjuntar Fotografía"}
                            <input
                                hidden
                                type='file'
                                accept='image/*'
                                capture='environment'
                                name='imagen'
                                onChange={handleImagenChange}
                            />
                        </Button>

                        <Button
                            variant='outlined'
                            startIcon={<AddLocationAltOutlinedIcon />}
                            onClick={getLocation}
                            name='coords'
                            value={formulario.coords}
                            sx={{
                                flex: 1,
                                borderRadius: '10px',
                                textTransform: 'none',
                                py: 1.2,
                                borderColor: '#cbd5e1',
                                color: '#475569',
                                '&:hover': {
                                    borderColor: '#1e40af',
                                    color: '#1e40af',
                                    backgroundColor: '#f1f5f9'
                                }
                            }}
                        >
                            {formulario.coords && formulario.coords.latitude !== 0 ? "Ubicación GPS Obtenida" : "Obtener Ubicación GPS"}
                        </Button>

                    </Box>

                    {/* Vista Previa de Imagen */}
                    {formulario.imagen && (
                        <Box sx={{
                            mt: 1,
                            textAlign: 'center',
                            p: 1.5,
                            border: '1px dashed #cbd5e1',
                            borderRadius: '12px',
                            backgroundColor: '#f8fafc'
                        }}>
                            <img
                                src={URL.createObjectURL(formulario.imagen)}
                                alt='Vista Previa'
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '260px',
                                    borderRadius: '8px',
                                    objectFit: 'contain'
                                }}
                            />
                        </Box>
                    )}

                    {/* Botón de Enviar */}
                    <Button
                        variant='contained'
                        type='submit'
                        fullWidth
                        sx={{
                            backgroundColor: '#0d233a',
                            color: '#ffffff',
                            borderRadius: '10px',
                            fontWeight: 600,
                            textTransform: 'none',
                            py: 1.5,
                            fontSize: '1rem',
                            mt: 2,
                            boxShadow: '0 4px 6px -1px rgba(13, 35, 58, 0.2)',
                            '&:hover': {
                                backgroundColor: '#1e40af',
                                boxShadow: '0 6px 12px -2px rgba(30, 64, 175, 0.2)'
                            }
                        }}
                    >
                        Registrar Incidente
                    </Button>
                </Box>
            </form>
        </div >
    )
}

export default FormularioIncidente