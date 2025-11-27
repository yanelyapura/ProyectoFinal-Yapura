import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { getCategories } from '../../services/firebase';
import CartWidget from '../CartWidget/CartWidget';
import './NavBar.css';

const NavBar = () => {
  const categories = getCategories();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <svg className="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3H5L5.4 5M7 13L5.4 5M7 13H17M7 13L6.4 15M17 13L19 5H5.4M17 13L17.6 15M6.4 15C6.4 15 6 17 6 17H18L17.6 15M6.4 15H17.6M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM18 20C18 20.5523 17.5523 21 17 21C16.4477 21 16 20.5523 16 20C16 19.4477 16.4477 19 17 19C17.5523 19 18 19.4477 18 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="logo-text">Mi Tienda</span>
        </Link>
        
        <form className="navbar-search" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Buscar productos, marcas y más..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-button">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>
        
        <ul className="navbar-menu">
          <li className="navbar-item">
            <NavLink 
              to="/" 
              end
              className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}
            >
              Inicio
            </NavLink>
          </li>
          
          <li className="navbar-item dropdown">
            <span className="navbar-link">Categorías ▾</span>
            <ul className="dropdown-menu">
              {categories.map((category) => (
                <li key={category.id}>
                  <NavLink 
                    to={`/category/${category.id}`} 
                    className={({ isActive }) => isActive ? "dropdown-link active" : "dropdown-link"}
                  >
                    {category.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
          
          <li className="navbar-item">
            <NavLink 
              to="/orders" 
              className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}
            >
              Mis Órdenes
            </NavLink>
          </li>
          
          <li className="navbar-item">
            <CartWidget />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
