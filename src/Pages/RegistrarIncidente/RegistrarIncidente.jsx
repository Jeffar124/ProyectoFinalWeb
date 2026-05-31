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
    } catch (error) {
      console.error("Error al registrar incidente:", error);
    }

  }

  return (
    <div>
      <h2>Registrar Nuevo Reporte</h2>
      <FormularioIncidente onRegisterIncidenceSubmit={HandleRegistrarIncidente} />
      <Link to='/panelusuario'>atrás</Link>
    </div>
  )
}

export default RegistrarIncidente