import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartItem from '../CartItem/CartItem';
import './Cart.css';

const Cart = () => {
  const { cart, getTotalPrice, clear } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="empty-cart-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M3 3H5L5.4 5M7 13L5.4 5M7 13H17M7 13L6.4 15M17 13L19 5H5.4M17 13L17.6 15M6.4 15C6.4 15 6 17 6 17H18L17.6 15M6.4 15H17.6M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM18 20C18 20.5523 17.5523 21 17 21C16.4477 21 16 20.5523 16 20C16 19.4477 16.4477 19 17 19C17.5523 19 18 19.4477 18 20Z" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2>Tu carrito está vacío</h2>
        <p>¡Descubrí los productos que tenemos para vos!</p>
        <Link to="/" className="btn-continue-shopping">
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-content">
        <div className="cart-items-section">
          <h2 className="cart-title">Carrito de compras</h2>
          <div className="cart-items">
            {cart.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <button 
            onClick={clear}
            className="btn-clear-cart"
          >
            Vaciar carrito
          </button>
        </div>
        
        <div className="cart-summary">
          <h3 className="summary-title">Resumen de compra</h3>
          
          <div className="summary-detail">
            <span>Productos ({cart.length})</span>
            <span>${getTotalPrice().toFixed(2)}</span>
          </div>
          
          <div className="summary-total">
            <span>Total</span>
            <span className="total-price">${getTotalPrice().toFixed(2)}</span>
          </div>
          
          <Link to="/checkout" className="btn-checkout">
            Continuar compra
          </Link>
          
          <Link to="/" className="btn-continue-shopping-summary">
            Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;

