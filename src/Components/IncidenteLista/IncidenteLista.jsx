import React from 'react'
import { Grid2 as Grid } from '@mui/material';
import IncidenteCard from '../IncidenteCard/IncidenteCard';
import { Link } from 'react-router-dom';

const IncidenteList = ({ incidentes, renderEstadoBadge, formatFecha }) => {
    return (
        <Grid container spacing={3}>
            {incidentes.map((incidente) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={incidente.id} >
                    <Link to={`/detalleincidente/${incidente.id}`} key={incidente.id}>
                        <IncidenteCard
                            incidente={incidente}
                            renderEstadoBadge={renderEstadoBadge}
                            formatFecha={formatFecha}
                        />
                    </Link>
                </Grid>
            ))}
        </Grid>
    )
}

export default IncidenteList