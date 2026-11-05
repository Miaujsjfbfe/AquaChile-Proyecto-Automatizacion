import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayaout";
import Formulario from "./pages/Formulario";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DetallePostulante from "./pages/DetallePostulante";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login fuera del layout principal */}
        <Route path="/login" element={<Login />} />

        {/* Rutas con AppLayout */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Formulario />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/postulante/1042" element={<DetallePostulante />} />
          <Route path="*" element={<h2>Página No Encontrada (404)</h2>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;