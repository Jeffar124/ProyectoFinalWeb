import React, { useEffect, useState } from 'react'
import DetalleIncidenteCard from '../../Components/DetalleIncidenteCard/DetalleIncidenteCard'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../Firebase/config';
import { renderEstadoBadge, formatFecha } from '../../utils/helpers';
import Loading from '../../Components/Loading/Loading';

const DetalleIncidente = () => {
    const { id } = useParams()
    const [incidente, setIncidente] = useState(null)

    useEffect(() => {
        const obtenerIncidente = async () => {
            const docRef = doc(db, "incidentes", id)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                setIncidente({ id: docSnap.id, ...docSnap.data() })
                console.log({ id: docSnap.id, ...docSnap.data() });

            }
        }
        obtenerIncidente()
    }, [id])

    if (!incidente) {
        return <Loading />
    }

    return (
        <div>
            <DetalleIncidenteCard
                incidente={incidente}
                renderEstadoBadge={renderEstadoBadge}
                formatFecha={formatFecha}
            />
        </div>
    )
}

export default DetalleIncidente