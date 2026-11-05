// src/data/mockData.js

export const usuariosMock = [
  { id: 1, nombre: "Dra. Valentina Lagos Schmidt", email: "valentina.lagos@aquachile.com", rol: "evaluador", colegiado: "12.408" },
  { id: 2, nombre: "Dr. Carlos Soto Miranda", email: "carlos.soto@aquachile.com", rol: "evaluador", colegiado: "15.912" },
  { id: 3, nombre: "Lic. Marcela Morales", email: "marcela.morales@aquachile.com", rol: "analista", cargo: "Supervisor de Reclutamiento" }
];

export const solicitudesIniciales = [
  {
    id: 101,
    candidato: "Matías Alejandro Pérez",
    email: "matias.perez@email.com",
    telefono: "+56912345678",
    cargo: "Operador de Mantención",
    familiaCargo: "Planta de Procesos",
    estado: "En proceso",
    psicologoAsignado: "Dra. Valentina Lagos Schmidt",
    fechaSolicitud: "2026-11-02",
    observaciones: "Pendiente aplicación de batería psicométrica.",
    driveUrl: "https://drive.google.com/drive/folders/ejemplo"
  },
  {
    id: 102,
    candidato: "Sofía Ignacia Valdés",
    email: "sofia.valdes@email.com",
    telefono: "+56987654321",
    cargo: "Jefatura de Turno Aysén",
    familiaCargo: "Producción",
    estado: "Finalizada",
    psicologoAsignado: "Dr. Carlos Soto Miranda",
    fechaSolicitud: "2026-10-28",
    observaciones: "Entrevista realizada con éxito. Alto nivel de idoneidad.",
    driveUrl: "https://drive.google.com/drive/folders/ejemplo2"
  }
];