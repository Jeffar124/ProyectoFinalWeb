import React, { useEffect, useState } from 'react';
import { db } from '../../Firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import {
    BarChart, Bar,
    LineChart, Line,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function GraficoIncidentes() {
    const [datosGrafico, setDatosGrafico] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        // 1. Referenciamos la colección
        const coleccionUsuarios = collection(db, 'usuarios');

        // 2. Escuchamos en tiempo real con onSnapshot
        const desuscribir = onSnapshot(coleccionUsuarios, (querySnapshot) => {
            const listaUsuarios = [];

            querySnapshot.forEach((doc) => {
                listaUsuarios.push(doc.data());
            });

            // Procesamos los datos y actualizamos los estados
            procesarRoles(listaUsuarios);
            setTotal(listaUsuarios.length);
        }, (error) => {
            console.error("Error en tiempo real: ", error);
        });

        // 3. LIMPIEZA (Mucha atención aquí):
        // Cuando el componente se desmonte (te vayas a otra página), 
        // cancelamos la escucha para no consumir memoria ni lecturas de Firebase de más.
        return () => desuscribir();
    }, []);

    const procesarRoles = (usuarios) => {
        // Inicializamos el conteo
        const conteo = {
            Usuario: 0,
            Administrador: 0
        };

        // Recorremos los usuarios y sumamos según el rol
        usuarios.forEach(u => {
            if (u.rol === 'Usuario') conteo.Usuario++;
            if (u.rol === 'Administrador') conteo.Administrador++;
        });

        // Convertimos a formato Recharts
        const dataFormateada = [
            { name: 'Usuarios', cantidad: conteo.Usuario },
            { name: 'Administradores', cantidad: conteo.Administrador },
        ];

        setDatosGrafico(dataFormateada);
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '40px' }}>

            <div style={{ textAlign: 'center' }}>
                <h2 style={{ color: '#333' }}>Prueba de Estadísticas: Roles de Usuarios</h2>
                <p>Total de usuarios registrados: <strong>{total}</strong></p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', minHeight: '350px' }}>

                {/* GRÁFICO DE BARRAS */}
                <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <h4 style={{ textAlign: 'center' }}>Distribución (Barras)</h4>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={datosGrafico}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="cantidad" fill="#4f46e5" radius={[4, 4, 0, 0]} name="Cant. Personas" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* GRÁFICO LINEAL */}
                <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <h4 style={{ textAlign: 'center' }}>Tendencia de Roles (Lineal)</h4>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={datosGrafico}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="cantidad"
                                stroke="#10b981"
                                strokeWidth={3}
                                dot={{ r: 6 }}
                                name="Cant. Personas"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </div>
    );
}