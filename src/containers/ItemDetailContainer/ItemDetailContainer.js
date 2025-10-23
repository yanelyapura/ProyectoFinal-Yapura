import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from '../../components/ItemDetail/ItemDetail';
import Loading from '../../components/Loading/Loading';
import NotFound from '../../components/NotFound/NotFound';
import { getProductById } from '../../data/products';

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { itemId } = useParams();

  useEffect(() => {
    setLoading(true);
    setError(false);

    getProductById(itemId)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar el producto:", error);
        setError(true);
        setLoading(false);
      });
  }, [itemId]); // El array de dependencias incluye itemId

  const handleAddToCart = (quantity) => {
    console.log(`Agregando ${quantity} unidad(es) del producto ${product.name} al carrito`);
    // Aquí se implementará la lógica del carrito en entregas futuras
  };

  if (loading) {
    return <Loading message="Cargando detalles del producto..." />;
  }

  if (error || !product) {
    return <NotFound />;
  }

  return <ItemDetail product={product} onAdd={handleAddToCart} />;
};

export default ItemDetailContainer;

