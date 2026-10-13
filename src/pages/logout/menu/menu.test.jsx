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

  // Busca una imagen por su texto alternativo (alt)
  const imagen = screen.getByAltText(/Verduras Huerto Hogar/i);

  // Comprueba que la imagen está presente en el documento HTML
  expect(imagen).toBeInTheDocument();
});