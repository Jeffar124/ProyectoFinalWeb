import React, { useEffect, useState } from 'react';
import { db } from '../../Firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import { format, startOfWeek, endOfWeek } from 'date-fns';
import { es } from 'date-fns/locale'; // Para nombres de meses/días en español
import {
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './GraficoIncidentes.css';

// Configuración estricta de tipos de incidencias requeridos
const TIPOS_VALIDOS = [
  'Infraestructura',
  'Electricidad',
  'Equipos Informaticos',
  'Mobiliario',
  'Aseo',
  'Areas Verdes',
  'Otros'
];

const COLORES_ESTADO = {
  'Reportado': '#ef4444',
  'En proceso': '#f59e0b',
  'Resuelto': '#10b981'
};

// Paleta fija para los 7 tipos de incidencias
const COLORES_TIPOS = ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#14b8a6', '#64748b'];

export default function GraficoIncidentes() {
  const [incidentes, setIncidentes] = useState([]);

  // Filtros de periodo
  const [tipoPeriodo, setTipoPeriodo] = useState('meses'); // dias, semanas, meses, anos
  const [valorPeriodo, setValorPeriodo] = useState('Todos');
  const [opcionesPeriodo, setOpcionesPeriodo] = useState([]);

  // KPIs y datos formateados
  const [totalIncidentes, setTotalIncidentes] = useState(0);
  const [datosEstado, setDatosEstado] = useState([]);
  const [datosTipo, setDatosTipo] = useState([]);
  // Datos para gráficos de barras y línea (basados en estado)
  const datosGrafico = datosEstado.map(d => ({ name: d.name, cantidad: d.cantidad }));

  useEffect(() => {
    const coleccionIncidentes = collection(db, 'incidentes');

    const desuscribir = onSnapshot(coleccionIncidentes, (querySnapshot) => {
      const lista = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        let fechaObjeto = null;

        if (data.fechaCreacion) {
          fechaObjeto = data.fechaCreacion.seconds
            ? new Date(data.fechaCreacion.seconds * 1000)
            : new Date(data.fechaCreacion);
        }

        lista.push({
          id: doc.id,
          ...data,
          fechaObjeto: isNaN(fechaObjeto) ? null : fechaObjeto
        });
      });

      setIncidentes(lista);
    }, (error) => {
      console.error("Error en tiempo real: ", error);
    });

    return () => desuscribir();
  }, []);

  // Recalcular las opciones del segundo selector cuando cambia el tipo de periodo o los datos
  useEffect(() => {
    const opcionesSet = new Set();

    incidentes.forEach(i => {
      if (!i.fechaObjeto) return;

      if (tipoPeriodo === 'dias') {
        opcionesSet.add(format(i.fechaObjeto, 'dd-MM-yyyy'));
      }
      else if (tipoPeriodo === 'semanas') {
        const inicio = format(startOfWeek(i.fechaObjeto), 'dd/MM');
        const fin = format(endOfWeek(i.fechaObjeto), 'dd/MM/yyyy');
        opcionesSet.add(`Semana ${inicio} al ${fin}`);
      }
      else if (tipoPeriodo === 'meses') {
        opcionesSet.add(format(i.fechaObjeto, 'MM-yyyy (MMMM)', { locale: es }));
      }
      else if (tipoPeriodo === 'anos') {
        opcionesSet.add(format(i.fechaObjeto, 'yyyy'));
      }
    });

    const opcionesOrdenadas = Array.from(opcionesSet).sort().reverse();
    setOpcionesPeriodo(['Todos', ...opcionesOrdenadas]);
    setValorPeriodo('Todos'); // Resetear al cambiar de magnitud temporal
  }, [incidentes, tipoPeriodo]);

  // Filtrar y calcular estadísticas (RF-11)
  useEffect(() => {
    const filtrados = incidentes.filter(i => {
      if (valorPeriodo === 'Todos') return true;
      if (!i.fechaObjeto) return false;

      if (tipoPeriodo === 'dias') {
        return format(i.fechaObjeto, 'dd-MM-yyyy') === valorPeriodo;
      }
      if (tipoPeriodo === 'semanas') {
        const inicio = format(startOfWeek(i.fechaObjeto), 'dd/MM');
        const fin = format(endOfWeek(i.fechaObjeto), 'dd/MM/yyyy');
        return `Semana ${inicio} al ${fin}` === valorPeriodo;
      }
      if (tipoPeriodo === 'meses') {
        return format(i.fechaObjeto, 'MM-yyyy (MMMM)', { locale: es }) === valorPeriodo;
      }
      if (tipoPeriodo === 'anos') {
        return format(i.fechaObjeto, 'yyyy') === valorPeriodo;
      }
      return true;
    });

    setTotalIncidentes(filtrados.length);

    // 1. Agrupación por Estado
    const conteoEstado = { 'Reportado': 0, 'En proceso': 0, 'Resuelto': 0 };
    filtrados.forEach(i => {
      const est = i.estado || 'Reportado';
      if (conteoEstado[est] !== undefined) conteoEstado[est]++;
    });
    setDatosEstado(Object.keys(conteoEstado).map(key => ({
      name: key,
      cantidad: conteoEstado[key],
      color: COLORES_ESTADO[key]
    })));


    // 2. Agrupación por Tipo (Asegurando tus categorías exactas)
    const conteoTipo = {};
    TIPOS_VALIDOS.forEach(t => conteoTipo[t] = 0); // Inicializar en 0

    filtrados.forEach(i => {
      let t = i.tipoIncidencia || 'Otros';
      if (conteoTipo[t] !== undefined) {
        conteoTipo[t]++;
      } else {
        conteoTipo['Otros']++;
      }
    });

    setDatosTipo(Object.keys(conteoTipo).map(key => ({
      name: key,
      cantidad: conteoTipo[key]
    })));

  }, [incidentes, tipoPeriodo, valorPeriodo]);

  return (
    <div className="seccion-reporte">

      {/* Panel de Control de Filtros e Impresión */}
      <div className="controles-reporte no-print">
        <div>

          <div>
            <label>Magnitud Temporal:</label>
            <select value={tipoPeriodo} onChange={(e) => setTipoPeriodo(e.target.value)}>
              <option value="dias">Días</option>
              <option value="semanas">Semanas</option>
              <option value="meses">Meses</option>
              <option value="anos">Años</option>
            </select>
          </div>

          <div>
            <label>Periodo Específico:</label>
            <select value={valorPeriodo} onChange={(e) => setValorPeriodo(e.target.value)}>
              {opcionesPeriodo.map(opc => (
                <option key={opc} value={opc}>{opc}</option>
              ))}
            </select>
          </div>

        </div>

        <button onClick={() => window.print()}>
          Imprimir Reporte
        </button>
      </div>

      {/* Vista de Impresión */}
      <div>
        <div>
          <h1>Reporte Estadístico del Sistema</h1>
          <p>Filtrado por: <strong>{tipoPeriodo.toUpperCase()}</strong> — Detalle: <strong>{valorPeriodo}</strong></p>
        </div>

        <div>
          <h3>Número Total de Incidentes</h3>
          <p>{totalIncidentes}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', minHeight: '350px' }}>

          {/* Gráfico 1: Por Estado */}
          <div className="tarjeta-grafico">
            <h3>Incidentes por Estado</h3>
            <div className="contenedor-recharts">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={datosEstado}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="cantidad" name="Incidentes">
                    {datosEstado.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráfico 2: Por Tipo */}
          <div className="tarjeta-grafico">
            <h3>Incidentes por Tipo</h3>
            <div className="contenedor-recharts">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={datosTipo}
                    dataKey="cantidad"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, cantidad }) => cantidad > 0 ? `${name}: ${cantidad}` : ''}
                  >
                    {datosTipo.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORES_TIPOS[index % COLORES_TIPOS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}