import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  // Cargar carrito inicial desde localStorage
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem('carrito');
    return guardado ? JSON.parse(guardado) : [];
  });

  const [showCarrito, setShowCarrito] = useState(false);

  // Sincronizar con localStorage cada vez que cambia el carrito
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => [...prev, producto]);
  };

  const eliminarProductoCarrito = (index) => {
    if (confirm(`¿Deseas eliminar ${carrito[index]?.nombre} del carrito?`)) {
      setCarrito((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const handleOpenCarrito = () => setShowCarrito(true);
  const handleCloseCarrito = () => setShowCarrito(false);

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarProductoCarrito,
        vaciarCarrito,
        showCarrito,
        handleOpenCarrito,
        handleCloseCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}