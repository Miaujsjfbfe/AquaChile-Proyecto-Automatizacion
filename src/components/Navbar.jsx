import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  // Función para saber qué pestaña está activa y cambiarle el estilo
  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-100/95 backdrop-blur-md border-b border-slate-300 shadow-sm">
      <div className="h-16 w-full px-6 flex items-center justify-between">
        
        {/* Logo y Enlaces de Navegación */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-600 inline-block"></span>
            <span className="font-bold text-slate-900 text-lg tracking-tight">AquaChile</span>
            <span className="text-[11px] text-slate-500 uppercase font-bold tracking-wider border-l border-slate-300 pl-2">Psicolaboral</span>
          </div>

          <nav className="hidden lg:flex items-center gap-2">
            <Link 
              to="/dashboard" 
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                isActive('/dashboard') 
                  ? 'bg-slate-200 text-slate-900 border-slate-300 shadow-2xs' 
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60 border-transparent'
              }`}
            >
              Dashboard / Gestión
            </Link>

            <Link 
              to="/" 
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                isActive('/') 
                  ? 'bg-slate-200 text-slate-900 border-slate-300 shadow-2xs' 
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60 border-transparent'
              }`}
            >
              + Nueva Solicitud
            </Link>
          </nav>
        </div>

        {/* Roles y Botón de Cerrar Sesión */}
        <div className="flex items-center gap-3">
          <div className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-200/80 border border-slate-300 text-slate-800 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>Rol: Administrador General</span>
          </div>

          <Link 
            to="/login" 
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-100 hover:bg-rose-200 border border-rose-200 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">logout</span>
            <span>Cerrar Sesión</span>
          </Link>
        </div>

      </div>
    </header>
  );
}