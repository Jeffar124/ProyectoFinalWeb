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
import Loading from '../../Components/Loading/Loading'
import IncidenteEstadoVacio from '../../Components/IncidenteEstadoVacio/IncidenteEstadoVacio'
import IncidenteLista from '../../Components/IncidenteLista/IncidenteLista'
import { renderEstadoBadge, formatFecha } from '../../utils/helpers';


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
                    <Loading />
                ) : incidentes.length === 0 ? (
                    /* Estado Vacío */
                    <IncidenteEstadoVacio />
                ) : (
                    /* Listado de Tarjetas */
                    <IncidenteLista incidentes={incidentes} renderEstadoBadge={renderEstadoBadge} formatFecha={formatFecha} />
                )}
            </Container>
        </SimpleSidebar>
    );
};

export default IncidentesUsuario;