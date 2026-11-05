import { Outlet, Link, useLocation } from "react-router-dom";
import Footer from "./components/Footer"; // Revisa la ruta correcta

export default function MainLayout() {
  const location = useLocation();

  // Si estamos en /dashboard, desactivamos el botón de login en el footer global
  const esDashboard = location.pathname.toLowerCase().includes('dashboard');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar que se mantendrá visible en todas las páginas */}
      <nav style={{ padding: '15px', backgroundColor: '#0056b3', color: 'white', display: 'flex', gap: '20px' }}>
        <strong style={{ marginRight: 'auto' }}>AquaChile App</strong>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Formulario</Link>
        <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
        <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
      </nav>

      {/* <Outlet /> renderiza la página actual */}
      <main className="flex-1" style={{ padding: '20px' }}>
        <Outlet />
      </main>

      {/* Footer global centralizado */}  
      <Footer mostrarAccesoLogin={!esDashboard} />
    </div>
  );
}