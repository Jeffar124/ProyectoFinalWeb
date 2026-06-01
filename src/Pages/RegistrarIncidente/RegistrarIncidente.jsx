import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import FormularioIncidente from '../../Components/FormularioIncidente/FormularioIncidente'
import { imageDB, db } from '../../Firebase/config'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuth } from '../../Context/AuthProvider';
import { serverTimestamp } from "firebase/firestore";
import SimpleSidebar from '../../Components/Sidebar/Sidebar';
import { Box, Container, Typography } from '@mui/material';

const RegistrarIncidente = () => {
  const auth = getAuth();
  const { user } = useAuth();

  const HandleRegistrarIncidente = async (tipoIncidencia, descripcion, ubicacion, imagen, coords) => {
    try {
      const imagenRef = ref(imageDB, `fotos/${imagen.name + v4()}`);
      await uploadBytes(imagenRef, imagen);
      const imgUrl = await getDownloadURL(imagenRef);

      await addDoc(collection(db, "incidentes"), {
        usuarioId: user.uid,
        tipoIncidencia: tipoIncidencia,
        descripcion: descripcion,
        imagen: imgUrl,
        ubicacion: ubicacion,
        coords: coords,
        fechaCreacion: serverTimestamp(),
        estado: 'Reportado'
      })
      alert("Incidente registrado con éxito.");
    } catch (error) {
      console.error("Error al registrar incidente:", error);
      alert("Hubo un error al registrar el incidente.");
    }

  }

  return (
    <SimpleSidebar>
      <Container maxWidth="md" sx={{ py: 2 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#0d233a', mb: 1, letterSpacing: '-0.025em' }}>
            Registrar Incidente
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Completa el siguiente formulario para reportar un problema en las instalaciones del campus.
          </Typography>
        </Box>

        <Box sx={{
          backgroundColor: '#ffffff',
          p: { xs: 3, md: 5 },
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.05)'
        }}>
          <FormularioIncidente onRegisterIncidenceSubmit={HandleRegistrarIncidente} />
        </Box>
      </Container>
    </SimpleSidebar>
  )
}

export default RegistrarIncidente