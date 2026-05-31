import React from 'react'
import { Card, CardContent, Typography } from '@mui/material';

const PasoCard = ({ numero, titulo, descripcion }) => {
    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Typography
                    variant="h4"
                    color="primary"
                    gutterBottom
                >
                    {numero}
                </Typography>

                <Typography
                    variant="h6"
                    gutterBottom
                >
                    {titulo}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    {descripcion}
                </Typography>
            </CardContent>
        </Card>

    )
}

export default PasoCard