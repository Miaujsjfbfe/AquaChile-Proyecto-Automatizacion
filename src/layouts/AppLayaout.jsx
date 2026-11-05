import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";

export default function AppLayout() {
  const location = useLocation();
  const esDashboard = location.pathname.toLowerCase().includes('dashboard');

  return (
    <div className="min-h-screen bg-slate-200/90 flex flex-col">
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer mostrarAccesoLogin={!esDashboard} />
    </div>
  );
}