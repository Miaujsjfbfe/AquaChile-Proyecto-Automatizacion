import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('Todos los Estados');
  const [filtroPsicologo, setFiltroPsicologo] = useState('Todos los Psicólogos');

  useEffect(() => {
    // Datos de prueba iniciales si la lista local está vacía
    const datosIniciales = [
      {
        id: 1042,
        rut: '15.824.912-8',
        candidato: 'Rodrigo Morales Valdés',
        email: 'r.morales.v@salmonchile.cl',
        telefono: '+56912345678',
        familiaCargo: 'Producción Agua Mar',
        cargo: 'Jefe Centro Cultivo Aysén',
        idoneidad: 92,
        estado: 'Estado 1: En Entrevista',
        evaluadorResponsable: 'Camila Soto R.',
        driveFileUrl: '#'
      },
      {
        id: 1041,
        rut: '18.490.231-K',
        candidato: 'Francisca Palma Ojeda',
        email: 'f.palma.tec@outlook.com',
        telefono: '+56987654321',
        familiaCargo: 'Operaciones y Flota',
        cargo: 'Técnico Mantenimiento',
        idoneidad: 85,
        estado: 'Estado 0: Registrado',
        evaluadorResponsable: 'Asignar',
        driveFileUrl: '#'
      },
      {
        id: 1040,
        rut: '17.103.884-2',
        candidato: 'Matías Barrientos Krause',
        email: 'mbarrientos@gmail.com',
        telefono: '+56911223344',
        familiaCargo: 'Calidad e Inocuidad',
        cargo: 'Analista Calidad',
        idoneidad: 95,
        estado: 'Completado / Idóneo',
        evaluadorResponsable: 'Andrés Vergara',
        driveFileUrl: '#'
      }
    ];

    const guardados = JSON.parse(localStorage.getItem('aquachile_solicitudes') || '[]');
    if (guardados.length === 0) {
      localStorage.setItem('aquachile_solicitudes', JSON.stringify(datosIniciales));
      setSolicitudes(datosIniciales);
    } else {
      setSolicitudes(guardados);
    }
  }, []);

  // Filtrado reactivo de candidatos
  const solicitudesFiltradas = solicitudes.filter((item) => {
    const texto = busqueda.toLowerCase();
    const coincideTexto =
      (item.candidato && item.candidato.toLowerCase().includes(texto)) ||
      (item.cargo && item.cargo.toLowerCase().includes(texto)) ||
      (item.rut && item.rut.toLowerCase().includes(texto));

    const coincideEstado =
      filtroEstado === 'Todos los Estados' || item.estado === filtroEstado;

    const coincidePsicologo =
      filtroPsicologo === 'Todos los Psicólogos' ||
      item.evaluadorResponsable === filtroPsicologo;

    return coincideTexto && coincideEstado && coincidePsicologo;
  });

  return (
    <div className="bg-slate-200/90 min-h-screen">
      <Navbar />

      <main className="pt-20 px-6 pb-8 max-w-7xl mx-auto">
        <div className="flex flex-col gap-5">

          {/* Cabecera */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Gestión de Candidatos</h1>
                <span className="px-2.5 py-0.5 rounded-md bg-slate-300 text-slate-800 text-xs font-bold">
                  {solicitudes.length} activos
                </span>
              </div>
              <p className="text-sm text-slate-700 mt-0.5">
                Evaluaciones psicolaborales, idoneidad y seguimiento clínico en tiempo real.
              </p>
            </div>
          </div>

          {/* Tarjetas de Métricas (KPIs) */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 py-3 px-4 bg-slate-100 rounded-lg border border-slate-300 shadow-sm text-xs text-slate-700">
            <div>Total Evaluaciones: <strong className="text-slate-900 text-sm">{solicitudes.length}</strong></div>
            <div className="h-4 w-px bg-slate-300 hidden sm:block"></div>
            <div>En Proceso / Entrevista: <strong className="text-slate-900 text-sm">
              {solicitudes.filter(s => s.estado?.includes('Entrevista') || s.estado?.includes('proceso')).length}
            </strong></div>
            <div className="h-4 w-px bg-slate-300 hidden sm:block"></div>
            <div>Completadas: <strong className="text-slate-900 text-sm">
              {solicitudes.filter(s => s.estado?.includes('Completado') || s.estado?.includes('Idóneo')).length} 
            </strong></div>
            <div className="h-4 w-px bg-slate-300 hidden sm:block"></div>
            <div>Tiempo Promedio: <strong className="text-blue-900 text-sm">3.2 días hábiles</strong></div>
          </div>

          {/* Barra de Filtros y Búsqueda */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <input 
                type="text" 
                placeholder="Buscar por candidato, RUT o cargo..." 
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full px-3 py-2 bg-slate-100 border border-slate-300 text-slate-900 text-sm rounded-lg outline-none focus:border-blue-600"
              />
            </div>
            <div className="flex items-center gap-2">
              <select 
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="bg-slate-100 border border-slate-300 text-slate-800 text-xs px-3 py-2 rounded-lg outline-none cursor-pointer"
              >
                <option value="Todos los Estados">Todos los Estados</option>
                <option value="Creada">Creada</option>
                <option value="Estado 0: Registrado">Estado 0: Registrado</option>
                <option value="Estado 1: En Entrevista">Estado 1: En Entrevista</option>
                <option value="Completado / Idóneo">Completado / Idóneo</option>
              </select>

              <select 
                value={filtroPsicologo}
                onChange={(e) => setFiltroPsicologo(e.target.value)}
                className="bg-slate-100 border border-slate-300 text-slate-800 text-xs px-3 py-2 rounded-lg outline-none cursor-pointer"
              >
                <option value="Todos los Psicólogos">Todos los Psicólogos</option>
                <option value="Camila Soto R.">Camila Soto R.</option>
                <option value="Andrés Vergara">Andrés Vergara</option>
                <option value="Dra. Valentina Lagos Schmidt">Dra. Valentina Lagos Schmidt</option>
              </select>
            </div>
          </div>

          {/* Tabla de Candidatos Dinámica */}
          <div className="bg-slate-100 rounded-xl border border-slate-300 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-200/80 border-b border-slate-300 text-slate-700 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4 font-bold">Candidato</th>
                  <th className="py-3 px-4 font-bold">Cargo y Área</th>
                  <th className="py-3 px-4 font-bold">Idoneidad / Match</th>
                  <th className="py-3 px-4 font-bold">Estado Clínico</th>
                  <th className="py-3 px-4 font-bold">Psicólogo</th>
                  <th className="py-3 px-4 font-bold text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300 text-sm text-slate-800">
                
                {solicitudesFiltradas.length > 0 ? (
                  solicitudesFiltradas.map((item) => {
                    const iniciales = item.candidato
                      ? item.candidato.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
                      : 'CD';
                    const porcentaje = item.idoneidad || 85;

                    return (
                      <tr key={item.id} className="hover:bg-slate-200/60 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                              {iniciales}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                                {item.candidato}
                                <span className="text-xs text-blue-700 font-mono">#AQ-{item.id}</span>
                              </div>
                              <div className="text-xs text-slate-600">
                                {item.rut ? `${item.rut} • ` : ''}{item.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="text-xs font-semibold text-slate-900">{item.cargo}</div>
                          <div className="text-[11px] text-slate-600">{item.familiaCargo}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-slate-300 h-2 rounded-full overflow-hidden">
                              <div 
                                className="bg-slate-800 h-full rounded-full" 
                                style={{ width: `${porcentaje}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-bold">{porcentaje}%</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-xs font-medium text-slate-700">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            item.estado?.includes('Creada') || item.estado?.includes('Registrado') 
                              ? 'bg-blue-100 text-blue-800 border border-blue-300' 
                              : item.estado?.includes('Entrevista') || item.estado?.includes('proceso')
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          }`}>
                            {item.estado}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-xs text-slate-800 font-medium">
                          {item.evaluadorResponsable === 'Asignar' ? (
                            <span className="text-blue-800 font-bold cursor-pointer">Asignar</span>
                          ) : (
                            item.evaluadorResponsable || "Sin asignar"
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <a 
                            href={item.driveFileUrl && item.driveFileUrl !== '#' ? item.driveFileUrl : '#'} 
                            target={item.driveFileUrl && item.driveFileUrl !== '#' ? '_blank' : '_self'}
                            rel="noopener noreferrer"
                            className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-xs font-medium rounded-md border border-slate-300 inline-block"
                          >
                            Detalle
                          </a>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-slate-500 text-sm">
                      No se encontraron registros de postulaciones que coincidan con la búsqueda.
                    </td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div>
  );
}