import React from 'react';
import { Link } from 'react-router-dom';
import './Item.css';

const Item = ({ id, name, price, image, stock }) => {
  return (
    <div className="item-card">
      <div className="item-image-container">
        <img src={image} alt={name} className="item-image" />
        {stock < 5 && stock > 0 && (
          <span className="stock-badge low-stock">¡Últimas unidades!</span>
        )}
        {stock === 0 && (
          <span className="stock-badge no-stock">Sin stock</span>
        )}
      </div>
      
      <div className="item-content">
        <h3 className="item-name">{name}</h3>
        <p className="item-price">${price.toFixed(2)}</p>
        <p className="item-stock">Stock disponible: {stock}</p>
        
        <Link to={`/item/${id}`} className="item-button">
          Ver detalle
        </Link>
      </div>
    </div>
  );
};

export default Item;

