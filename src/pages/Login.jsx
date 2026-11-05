import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      // Aquí puedes agregar validaciones reales si gustas, por ahora valida que existan
      navigate('/dashboard');
    } else {
      alert('Por favor ingresa un correo y contraseña válidos.');
    }
  };

  // Modificado: Ahora solo autocompleta los campos para que presiones el botón de inicio de sesión
  const handleQuickLogin = (quickEmail) => {
    setEmail(quickEmail);
    setPassword('12345678');
  };

  return (
    <div className="min-h-screen w-full bg-[#f4f6f9] flex flex-col items-center justify-between p-6">
      
      {/* Contenedor central */}
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-200 p-10 flex flex-col gap-6">
          
          {/* Logo y Encabezado */}
          <div className="flex flex-col items-center text-center gap-1.5">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xl tracking-tight">
              <span className="w-3.5 h-3.5 rounded-full bg-blue-600 inline-block"></span>
              AquaChile
            </div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Personas</span>
            
            <h1 className="text-2xl font-bold text-slate-900 mt-3 tracking-tight">Iniciar Sesión</h1>
            <p className="text-xs text-slate-500">Acceso al portal corporativo para evaluadores y analistas</p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            
            {/* Campo Correo */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-800">Correo Corporativo</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="correo@aquachile.com"
                  required
                  className="w-full pl-10 pr-3 py-2.5 bg-[#f4f7fa] border border-slate-200 rounded-lg text-sm text-slate-900 outline-none focus:border-blue-600 focus:bg-white transition-all"
                />
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                  mail
                </span>
              </div>
            </div>

            {/* Campo Contraseña */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800">Contraseña</label>
                <a href="#" onClick={(e) => e.preventDefault()} className="text-xs font-semibold text-blue-700 hover:underline">¿Olvidó su contraseña?</a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-10 pr-16 py-2.5 bg-[#f4f7fa] border border-slate-200 rounded-lg text-sm text-slate-900 outline-none focus:border-blue-600 focus:bg-white transition-all"
                />
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                  lock
                </span>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900 text-xs font-bold"
                >
                  {showPassword ? "Ocultar" : "Ver"}
                </button>
              </div>
            </div>

            {/* Recordar sesión */}
            <div className="flex items-center gap-2 mt-1">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-slate-300 text-blue-900 focus:ring-blue-800 cursor-pointer" />
              <label htmlFor="remember" className="text-xs text-slate-700 font-medium cursor-pointer">Recordar sesión en este equipo</label>
            </div>

            {/* Botón Submit (Ahora este es el que valida y procesa el ingreso) */}
            <button
              type="submit"
              className="w-full bg-[#0a1b2a] hover:bg-slate-800 text-white font-bold text-sm py-3 rounded-xl transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 mt-2 cursor-pointer"
            >
              <span>Iniciar Sesión</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </form>

          {/* Acceso Rápido Demo (Solo autocompleta para probar) */}
          <div className="bg-[#f4f7fa] border border-slate-200 rounded-xl p-4 flex flex-col gap-2.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-blue-700">badge</span>
                Autocompletar Demo (Testing)
              </span>
              <span className="text-[10px] bg-slate-200 border border-slate-300 px-1.5 py-0.5 rounded text-slate-700 font-mono font-bold">QA</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleQuickLogin('admin.talento@aquachile.com')}
                className="p-2.5 bg-white border border-slate-200 hover:border-blue-600 rounded-lg text-left transition-all flex items-center justify-between group shadow-2xs cursor-pointer"
              >
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-slate-900 truncate">Analista / Supervisor</span>
                  <span className="text-[10px] text-slate-500 truncate">admin.talento@aquachile.com</span>
                </div>
                <span className="material-symbols-outlined text-slate-400 group-hover:text-blue-700 text-[16px]">touch_app</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('ps.evaluador@aquachile.com')}
                className="p-2.5 bg-white border border-slate-200 hover:border-blue-600 rounded-lg text-left transition-all flex items-center justify-between group shadow-2xs cursor-pointer"
              >
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-slate-900 truncate">Psicólogo Evaluador</span>
                  <span className="text-[10px] text-slate-500 truncate">ps.evaluador@aquachile.com</span>
                </div>
                <span className="material-symbols-outlined text-slate-400 group-hover:text-blue-700 text-[16px]">touch_app</span>
              </button>
            </div>
          </div>

          {/* Enlace para volver al formulario público */}
          <div className="text-center pt-2 border-t border-slate-100">
            <Link to="/" className="text-xs font-semibold text-blue-700 hover:underline inline-flex items-center gap-1">
              <span>←</span> Volver al formulario de postulación de candidatos
            </Link>
          </div>

        </div>
      </div>

      {/* Footer corporativo inferior */}
      <div className="mt-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row gap-2 sm:gap-6 items-center justify-center">
        <span>© 2026 AquaChile S.A. Todos los derechos reservados.</span>
        <span>•</span>
        <span>Gerencia de Personas & Desarrollo Organizacional</span>
      </div>
    </div>
  );
}