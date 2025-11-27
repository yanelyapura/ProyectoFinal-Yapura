import React, { createContext, useState, useContext } from 'react';

// Crear el contexto del carrito
const CartContext = createContext();

// Hook personalizado para usar el contexto del carrito
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

// Provider del carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Agregar item al carrito
  const addItem = (item, quantity) => {
    // Verificar si el producto ya está en el carrito
    const existingItem = cart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      // Si existe, actualizar la cantidad
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + quantity }
          : cartItem
      ));
    } else {
      // Si no existe, agregarlo
      setCart([...cart, { ...item, quantity }]);
    }
  };

  // Eliminar item del carrito
  const removeItem = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  // Limpiar todo el carrito
  const clear = () => {
    setCart([]);
  };

  // Verificar si un item está en el carrito
  const isInCart = (itemId) => {
    return cart.some(item => item.id === itemId);
  };

  // Obtener la cantidad total de items en el carrito
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Obtener el precio total del carrito
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Actualizar la cantidad de un item específico
  const updateItemQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
    } else {
      setCart(cart.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const value = {
    cart,
    addItem,
    removeItem,
    clear,
    isInCart,
    getTotalItems,
    getTotalPrice,
    updateItemQuantity
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

