import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Formulario from '../pages/Formulario';

describe('Formulario - Componente de Solicitud', () => {
  it('renderiza los campos principales del formulario', () => {
    render(
      <BrowserRouter>
        <Formulario />
      </BrowserRouter>
    );

    expect(screen.getByText(/Solicitud de Evaluación/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Juan Pérez Morales/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/jperez@correo.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Currículum Vitae/i)).toBeInTheDocument();
  });

  it('permite escribir en los campos de texto del candidato', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <Formulario />
      </BrowserRouter>
    );

    const inputNombre = screen.getByPlaceholderText(/Juan Pérez Morales/i);
    await user.type(inputNombre, 'Sofía Valdés');

    expect(inputNombre).toHaveValue('Sofía Valdés');
  });
});