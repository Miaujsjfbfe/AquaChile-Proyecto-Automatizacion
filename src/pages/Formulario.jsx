import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Formulario() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [familiaCargo, setFamiliaCargo] = useState('');
  const [nombreCargo, setNombreCargo] = useState('');
  const [archivo, setArchivo] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [enviadoExitosamente, setEnviadoExitosamente] = useState(false);
  const navigate = useNavigate();

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !email || !telefono || !familiaCargo || !nombreCargo || !archivo) {
      alert('Por favor complete los campos obligatorios y adjunte el CV.');
      return;
    }
    
    setCargando(true);

    try {
      const base64Content = await fileToBase64(archivo);

      const payload = {
        candidateName: nombre,
        candidateEmail: email,
        candidatePhone: telefono,
        familiaCargo: familiaCargo,
        cargo: nombreCargo,
        fileName: archivo.name,
        fileBase64: base64Content,
        mimeType: archivo.type
      };

      const scriptUrl = "https://script.google.com/macros/s/AKfycbz1I8Z7thJywFt0PDjz7XplHsIxUs7LMH6Do2p2f4fPRYxcsLDSBx3E5PQCKFLXU_q0/exec";

      const response = await fetch(scriptUrl, {
        method: "POST",
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.status === "success") {
        // En vez de navegar al dashboard, activamos la vista de éxito
        
        const nuevaSolicitud = {
          id: Date.now(),
          candidato: data.candidateName || nombre,
          email: email.toLowerCase(),
          telefono: telefono,
          familiaCargo: familiaCargo,
          cargo: nombreCargo,
          evaluadorResponsable: "Dra. Valentina Lagos Schmidt", // Asignada por defecto
          estado: "Creada",
          fechaSolicitud: new Date().toISOString().split('T')[0],
          driveFileUrl: data.fileUrl,
          folderUrl: data.folderUrl
        };

        // 2. Guardar en el localStorage sincronizado con el Dashboard
        const solicitudesGuardadas = JSON.parse(localStorage.getItem('aquachile_solicitudes') || '[]');
        localStorage.setItem('aquachile_solicitudes', JSON.stringify([nuevaSolicitud, ...solicitudesGuardadas]));

        // 3. Activar la vista de éxito
        setEnviadoExitosamente(true);


      } else {
        alert(`Error al subir el archivo: ${data.message}`);
      }
    } catch (error) {
      console.error("Error al conectar con la API:", error);
      alert("Ocurrió un error al intentar conectar con el servidor de Google.");
    } finally {
      setCargando(false);
    }
  };

  // Si ya se envió con éxito, mostramos una pantalla de confirmación limpia
  if (enviadoExitosamente) {
    return (
      <div className="min-h-screen w-full bg-[#f4f6f9] flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-8 text-center flex flex-col gap-4">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
            ✓
          </div>
          <h2 className="text-2xl font-bold text-slate-900">¡Postulación Enviada!</h2>
          <p className="text-sm text-slate-600">
            Gracias <span className="font-semibold text-slate-800">{nombre}</span>. Tus antecedentes y currículum han sido registrados y enviados exitosamente al sistema de selección de AquaChile.
          </p>
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-[#0a1b2a] hover:bg-slate-800 text-white font-bold text-sm py-3 rounded-xl transition-all shadow-md"
            >
              Enviar otra postulación
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#f4f6f9] flex flex-col items-center justify-center p-6">
      
      {/* Tarjeta principal amplia */}
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-200 flex flex-col max-h-[94vh] overflow-hidden">
        
        {/* ENCABEZADO FIJO */}
        <div className="p-8 pb-5 bg-white border-b border-slate-100 flex flex-col items-center text-center flex-shrink-0">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-2">
            <span className="w-3.5 h-3.5 rounded-full bg-blue-600 inline-block"></span>
            AquaChile <span className="text-slate-500 font-normal">PERSONAS</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Solicitud de Evaluación</h1>
          <p className="text-sm text-slate-500 mt-1">Complete los antecedentes del candidato para iniciar el proceso</p>
        </div>

        {/* CUERPO CON SCROLL (Incluye campos y sección de CV) */}
        <div className="p-8 overflow-y-auto flex-1 space-y-5">
          <form id="solicitud-form" onSubmit={handleSubmit} className="flex flex-col gap-5">
            
            {/* Nombre del Candidato */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-800">Nombre del Candidato *</label>
              <div className="relative">
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej: Juan Pérez Morales"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-[#f4f7fa] border border-slate-200 rounded-xl text-sm text-slate-900 outline-none focus:border-blue-600 focus:bg-white transition-all placeholder:text-slate-400"
                />
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>

            {/* Correo Electrónico */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-800">Correo Electrónico *</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ej: jperez@correo.com"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-[#f4f7fa] border border-slate-200 rounded-xl text-sm text-slate-900 outline-none focus:border-blue-600 focus:bg-white transition-all placeholder:text-slate-400"
                />
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            {/* Número de Teléfono */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-800">Número de Teléfono *</label>
              <div className="relative flex items-center bg-[#f4f7fa] border border-slate-200 rounded-xl overflow-hidden focus-within:border-blue-600 focus-within:bg-white transition-all">
                <span className="pl-3.5 pr-2.5 text-sm text-slate-500 font-medium border-r border-slate-200 bg-slate-100 py-3">+56</span>
                <input
                  type="tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="9 1234 5678"
                  required
                  className="w-full px-4 py-3 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Familia de Cargo */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-800">Familia de Cargo *</label>
              <div className="relative">
                <select
                  value={familiaCargo}
                  onChange={(e) => setFamiliaCargo(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-3 bg-[#f4f7fa] border border-slate-200 rounded-xl text-sm text-slate-900 outline-none focus:border-blue-600 focus:bg-white transition-all appearance-none cursor-pointer"
                >
                  <option value="">Seleccione una opción...</option>
                  <option value="produccion">Producción Agua Mar / Centros de Cultivo</option>
                  <option value="procesamiento">Procesamiento, Faena y Plantas</option>
                  <option value="logistica">Logística, Cadena de Suministro y Flota</option>
                  <option value="calidad">Calidad e Inocuidad</option>
                  <option value="administrativo">Administrativo y Gestión de Personas</option>
                </select>
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Nombre del Cargo */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-800">Nombre del Cargo *</label>
              <div className="relative">
                <input
                  type="text"
                  value={nombreCargo}
                  onChange={(e) => setNombreCargo(e.target.value)}
                  placeholder="Ej: Analista de Selección y DO"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-[#f4f7fa] border border-slate-200 rounded-xl text-sm text-slate-900 outline-none focus:border-blue-600 focus:bg-white transition-all placeholder:text-slate-400"
                />
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>

            {/* Carga de Currículum Vitae (CV) - Dentro del scroll */}
            <div className="flex flex-col gap-2 pt-1">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-800">Currículum Vitae (CV) *</label>
                <span className="text-xs text-slate-400 font-medium">PDF, DOCX hasta 15MB</span>
              </div>
              
              <label className="border-2 border-dashed border-slate-200 hover:border-blue-600 bg-[#f4f7fa] rounded-xl p-3 flex items-center justify-between cursor-pointer transition-all">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-sm font-bold text-blue-700 block">Seleccionar archivo</span>
                  </div>
                </div>
                <span className="text-sm text-slate-500 italic max-w-[160px] truncate">
                  {archivo ? archivo.name : 'Sin archivo'}
                </span>
                <input 
                  type="file" 
                  accept=".pdf,.docx" 
                  className="hidden" 
                  onChange={(e) => {
                    if (e.target.files[0]) setArchivo(e.target.files[0]);
                  }}
                />
              </label>
            </div>

          </form>
        </div>

        {/* PIE ESTATICO (Nota de seguridad y Botón Enviar) */}
        <div className="p-8 pt-4 bg-white border-t border-slate-100 flex flex-col gap-4 flex-shrink-0">
          
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <span></span>
            <span>La evaluación incluye pruebas psicométricas normadas y reporte ejecutivo.</span>
          </div>

          {/* Botón Enviar */}
          <button
            type="submit"
            form="solicitud-form"
            disabled={cargando}
            className="w-full bg-[#0a1b2a] hover:bg-slate-800 text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:bg-slate-500 cursor-pointer"
          >
            <span>{cargando ? "Enviando Solicitud" : "Enviar Solicitud"}</span>
            {!cargando && <span>→</span>}
          </button>
        </div>

      </div>

      <div className="mt-4 text-center text-xs text-slate-400 flex gap-4">
        <span>Sistema Integrado AquaChile v2.4</span>
        <span>•</span>
        <span> Protocolo Confidencial</span>
      </div>
    </div>
  );
}