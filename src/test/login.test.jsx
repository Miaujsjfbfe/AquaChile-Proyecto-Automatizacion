import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Login from '../pages/Login';

describe('Login - Página de Autenticación', () => {
  it('renderiza los campos de acceso y el botón de ingresar', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Buscamos el título principal usando getByRole para evitar el conflicto
    expect(screen.getByRole('heading', { name: /Iniciar Sesión/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/correo@aquachile.com/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Iniciar Sesión/i })).toBeInTheDocument();
  });

  it('permite ingresar credenciales en el formulario de login', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const inputEmail = screen.getByPlaceholderText(/correo@aquachile.com/i);
    await user.type(inputEmail, 'admin.talento@aquachile.com');

    expect(inputEmail).toHaveValue('admin.talento@aquachile.com');
  });
});