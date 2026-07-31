import React, { useEffect, useState } from 'react'
import DetalleIncidenteCard from '../../Components/DetalleIncidenteCard/DetalleIncidenteCard'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../Firebase/config';
import { renderEstadoBadge, formatFecha } from '../../utils/helpers';
import Loading from '../../Components/Loading/Loading';
import SimpleSidebar from '../../Components/Sidebar/Sidebar';
import { Box, Container, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuth } from '../../Context/AuthProvider';

const DetalleIncidente = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()
    const [incidente, setIncidente] = useState(null)
    const url = window.location.href;


    useEffect(() => {
        const obtenerIncidente = async () => {
            const docRef = doc(db, "incidentes", id)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                setIncidente({ id: docSnap.id, ...docSnap.data() })
            }
        }
        console.log(url);
        
        obtenerIncidente()
    }, [id])

    const handleVolver = () => {
        if (user && user.rol === 'Administrador') {
            navigate('/incidentesadmin');
        } else {
            navigate('/incidentesusuario');
        }
    }

    if (!incidente) {
        return <Loading />
    }

    return (
        <SimpleSidebar>
            <Container maxWidth="md" sx={{ py: 2 }}>
                {/* Cabecera */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        gap: 2,
                        mb: 4,
                    }}
                >
                    <Box>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                color: '#0d233a',
                                mb: 0.5,
                                letterSpacing: '-0.025em',
                            }}
                        >
                            Detalle del Incidente
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Información completa del reporte seleccionado.
                        </Typography>
                    </Box>
                    <Button
                        onClick={handleVolver}
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        sx={{
                            borderColor: '#cbd5e1',
                            color: '#475569',
                            borderRadius: '10px',
                            textTransform: 'none',
                            fontWeight: 600,
                            py: 1,
                            px: 2,
                            '&:hover': {
                                borderColor: '#1e40af',
                                color: '#1e40af',
                                backgroundColor: '#f1f5f9',
                            },
                        }}
                    >
                        Volver
                    </Button>
                </Box>

                {/* Tarjeta de detalle */}
                <DetalleIncidenteCard
                    incidente={incidente}
                    renderEstadoBadge={renderEstadoBadge}
                    formatFecha={formatFecha}
                    url={url}
                />
            </Container>
        </SimpleSidebar>
    )
}

export default DetalleIncidente