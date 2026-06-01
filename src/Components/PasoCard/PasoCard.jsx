import React from 'react'
import { Card, CardContent, Typography, Box } from '@mui/material';

const PasoCard = ({ numero, titulo, descripcion }) => {
    return (
        <Card 
            sx={{ 
                height: '100%', 
                borderRadius: '16px', 
                border: '1px solid #e2e8f0', 
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 20px -8px rgba(13, 35, 58, 0.15)'
                }
            }}
        >
            <CardContent sx={{ p: 4 }}>
                <Box 
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        backgroundColor: '#eff6ff',
                        color: '#1e40af',
                        fontWeight: 700,
                        fontSize: '1.25rem',
                        mb: 3
                    }}
                >
                    {numero}
                </Box>

                <Typography
                    variant="h6"
                    component="h3"
                    sx={{ fontWeight: 700, color: '#0d233a', mb: 1.5 }}
                >
                    {titulo}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.6 }}
                >
                    {descripcion}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default PasoCard