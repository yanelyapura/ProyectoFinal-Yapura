import React from 'react';
import { Link } from 'react-router-dom';
import ItemCount from '../ItemCount/ItemCount';
import './ItemDetail.css';

const ItemDetail = ({ product, onAdd }) => {
  const handleAdd = (quantity) => {
    onAdd(quantity);
    alert(`Se agregaron ${quantity} unidad(es) de "${product.name}" al carrito`);
  };

  return (
    <div className="item-detail">
      <div className="detail-container">
        <div className="detail-image-section">
          <img src={product.image} alt={product.name} className="detail-image" />
        </div>
        
        <div className="detail-info-section">
          <Link to="/" className="back-link">← Volver al catálogo</Link>
          
          <h1 className="detail-title">{product.name}</h1>
          
          <div className="detail-category">
            <span>Categoría: </span>
            <Link to={`/category/${product.category}`} className="category-link">
              {product.category}
            </Link>
          </div>
          
          <p className="detail-description">{product.description}</p>
          
          <div className="detail-price-section">
            <span className="detail-price">${product.price.toFixed(2)}</span>
            <span className="detail-stock">
              {product.stock > 0 ? (
                `${product.stock} unidades disponibles`
              ) : (
                <span className="out-of-stock">Sin stock</span>
              )}
            </span>
          </div>
          
          <div className="detail-actions">
            <ItemCount 
              stock={product.stock} 
              initial={1} 
              onAdd={handleAdd}
            />
          </div>
          
          <div className="detail-features">
            <h3>Características destacadas:</h3>
            <ul>
              <li>✓ Garantía oficial</li>
              <li>✓ Envío gratis en compras mayores a $100</li>
              <li>✓ Devolución sin cargo dentro de 30 días</li>
              <li>✓ Soporte técnico especializado</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;

