import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Footer from '../components/Footer';

describe('Footer - Componente', () => {
  it('renderiza la información corporativa y el copyright por defecto', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    // Usamos getAllByText para el título y validamos que al menos exista uno, o buscamos por el texto largo único
    expect(screen.getAllByText(/AquaChile/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Plataforma Integrada de Selección y Evaluación Psicolaboral/i)).toBeInTheDocument();
  });

  it('muestra el botón de acceso al login cuando mostrarAccesoLogin es true', () => {
    render(
      <BrowserRouter>
        <Footer mostrarAccesoLogin={true} />
      </BrowserRouter>
    );

    expect(screen.getByText(/Ingresar como empleado/i)).toBeInTheDocument();
  });

  it('oculta el botón de login y muestra el texto de sistema activo cuando mostrarAccesoLogin es false', () => {
    render(
      <BrowserRouter>
        <Footer mostrarAccesoLogin={false} />
      </BrowserRouter>
    );

    expect(screen.queryByText(/Ingresar como empleado/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Conexión Encriptada/i)).toBeInTheDocument();
  });
});