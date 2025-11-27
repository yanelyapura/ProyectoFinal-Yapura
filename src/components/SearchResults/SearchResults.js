import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getProducts } from '../../services/firebase';
import ItemList from '../ItemList/ItemList';
import Loading from '../Loading/Loading';
import './SearchResults.css';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('q') || '';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    getProducts()
      .then((data) => {
        // Filtrar productos por el término de búsqueda
        const filtered = data.filter(product => 
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setProducts(filtered);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al buscar productos:", error);
        setLoading(false);
      });
  }, [searchTerm]);

  if (loading) {
    return <Loading message="Buscando productos..." />;
  }

  return (
    <div className="search-results-container">
      <div className="search-header">
        <h1 className="search-title">
          {products.length > 0 
            ? `${products.length} resultado${products.length !== 1 ? 's' : ''} para "${searchTerm}"`
            : `No se encontraron resultados para "${searchTerm}"`
          }
        </h1>
        <Link to="/" className="back-to-home">
          ← Volver al catálogo completo
        </Link>
      </div>

      {products.length > 0 ? (
        <ItemList products={products} />
      ) : (
        <div className="no-results">
          <div className="no-results-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2>No encontramos lo que buscas</h2>
          <p>Intenta con otros términos o explora nuestro catálogo completo</p>
          <Link to="/" className="btn-browse-all">
            Ver todos los productos
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchResults;

