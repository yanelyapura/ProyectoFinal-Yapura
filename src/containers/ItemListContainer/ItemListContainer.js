import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from '../../components/ItemList/ItemList';
import Loading from '../../components/Loading/Loading';
import { getProducts, getProductsByCategory } from '../../data/products';
import './ItemListContainer.css';

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    
    const fetchProducts = categoryId 
      ? getProductsByCategory(categoryId)
      : getProducts();

    fetchProducts
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar productos:", error);
        setLoading(false);
      });
  }, [categoryId]); // El array de dependencias incluye categoryId

  const getGreeting = () => {
    if (categoryId) {
      return `Productos de ${categoryId}`;
    }
    return "Bienvenido a nuestra tienda";
  };

  return (
    <div className="item-list-container">
      <div className="container-header">
        <h1 className="greeting">{getGreeting()}</h1>
        {!loading && (
          <p className="products-count">
            {products.length} {products.length === 1 ? 'producto encontrado' : 'productos encontrados'}
          </p>
        )}
      </div>
      
      {loading ? (
        <Loading message="Cargando productos..." />
      ) : products.length > 0 ? (
        <ItemList products={products} />
      ) : (
        <div className="no-products">
          <p>No se encontraron productos en esta categoría.</p>
        </div>
      )}
    </div>
  );
};

export default ItemListContainer;

