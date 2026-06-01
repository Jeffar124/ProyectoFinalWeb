import React from 'react'
import {
    Container,
    Grid2 as Grid,
    Typography,
    Button,
    Box
} from '@mui/material';
import { Link } from 'react-router-dom';
import PasoCard from '../../Components/PasoCard/PasoCard';

const Home = () => {
    return (
        <Box sx={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
            {/* Cabecera Hero Universitaria */}
            <Box sx={{
                background: 'linear-gradient(135deg, #0d233a 0%, #1e3a8a 100%)',
                color: '#ffffff',
                py: { xs: 8, md: 12 },
                px: 4,
                textAlign: 'center',
                mb: 8,
                boxShadow: '0 10px 30px -10px rgba(13, 35, 58, 0.3)'
            }}>
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 800,
                        mb: 2,
                        fontSize: { xs: '2.25rem', md: '3.5rem' },
                        letterSpacing: '-0.025em'
                    }}
                >
                    Uniamazonia Reporta
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        color: '#93c5fd',
                        fontWeight: 400,
                        maxWidth: '650px',
                        mx: 'auto',
                        fontSize: { xs: '1rem', md: '1.25rem' },
                        lineHeight: 1.6
                    }}
                >
                    Plataforma oficial para la gestión, seguimiento y solución de incidencias en nuestro campus universitario.
                </Typography>
            </Box>

            <Container maxWidth="lg" sx={{ pb: 8 }}>
                <Typography
                    variant="h4"
                    align="center"
                    sx={{ fontWeight: 700, color: '#0d233a', mb: 1, letterSpacing: '-0.01em' }}
                >
                    Un proceso simple y transparente
                </Typography>

                <Typography
                    variant="body1"
                    align="center"
                    color="text.secondary"
                    sx={{ mb: 6, fontSize: '1.1rem' }}
                >
                    Tres pasos para contribuir al mejoramiento de nuestro entorno universitario.
                </Typography>

                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <PasoCard
                            numero="1"
                            titulo="Crear Reporte"
                            descripcion="Describe el problema, selecciona la categoría y adjunta evidencia fotográfica desde tu dispositivo."
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <PasoCard
                            numero="2"
                            titulo="Seguimiento"
                            descripcion="Recibe actualizaciones en tiempo real y haz el seguimiento del estado de tu reporte desde tu panel."
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <PasoCard
                            numero="3"
                            titulo="Resolución"
                            descripcion="El equipo técnico y de mantenimiento de la universidad atiende y soluciona la incidencia a la brevedad."
                        />
                    </Grid>
                </Grid>

                {/* Llamado a la Acción (CTA) */}
                <Box sx={{
                    textAlign: 'center',
                    mt: 8,
                    p: { xs: 4, md: 6 },
                    borderRadius: '16px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.05)'
                }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#0d233a', mb: 1 }}>
                        ¿Listo para mejorar tu campus?
                    </Typography>

                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mb: 4, maxWidth: '500px', mx: 'auto', fontSize: '0.95rem' }}
                    >
                        Ingresa con tu correo institucional y sé parte del bienestar de nuestra comunidad.
                    </Typography>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'center',
                        gap: 2,
                        maxWidth: '400px',
                        mx: 'auto'
                    }}>
                        <Button
                            component={Link}
                            to="/registro"
                            variant="contained"
                            size="large"
                            sx={{
                                backgroundColor: '#0d233a',
                                color: '#ffffff',
                                borderRadius: '10px',
                                fontWeight: 600,
                                textTransform: 'none',
                                py: 1.5,
                                flex: 1,
                                boxShadow: '0 4px 6px -1px rgba(13, 35, 58, 0.2)',
                                '&:hover': {
                                    backgroundColor: '#1e40af',
                                    boxShadow: '0 6px 12px -2px rgba(30, 64, 175, 0.2)'
                                }
                            }}
                        >
                            Registrarse
                        </Button>

                        <Button
                            component={Link}
                            to="/iniciosesion"
                            variant="outlined"
                            size="large"
                            sx={{
                                borderColor: '#0d233a',
                                color: '#0d233a',
                                borderRadius: '10px',
                                fontWeight: 600,
                                textTransform: 'none',
                                py: 1.5,
                                flex: 1,
                                borderWidth: '2px',
                                '&:hover': {
                                    borderColor: '#1e40af',
                                    backgroundColor: 'rgba(30, 64, 175, 0.04)',
                                    borderWidth: '2px'
                                }
                            }}
                        >
                            Iniciar Sesión
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default Home