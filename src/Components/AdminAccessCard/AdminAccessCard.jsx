import React from 'react'
import { Link } from 'react-router-dom';
import { Grid, Card, CardActionArea, Box, Typography } from '@mui/material';

const AdminAccessCard = ({ acceso }) => {
    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card
                sx={{
                    height: '100%',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 20px -8px rgba(13, 35, 58, 0.12)',
                        borderColor: '#cbd5e1',
                    },
                }}
            >
                <CardActionArea
                    component={Link}
                    to={acceso.link}
                    sx={{
                        height: '100%',
                        p: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                    }}
                >
                    <Box
                        sx={{
                            p: 1.5,
                            borderRadius: '12px',
                            backgroundColor: acceso.bgColor,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 3,
                        }}
                    >
                        {acceso.icon}
                    </Box>

                    <Typography
                        variant="h6"
                        component="h3"
                        sx={{ fontWeight: 700, color: '#0d233a', mb: 1.5 }}
                    >
                        {acceso.titulo}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        {acceso.descripcion}
                    </Typography>
                </CardActionArea>
            </Card>
        </Grid>
    )
}

export default AdminAccessCard