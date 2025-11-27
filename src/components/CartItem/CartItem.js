import React from 'react';
import { useCart } from '../../context/CartContext';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { removeItem, updateItemQuantity } = useCart();

  const handleIncrement = () => {
    if (item.quantity < item.stock) {
      updateItemQuantity(item.id, item.quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateItemQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.name} />
      </div>
      
      <div className="cart-item-details">
        <h3 className="cart-item-name">{item.name}</h3>
        <p className="cart-item-category">{item.category}</p>
        
        <div className="cart-item-actions">
          <div className="cart-item-quantity">
            <button 
              onClick={handleDecrement}
              disabled={item.quantity <= 1}
              className="quantity-btn"
            >
              -
            </button>
            <span className="quantity-display">{item.quantity}</span>
            <button 
              onClick={handleIncrement}
              disabled={item.quantity >= item.stock}
              className="quantity-btn"
            >
              +
            </button>
          </div>
          
          <button 
            onClick={handleRemove}
            className="remove-btn"
          >
            Eliminar
          </button>
        </div>
      </div>
      
      <div className="cart-item-price">
        <p className="item-unit-price">${item.price.toFixed(2)}</p>
        <p className="item-total-price">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;

