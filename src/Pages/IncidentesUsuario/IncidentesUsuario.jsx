import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../Firebase/config'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { useAuth } from '../../Context/AuthProvider'
import SimpleSidebar from '../../Components/Sidebar/Sidebar'
import {
    Container, Box, Typography, Grid, Card, CardContent,
    CardMedia, Chip, CircularProgress, Button, Paper
} from '@mui/material'
import { AddCircleOutlineOutlined as AddCircleOutlineIcon, LocationOn as LocationOnIcon, CalendarToday as CalendarTodayIcon } from '@mui/icons-material';

const IncidentesUsuario = () => {
    const { user } = useAuth();
    const [incidentes, setIncidentes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const q = query(
            collection(db, "incidentes"),
            where("usuarioId", "==", user.uid)
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const list = [];
            querySnapshot.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() });
            });
            // Ordenar por fecha de creación en el cliente (más reciente primero)
            list.sort((a, b) => {
                const dateA = a.fechaCreacion?.seconds || 0;
                const dateB = b.fechaCreacion?.seconds || 0;
                return dateB - dateA;
            });
            setIncidentes(list);
            setLoading(false);
        }, (error) => {
            console.error("Error al escuchar incidentes:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    // Función para dar estilo y color al Badge según el estado
    const renderEstadoBadge = (estado) => {
        let colorConfig = {
            bg: '#fef3c7',
            text: '#b45309',
            label: 'Reportado'
        };

        if (estado === 'En Proceso') {
            colorConfig = {
                bg: '#dbeafe',
                text: '#1d4ed8',
                label: 'En Proceso'
            };
        } else if (estado === 'Resuelto') {
            colorConfig = {
                bg: '#d1fae5',
                text: '#047857',
                label: 'Resuelto'
            };
        }

        return (
            <Chip
                label={colorConfig.label}
                sx={{
                    backgroundColor: colorConfig.bg,
                    color: colorConfig.text,
                    fontWeight: 700,
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    height: '24px'
                }}
            />
        );
    };

    // Formatear Timestamp de Firebase a fecha legible
    const formatFecha = (timestamp) => {
        if (!timestamp) return 'Reciente';
        const date = new Date(timestamp.seconds * 1000);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <SimpleSidebar>
            <Container maxWidth="lg" sx={{ py: 2 }}>
                {/* Cabecera */}
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2, mb: 5 }}>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#0d233a', mb: 1, letterSpacing: '-0.025em' }}>
                            Mis Reportes
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Historial y estado de los incidentes que has reportado.
                        </Typography>
                    </Box>
                    <Button
                        component={Link}
                        to="/registrarincidente"
                        variant="contained"
                        startIcon={<AddCircleOutlineIcon />}
                        sx={{
                            backgroundColor: '#0d233a',
                            borderRadius: '10px',
                            textTransform: 'none',
                            fontWeight: 600,
                            py: 1.2,
                            px: 2.5,
                            boxShadow: '0 4px 6px -1px rgba(13, 35, 58, 0.2)',
                            '&:hover': {
                                backgroundColor: '#1e40af',
                                boxShadow: '0 6px 12px -2px rgba(30, 64, 175, 0.2)'
                            }
                        }}
                    >
                        Reportar Nuevo
                    </Button>
                </Box>

                {/* Contenido principal */}
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                        <CircularProgress sx={{ color: '#0d233a' }} />
                    </Box>
                ) : incidentes.length === 0 ? (
                    /* Estado Vacío */
                    <Paper
                        sx={{
                            p: 6,
                            textAlign: 'center',
                            borderRadius: '16px',
                            border: '1px dashed #cbd5e1',
                            boxShadow: 'none',
                            backgroundColor: '#f8fafc'
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#475569', mb: 1 }}>
                            No has registrado incidentes aún
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: '400px', mx: 'auto' }}>
                            Tu campus limpio y seguro empieza por ti. Si ves un daño en infraestructura, luminarias o equipos, repórtalo ahora.
                        </Typography>
                        <Button
                            component={Link}
                            to="/registrarincidente"
                            variant="outlined"
                            startIcon={<AddCircleOutlineIcon />}
                            sx={{
                                borderColor: '#0d233a',
                                color: '#0d233a',
                                borderWidth: '2px',
                                borderRadius: '10px',
                                textTransform: 'none',
                                fontWeight: 600,
                                '&:hover': {
                                    borderColor: '#1e40af',
                                    color: '#1e40af',
                                    backgroundColor: 'rgba(30, 64, 175, 0.04)',
                                    borderWidth: '2px'
                                }
                            }}
                        >
                            Reportar mi primer incidente
                        </Button>
                    </Paper>
                ) : (
                    /* Listado de Tarjetas */
                    <Grid container spacing={3}>
                        {incidentes.map((incidente) => (
                            <Grid item xs={12} sm={6} md={4} key={incidente.id}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        borderRadius: '16px',
                                        border: '1px solid #e2e8f0',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 12px 20px -8px rgba(13, 35, 58, 0.15)'
                                        }
                                    }}
                                >
                                    {incidente.imagen && (
                                        <CardMedia
                                            component="img"
                                            height="180"
                                            image={incidente.imagen}
                                            alt={incidente.tipoIncidencia}
                                            sx={{ objectFit: 'cover' }}
                                        />
                                    )}
                                    <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                            <Typography variant="subtitle2" sx={{ color: '#64748b', fontWeight: 600 }}>
                                                {incidente.tipoIncidencia}
                                            </Typography>
                                            {renderEstadoBadge(incidente.estado)}
                                        </Box>

                                        <Typography variant="body2" color="text.primary" sx={{ mb: 2.5, flexGrow: 1, lineHeight: 1.6 }}>
                                            {incidente.descripcion || 'Sin descripción adicional.'}
                                        </Typography>

                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, pt: 2, borderTop: '1px solid #f1f5f9' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <LocationOnIcon sx={{ color: '#64748b', fontSize: 16 }} />
                                                <Typography variant="caption" color="text.secondary" noWrap>
                                                    {incidente.ubicacion}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <CalendarTodayIcon sx={{ color: '#64748b', fontSize: 16 }} />
                                                <Typography variant="caption" color="text.secondary">
                                                    {formatFecha(incidente.fechaCreacion)}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </SimpleSidebar>
    );
};

export default IncidentesUsuario;