import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../Firebase/config";
import {
  collection,
  onSnapshot,
  writeBatch,
  doc,
  deleteField,
} from "firebase/firestore";
import SimpleSidebar from "../../Components/Sidebar/Sidebar";
import { useAuth } from "../../Context/AuthProvider";
// Componentes de Material UI
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Button,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
} from "@mui/material";
// Iconos de Material UI
import {
  Visibility as VisibilityIcon,
  Update as UpdateIcon,
} from "@mui/icons-material";
// DataGrid de MUI
import { DataGrid } from "@mui/x-data-grid";

const IncidentesAdmin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [incidentes, setIncidentes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados para la selección y actualización masiva
  const [seleccionados, setSeleccionados] = useState([]);
  const [nuevoEstado, setNuevoEstado] = useState("");
  const [updating, setUpdating] = useState(false);

  // Clave para forzar el reseteo limpio del DataGrid tras el guardado
  const [gridKey, setGridKey] = useState(0);

  // 1. Escuchar la colección completa en tiempo real
  useEffect(() => {
    if (!user) return;
    const coleccionRef = collection(db, "incidentes");
    const unsubscribe = onSnapshot(
      coleccionRef,
      (querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        list.sort((a, b) => {
          const dateA = a.fechaCreacion?.seconds || 0;
          const dateB = b.fechaCreacion?.seconds || 0;
          return dateB - dateA;
        });
        setIncidentes(list);
        setLoading(false);
      },
      (error) => {
        console.error("Error al escuchar incidentes:", error);
        setLoading(false);
      },
    );
    return () => unsubscribe();
  }, [user]);

  // 2. Componente visual para los badges de estado
  const renderEstadoBadge = (estado) => {
    let colorConfig = {
      bg: "#fef3c7",
      text: "#b45309",
      label: estado || "Reportado",
    };
    if (estado === "En proceso" || estado === "En Proceso") {
      colorConfig = { bg: "#dbeafe", text: "#1d4ed8", label: "En Proceso" };
    } else if (estado === "Resuelto") {
      colorConfig = { bg: "#d1fae5", text: "#047857", label: "Resuelto" };
    }
    return (
      <Chip
        label={colorConfig.label}
        sx={{
          backgroundColor: colorConfig.bg,
          color: colorConfig.text,
          fontWeight: 700,
          borderRadius: "6px",
          fontSize: "0.75rem",
          height: "24px",
        }}
      />
    );
  };

  // 3. Formateador de fechas
  const formatFechaCorto = (timestamp) => {
    if (!timestamp) return "S/F";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // 4. Procesamiento y guardado masivo en Firebase
  const manejarActualizacionMasiva = async () => {
    if (!seleccionados || !nuevoEstado) return;

    const idsAActualizar = getIdsNormalizados(seleccionados);
    if (idsAActualizar.length === 0) return;

    setUpdating(true);
    const batch = writeBatch(db);

    try {
      // 1. Identificar incidentes base seleccionados
      const incidentesBase = incidentes.filter((inc) =>
        idsAActualizar.includes(inc.id),
      );

      // 2. Expandir a todos los del mismo grupo (si existen)
      let idsFinales = new Set(idsAActualizar);

      incidentesBase.forEach((inc) => {
        if (inc.idGrupo) {
          // Buscamos todos los que comparten este ID de grupo
          incidentes.forEach((i) => {
            if (i.idGrupo === inc.idGrupo) {
              idsFinales.add(i.id);
            }
          });
        }
      });

      // 3. Ejecutar batch
      idsFinales.forEach((id) => {
        const incidenteRef = doc(db, "incidentes", id);
        batch.update(incidenteRef, { estado: nuevoEstado });
      });

      await batch.commit();

      setNuevoEstado("");
      setSeleccionados([]);
      setGridKey((prev) => prev + 1);
      alert(`Se actualizaron ${idsFinales.size} incidentes.`);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setUpdating(false);
    }
  };

  const getNombreGrupo = (idGrupo) => {
    if (!idGrupo) return "Individual";

    // Obtenemos todos los IDs de grupos únicos y los ordenamos para que sea consistente
    const todosLosGrupos = [
      ...new Set(incidentes.map((i) => i.idGrupo).filter(Boolean)),
    ].sort();
    const index = todosLosGrupos.indexOf(idGrupo);

    return `Grupo ${String.fromCharCode(65 + index)}`; // A, B, C...
  };

  const getIdsNormalizados = (seleccion) => {
    if (Array.isArray(seleccion)) return seleccion;
    if (seleccion instanceof Set) return Array.from(seleccion);
    if (seleccion?.ids instanceof Set) return Array.from(seleccion.ids);
    return [];
  };

  // 5. Estructura de columnas
  const columns = [
    {
      field: "idMostrar",
      headerName: "ID",
      width: 110,
      sortable: false,
      valueGetter: (value, row) => row.id,
    },
    {
      field: "tipoIncidencia",
      headerName: "Tipo de Incidencia",
      width: 200,
      valueGetter: (value, row) => row.tipoIncidencia || "Otros",
    },
    {
      field: "fechaCreacion",
      headerName: "Fecha",
      width: 130,
      renderCell: (params) => formatFechaCorto(params.row.fechaCreacion),
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 150,
      renderCell: (params) => renderEstadoBadge(params.row.estado),
    },
    {
      field: "grupo",
      headerName: "Agrupado",
      width: 150,
      // 1. El valueGetter define qué valor se usa para ordenar al hacer clic en la cabecera
      valueGetter: (value, row) =>
        row.idGrupo ? getNombreGrupo(row.idGrupo) : "Individual",

      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
          {params.row.idGrupo ? (
            <Chip
              // 2. Aquí usamos params.value, que es el resultado del valueGetter (ej: "Grupo A")
              label={params.value}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ fontWeight: "bold" }}
            />
          ) : (
            <Typography variant="caption" color="text.secondary">
              Individual
            </Typography>
          )}
        </Box>
      ),
    },
    {
      field: "acciones",
      headerName: "Acciones",
      sortable: false,
      width: 140,
      renderCell: (params) => (
        <Button
          variant="outlined"
          size="small"
          startIcon={<VisibilityIcon />}
          onClick={() => navigate(`/detallesincidente/${params.row.id}`)}
          sx={{
            textTransform: "none",
            borderRadius: "6px",
            borderColor: "#cbd5e1",
            color: "#334155",
            "&:hover": {
              borderColor: "#0d233a",
              backgroundColor: "#f8fafc",
            },
          }}
        >
          Detallar
        </Button>
      ),
    },
  ];

  const manejarAgrupamiento = async (accion) => {
    const idsAProcesar = getIdsNormalizados(seleccionados);

    // Validación de seguridad
    if (idsAProcesar.length === 0) return;
    if (accion === "agrupar" && idsAProcesar.length < 2) {
      alert("Para agrupar, debes seleccionar al menos 2 incidentes.");
      return;
    }

    setUpdating(true);
    const batch = writeBatch(db);

    // Si es 'agrupar', generamos un nuevo UUID.
    // Si es 'desagrupar', eliminamos el campo idGrupo.
    const valorGrupo =
      accion === "agrupar" ? crypto.randomUUID() : deleteField();

    try {
      idsAProcesar.forEach((id) => {
        const ref = doc(db, "incidentes", id);
        batch.update(ref, { idGrupo: valorGrupo });
      });

      await batch.commit();

      // Limpiar estados tras éxito
      setSeleccionados([]);
      setGridKey((prev) => prev + 1);
    } catch (error) {
      console.error("Error en la operación de grupo:", error);
      alert("Hubo un problema al aplicar los cambios. Inténtalo de nuevo.");
    } finally {
      setUpdating(false);
    }
  };
  const manejarCombinarGrupos = async () => {
    const idsSeleccionados = getIdsNormalizados(seleccionados);
    const incidentesSeleccionados = incidentes.filter((i) =>
      idsSeleccionados.includes(i.id),
    );

    // 1. Identificamos los grupos existentes en la selección
    const gruposEnSeleccion = [
      ...new Set(incidentesSeleccionados.map((i) => i.idGrupo).filter(Boolean)),
    ];

    // 2. Si hay al menos un grupo, usamos el primero como "Destino".
    // Si no hay ningún grupo (aunque esto no debería pasar según tu lógica de botones), generamos uno nuevo.
    const idGrupoDestino =
      gruposEnSeleccion.length > 0 ? gruposEnSeleccion[0] : crypto.randomUUID();

    setUpdating(true);
    const batch = writeBatch(db);

    try {
      // 3. ACTUALIZACIÓN TOTAL:
      // Iteramos sobre todos los incidentes del sistema
      incidentes.forEach((inc) => {
        const esSeleccionado = idsSeleccionados.includes(inc.id);
        const perteneceAGrupoFusionado =
          inc.idGrupo && gruposEnSeleccion.includes(inc.idGrupo);

        // Si el incidente fue seleccionado (individual o grupo)
        // O pertenece a un grupo que está siendo absorbido, lo actualizamos.
        if (esSeleccionado || perteneceAGrupoFusionado) {
          const ref = doc(db, "incidentes", inc.id);
          batch.update(ref, { idGrupo: idGrupoDestino });
        }
      });

      await batch.commit();
      setSeleccionados([]);
      setGridKey((prev) => prev + 1);
    } catch (error) {
      console.error("Error al combinar grupos:", error);
      alert("Error al combinar los grupos.");
    } finally {
      setUpdating(false);
    }
  };

  const paginationModel = { page: 0, pageSize: 5 };

  // Cálculo del total adaptado a la lectura de Sets o Arrays nativos

  const totalSeleccionados = seleccionados?.ids
    ? seleccionados.ids.size
    : seleccionados?.length || 0;

  return (
    <SimpleSidebar>
      <Container maxWidth="lg" sx={{ py: 2 }}>
        {/* Cabecera */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#0d233a",
                mb: 1,
                letterSpacing: "-0.025em",
              }}
            >
              Panel de Administración
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Gestión, consulta global y actualización masiva de incidencias
              registradas.
            </Typography>
          </Box>
        </Box>

        {/* Caja de herramientas masivas */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 3,
            p: 2,
            backgroundColor: totalSeleccionados >= 1 ? "#f0fdf4" : "#f8fafc",
            borderRadius: "12px",
            border: "1px solid",
            borderColor: totalSeleccionados >= 1 ? "#bbf7d0" : "#e2e8f0",
            transition: "all 0.3s ease",
          }}
        >
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, color: "#334155" }}
          >
            {totalSeleccionados} seleccionado
            {totalSeleccionados !== 1 ? "s" : ""}
          </Typography>

          <FormControl
            size="small"
            sx={{ minWidth: 180 }}
            disabled={totalSeleccionados < 1 || updating}
          >
            <InputLabel id="select-estado-label">Cambiar estado a:</InputLabel>
            <Select
              labelId="select-estado-label"
              value={nuevoEstado}
              label="Cambiar estado a:"
              onChange={(e) => setNuevoEstado(e.target.value)}
            >
              <MenuItem value="Reportado">Reportado</MenuItem>
              <MenuItem value="En proceso">En proceso</MenuItem>
              <MenuItem value="Resuelto">Resuelto</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            size="medium"
            startIcon={<UpdateIcon />}
            disabled={totalSeleccionados < 1 || !nuevoEstado || updating}
            onClick={manejarActualizacionMasiva}
            sx={{
              backgroundColor: "#16a34a",
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#15803d" },
            }}
          >
            {updating ? "Actualizando..." : "Actualizar Estados"}
          </Button>

          {/* Botón de Agrupar / Desagrupar */}
          {totalSeleccionados >= 1 &&
            (() => {
              const idsSeleccionados = getIdsNormalizados(seleccionados);
              const incidentesSeleccionados = incidentes.filter((i) =>
                idsSeleccionados.includes(i.id),
              );

              const gruposUnicos = [
                ...new Set(
                  incidentesSeleccionados.map((i) => i.idGrupo).filter(Boolean),
                ),
              ];

              const tieneSinGrupo = incidentesSeleccionados.some(
                (i) => !i.idGrupo,
              );
              const tieneGrupo = gruposUnicos.length > 0;
              const sonDeGruposDiferentes = gruposUnicos.length > 1;
              const todosDelMismoGrupo =
                gruposUnicos.length === 1 &&
                incidentesSeleccionados.every(
                  (i) => i.idGrupo === gruposUnicos[0],
                );

              // REGLAS DE NEGOCIO:
              // 1. Agrupar: Solo si hay al menos uno sin grupo Y NO hay grupos diferentes (evita conflicto).
              const mostrarAgrupar = tieneSinGrupo && !sonDeGruposDiferentes;

              // 2. Desagrupar: Siempre que haya algo agrupado.
              const mostrarDesagrupar = tieneGrupo;

              // 3. Combinar: Solo si hay grupos diferentes.
              const mostrarCombinar = sonDeGruposDiferentes;

              return (
                <Box sx={{ display: "flex", gap: 1 }}>
                  {mostrarAgrupar && (
                    <Button
                      variant="outlined"
                      onClick={() => manejarAgrupamiento("agrupar")}
                      disabled={updating || idsSeleccionados.length < 2}
                      sx={{
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: "8px",
                      }}
                    >
                      Agrupar
                    </Button>
                  )}

                  {mostrarDesagrupar && (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => manejarAgrupamiento("desagrupar")}
                      disabled={updating}
                      sx={{
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: "8px",
                      }}
                    >
                      Desagrupar
                    </Button>
                  )}

                  {mostrarCombinar && (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={manejarCombinarGrupos}
                      disabled={updating}
                      sx={{
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: "8px",
                      }}
                    >
                      Combinar Grupos
                    </Button>
                  )}
                </Box>
              );
            })()}
        </Box>

        {/* Tabla */}

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress sx={{ color: "#0d233a" }} />
          </Box>
        ) : (
          <Paper
            sx={{
              height: 450,
              width: "100%",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              border: "1px solid #e2e8f0",
            }}
          >
            <DataGrid
              key={
                gridKey
              } /* Destruye el estado visual residual al incrementar */
              rows={incidentes}
              columns={columns}
              getRowId={(row) => row.id}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10, 25]}
              checkboxSelection
              disableRowSelectionOnClick
              onRowSelectionModelChange={(nuevosSeleccionados) => {
                setSeleccionados(nuevosSeleccionados);
              }}
              sx={{
                border: 0,
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#f1f5f9",
                  color: "#1e293b",
                  fontWeight: "bold",
                },
              }}
            />
          </Paper>
        )}
      </Container>
    </SimpleSidebar>
  );
};

export default IncidentesAdmin;
