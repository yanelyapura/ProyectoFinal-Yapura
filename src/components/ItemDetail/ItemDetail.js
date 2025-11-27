import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import ItemCount from '../ItemCount/ItemCount';
import './ItemDetail.css';

const ItemDetail = ({ product }) => {
  const { addItem } = useCart();
  const [quantityAdded, setQuantityAdded] = useState(0);

  const handleAdd = (quantity) => {
    addItem(product, quantity);
    setQuantityAdded(quantity);
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
            {quantityAdded === 0 ? (
              <ItemCount 
                stock={product.stock} 
                initial={1} 
                onAdd={handleAdd}
              />
            ) : (
              <div className="added-to-cart">
                <p className="success-message">
                  ✓ Se agregaron {quantityAdded} unidad(es) al carrito
                </p>
                <div className="action-buttons">
                  <Link to="/cart" className="btn-go-to-cart">
                    Ir al carrito
                  </Link>
                  <Link to="/" className="btn-continue-shopping">
                    Seguir comprando
                  </Link>
                </div>
              </div>
            )}
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

