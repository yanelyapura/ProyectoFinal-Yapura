import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from '../../components/ItemDetail/ItemDetail';
import Loading from '../../components/Loading/Loading';
import NotFound from '../../components/NotFound/NotFound';
import { getProductById } from '../../services/firebase';

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
  }, [itemId]);

  if (loading) {
    return <Loading message="Cargando detalles del producto..." />;
  }

  if (error || !product) {
    return <NotFound />;
  }

  return <ItemDetail product={product} />;
};

export default ItemDetailContainer;

