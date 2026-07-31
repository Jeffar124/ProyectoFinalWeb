import React from 'react'
import Grid from '@mui/material/Grid';
import IncidenteCard from '../IncidenteCard/IncidenteCard';
import { Link } from 'react-router-dom';

const IncidenteList = ({ incidentes, renderEstadoBadge, formatFecha }) => {
    const url = `/detalleincidente/${incidente.id}`;
    return (
        <Grid container spacing={3}>
            {incidentes.map((incidente) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={incidente.id} >
                    {console.log(url)
                    }
                    <Link to={URL} key={incidente.id}>
                        <IncidenteCard
                            incidente={incidente}
                            renderEstadoBadge={renderEstadoBadge}
                            formatFecha={formatFecha}
                            url={url}
                        />
                    </Link>
                </Grid>
            ))}
        </Grid>
    )
}

export default IncidenteList