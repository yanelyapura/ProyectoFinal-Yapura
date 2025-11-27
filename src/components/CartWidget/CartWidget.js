import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './CartWidget.css';

const CartWidget = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <Link to="/cart" className="cart-widget">
      <svg 
        className="cart-icon" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M3 3H5L5.4 5M7 13L5.4 5M7 13H17M7 13L6.4 15M17 13L19 5H5.4M17 13L17.6 15M6.4 15C6.4 15 6 17 6 17H18L17.6 15M6.4 15H17.6M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM18 20C18 20.5523 17.5523 21 17 21C16.4477 21 16 20.5523 16 20C16 19.4477 16.4477 19 17 19C17.5523 19 18 19.4477 18 20Z" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
      {totalItems > 0 && (
        <span className="cart-badge">{totalItems}</span>
      )}
    </Link>
  );
};

export default CartWidget;

