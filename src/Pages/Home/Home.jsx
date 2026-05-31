import React from 'react'
import {
    Container,
    Grid,
    Typography,
    Button,
    Box
} from '@mui/material';
import { Link } from 'react-router-dom';
import PasoCard from '../../Components/PasoCard/PasoCard';

const Home = () => {
    return (
        <Container sx={{ py: 8 }}>
            <Typography
                variant="h3"
                align="center"
                gutterBottom
            >
                Un proceso simple y transparente
            </Typography>

            <Typography
                variant="h6"
                align="center"
                color="text.secondary"
                sx={{ mb: 6 }}
            >
                Tres pasos para contribuir al mejoramiento de nuestro entorno universitario.
            </Typography>

            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <PasoCard
                        numero="1"
                        titulo="Crear Reporte"
                        descripcion="Describe el problema, selecciona la categoría y adjunta evidencia."
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <PasoCard
                        numero="2"
                        titulo="Seguimiento"
                        descripcion="Recibe notificaciones en tiempo real sobre el estado del reporte."
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <PasoCard
                        numero="3"
                        titulo="Resolución"
                        descripcion="El equipo de mantenimiento atiende y soluciona la incidencia."
                    />
                </Grid>
            </Grid>

            <Box sx={{ textAlign: 'center', mt: 8 }}>
                <Typography variant="h4" gutterBottom>
                    ¿Listo para mejorar tu campus?
                </Typography>

                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                >
                    Ingresa con tu correo institucional y sé parte del bienestar de nuestra comunidad.
                </Typography>

                <Button
                    component={Link}
                    to="/registro"
                    variant="contained"
                    size="large"
                >
                    Registrarse
                </Button>

                <Button
                    component={Link}
                    to="/iniciosesion"
                    variant="contained"
                    size="large"
                    sx={{ marginLeft: 20 }}
                >
                    Iniciar Sesion
                </Button>
            </Box>
        </Container>
    );
}

export default Home