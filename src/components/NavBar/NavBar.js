import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../data/products';
import './NavBar.css';

const NavBar = () => {
  const categories = getCategories();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🛒 Mi Tienda Online
        </Link>
        
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              Inicio
            </Link>
          </li>
          
          <li className="navbar-item dropdown">
            <span className="navbar-link">Categorías ▾</span>
            <ul className="dropdown-menu">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link 
                    to={`/category/${category.id}`} 
                    className="dropdown-link"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          
          <li className="navbar-item">
            <Link to="/cart" className="navbar-link cart-link">
              🛒 Carrito
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;

