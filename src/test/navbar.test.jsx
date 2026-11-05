import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Navbar from "../components/Navbar";

function renderWithRouter(initialPath = '/') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/contact" element={<h1>Contact</h1>} />
      </Routes>
    </MemoryRouter>
  );
}

describe('Navbar', () => {
  it('renderiza el elemento nav', () => {
    renderWithRouter();
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });
});