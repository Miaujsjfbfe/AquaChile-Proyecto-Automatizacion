import { describe, it, expect } from 'vitest';

describe('Pruebas unitarias de lógica - Dashboard AquaChile', () => {
  const mockSolicitudes = [
    {
      id: 1042,
      candidato: 'Rodrigo Morales Valdés',
      cargo: 'Jefe Centro Cultivo Aysén',
      estado: 'Estado 1: En Entrevista'
    },
    {
      id: 1041,
      candidato: 'Francisca Palma Ojeda',
      cargo: 'Técnico Mantenimiento',
      estado: 'Estado 0: Registrado'
    }
  ];

  it('debería filtrar correctamente las solicitudes por el nombre del candidato', () => {
    const textoBusqueda = 'francisca';
    const resultado = mockSolicitudes.filter(item => 
      item.candidato.toLowerCase().includes(textoBusqueda)
    );

    expect(resultado.length).toBe(1);
    expect(resultado[0].candidato).toBe('Francisca Palma Ojeda');
  });

  it('debería filtrar correctamente por estado clínico', () => {
    const estadoFiltro = 'Estado 0: Registrado';
    const resultado = mockSolicitudes.filter(item => 
      item.estado === estadoFiltro
    );

    expect(resultado.length).toBe(1);
    expect(resultado[0].id).toBe(1041);
  });
});