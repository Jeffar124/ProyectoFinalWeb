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
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '32px' }}>

            {/* Tarjeta KPI de Total de Usuarios */}
            <div style={{ 
                backgroundColor: '#ffffff', 
                padding: '24px', 
                borderRadius: '16px', 
                border: '1px solid #e2e8f0', 
                boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.02)',
                textAlign: 'center',
                maxWidth: '350px',
                margin: '0 auto',
                width: '100%'
            }}>
                <h3 style={{ margin: '0 0 8px 0', color: '#64748b', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                    Comunidad Registrada
                </h3>
                <div style={{ fontSize: '40px', fontWeight: 800, color: '#0d233a', lineHeight: 1 }}>
                    {total}
                </div>
                <p style={{ margin: '8px 0 0 0', color: '#64748b', fontSize: '13px', fontWeight: 500 }}>
                    Usuarios y administradores activos
                </p>
            </div>

            {/* Grid Responsivo de Gráficos */}
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                gap: '24px', 
                minHeight: '350px' 
            }}>

                {/* GRÁFICO DE BARRAS */}
                <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.02)' }}>
                    <h4 style={{ textAlign: 'center', marginBottom: '20px', color: '#0d233a', fontWeight: 700, fontSize: '16px' }}>Distribución por Rol</h4>
                    <ResponsiveContainer width="100%" height={260}>
                        <BarChart data={datosGrafico}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                            <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                            <Tooltip cursor={{ fill: '#f8fafc' }} />
                            <Legend iconType="circle" />
                            <Bar dataKey="cantidad" fill="#1e40af" radius={[6, 6, 0, 0]} name="Personas" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* GRÁFICO LINEAL */}
                <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.02)' }}>
                    <h4 style={{ textAlign: 'center', marginBottom: '20px', color: '#0d233a', fontWeight: 700, fontSize: '16px' }}>Tendencia de Roles</h4>
                    <ResponsiveContainer width="100%" height={260}>
                        <LineChart data={datosGrafico}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                            <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                            <Tooltip />
                            <Legend iconType="circle" />
                            <Line
                                type="monotone"
                                dataKey="cantidad"
                                stroke="#0ea5e9"
                                strokeWidth={3}
                                dot={{ r: 6, stroke: '#0ea5e9', strokeWidth: 2, fill: '#fff' }}
                                activeDot={{ r: 8 }}
                                name="Personas"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </div>
    );
}