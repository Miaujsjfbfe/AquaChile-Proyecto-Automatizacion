import { Link } from 'react-router-dom';

export default function Footer({ mostrarAccesoLogin = true }) {
  return (
    <footer className="w-full bg-[#0a1b2a] text-slate-300 py-8 px-6 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        
        {/* Columna 1: Identidad y Copyright */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-white font-bold text-base tracking-tight">
            <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
            AquaChile <span className="text-slate-400 font-normal">Personas</span>
          </div>
          <p className="text-xs text-slate-400">
            Plataforma Integrada de Selección y Evaluación Psicolaboral. Todos los derechos reservados.
          </p>
          <span className="text-[10px] text-slate-500">© 2026 AquaChile S.A.</span>
        </div>

        {/* Columna 2: Enlaces predeterminados */}
        <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-300 font-medium">
          <a href="#terminos" onClick={(e) => e.preventDefault()} className="hover:text-blue-400 transition-colors">
            Términos de Servicio
          </a>
          <a href="#privacidad" onClick={(e) => e.preventDefault()} className="hover:text-blue-400 transition-colors">
            Privacidad y Tratamiento de Datos
          </a>
          <a href="#soporte" onClick={(e) => e.preventDefault()} className="hover:text-blue-400 transition-colors">
            Soporte Técnico TI
          </a>
        </div>

        {/* Columna 3: Dinámica (Muestra el botón de login solo si se requiere) */}
        <div className="flex flex-col md:items-end gap-1.5 text-right">
          {mostrarAccesoLogin ? (
            <>
              <span className="text-[11px] text-slate-400">¿Eres parte del equipo evaluador o analista?</span>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 bg-slate-800/80 hover:bg-slate-800 px-4 py-2 rounded-lg border border-slate-700 transition-all shadow-sm"
              >
                <span>Ingresar como empleado</span>
                <span>→</span>
              </Link>
            </>
          ) : (
            <div className="text-xs text-slate-400 italic">
              Conexión Encriptada • Sistema Activo
            </div>
          )}
        </div>

      </div>
    </footer>
  );
}