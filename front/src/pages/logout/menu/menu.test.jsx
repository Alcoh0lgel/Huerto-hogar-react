import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Menu from './menu_out'; // 
import { CartContext } from '../../../context/cartContext';

const mockCartContextValue = {
  carrito: [],
  handleOpenCarrito: () => {},
  agregarAlCarrito: () => {},
};

test('Verifica que se renderice la imagen en la vista principal', () => {
  render(
    <CartContext.Provider value={mockCartContextValue}>
      <MemoryRouter>
        <Menu />
      </MemoryRouter>
    </CartContext.Provider>
  );

  const imagen = screen.getByAltText(/Verduras Huerto Hogar/i);

  expect(imagen).toBeInTheDocument();
});