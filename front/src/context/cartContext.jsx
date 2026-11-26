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

  // Disminuye 1 unidad por índice sin preguntar confirmación
  const disminuirUnidadCarrito = (index) => {
    setCarrito((prev) => prev.filter((_, i) => i !== index));
  };

  // Elimina TODAS las unidades de un producto por su ID (con una sola confirmación)
  const eliminarTodosDelProducto = (idProducto, nombreProducto) => {
    if (window.confirm(`¿Deseas eliminar todas las unidades de "${nombreProducto}" del carrito?`)) {
      setCarrito((prev) =>
        prev.filter((item) => {
          const itemId = item.id_producto || item.idProducto || item.id;
          return Number(itemId) !== Number(idProducto);
        })
      );
      return true;
    }
    return false;
  };

  const eliminarProductoCarrito = (index) => {
    if (window.confirm(`¿Deseas eliminar ${carrito[index]?.nombre} del carrito?`)) {
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
        disminuirUnidadCarrito,
        eliminarTodosDelProducto,
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