import { render, screen, fireEvent } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Producto from './producto_out';
import { CartContext } from '../../../context/cartContext';

const mockCartContextValue = {
  carrito: [],
  agregarAlCarrito: vi.fn(),
  handleOpenCarrito: vi.fn(),
};

test('1. Renderiza el título de la sección de productos', () => {
  render(
    <CartContext.Provider value={mockCartContextValue}>
      <MemoryRouter>
        <Producto />
      </MemoryRouter>
    </CartContext.Provider>
  );

  const titulo = screen.getByRole('heading', { name: /nuestros productos/i });
  expect(titulo).toBeInTheDocument();
});

test('2. Muestra las tarjetas de productos con sus nombres y botones', () => {
  render(
    <CartContext.Provider value={mockCartContextValue}>
      <MemoryRouter>
        <Producto />
      </MemoryRouter>
    </CartContext.Provider>
  );

  expect(screen.getByText(/manzana fuji/i)).toBeInTheDocument();
  
  const botonesAgregar = screen.getAllByRole('button', { name: /añadir/i });
  expect(botonesAgregar.length).toBeGreaterThan(0);
});

test('3. Llama a la función agregarAlCarrito al presionar el botón de agregar', () => {
  render(
    <CartContext.Provider value={mockCartContextValue}>
      <MemoryRouter>
        <Producto />
      </MemoryRouter>
    </CartContext.Provider>
  );

  const botonesAgregar = screen.getAllByRole('button', { name: /añadir/i });
  fireEvent.click(botonesAgregar[0]);

  expect(mockCartContextValue.agregarAlCarrito).toHaveBeenCalledTimes(1);
});