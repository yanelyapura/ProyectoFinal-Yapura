import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrderById } from '../../services/firebase';
import Loading from '../Loading/Loading';
import NotFound from '../NotFound/NotFound';
import './OrderDetail.css';

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    getOrderById(orderId)
      .then((data) => {
        setOrder(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar la orden:", error);
        setError(true);
        setLoading(false);
      });
  }, [orderId]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    // Manejar diferentes formatos de fecha
    let date;
    if (typeof dateString === 'string') {
      date = new Date(dateString);
    } else if (dateString.seconds) {
      // Firebase Timestamp
      date = new Date(dateString.seconds * 1000);
    } else if (dateString.toDate) {
      // Firebase Timestamp con método toDate()
      date = dateString.toDate();
    } else {
      date = new Date(dateString);
    }
    
    if (isNaN(date.getTime())) {
      return 'Fecha no disponible';
    }
    
    return date.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusText = (status) => {
    const statusMap = {
      'pending': 'Pendiente',
      'generada': 'Generada',
      'processing': 'Procesando',
      'shipped': 'Enviado',
      'delivered': 'Entregado',
      'cancelled': 'Cancelado'
    };
    return statusMap[status] || status;
  };

  const getStatusClass = (status) => {
    const classMap = {
      'pending': 'status-pending',
      'generada': 'status-pending',
      'processing': 'status-processing',
      'shipped': 'status-shipped',
      'delivered': 'status-delivered',
      'cancelled': 'status-cancelled'
    };
    return classMap[status] || 'status-pending';
  };

  if (loading) {
    return <Loading message="Cargando detalle de la orden..." />;
  }

  if (error || !order) {
    return (
      <div className="order-not-found">
        <NotFound />
        <Link to="/orders" className="btn-back-orders">
          Ver todas mis órdenes
        </Link>
      </div>
    );
  }

  return (
    <div className="order-detail-container">
      <div className="order-detail-header">
        <Link to="/orders" className="back-link">
          ← Volver a mis órdenes
        </Link>
        
        <div className="order-header-info">
          <h1 className="order-title">Orden #{order.id.slice(0, 8).toUpperCase()}</h1>
          <span className={`order-status-badge ${getStatusClass(order.status)}`}>
            {getStatusText(order.status)}
          </span>
        </div>

        <p className="order-date">Realizada el {formatDate(order.date)}</p>
      </div>

      <div className="order-detail-content">
        <div className="order-main-content">
          {/* Items de la orden */}
          <div className="order-section">
            <h2 className="section-title">Productos</h2>
            <div className="order-items">
              {order.items && order.items.map((item, index) => (
                <div key={index} className="order-item">
                  {item.image && (
                    <div className="order-item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                  )}
                  <div className="item-info">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-quantity">Cantidad: {item.quantity} unidad{item.quantity !== 1 ? 'es' : ''}</p>
                    <p className="item-unit-price">Precio unitario: ${item.price?.toFixed(2)}</p>
                  </div>
                  <div className="item-pricing">
                    <p className="item-total-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Información del comprador */}
          {order.buyer && (
            <div className="order-section">
              <h2 className="section-title">Información de entrega</h2>
              <div className="buyer-info">
                <div className="info-row">
                  <span className="info-label">Nombre:</span>
                  <span className="info-value">
                    {order.buyer.nombre || order.buyer.name} {order.buyer.apellido || ''}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{order.buyer.email}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Teléfono:</span>
                  <span className="info-value">{order.buyer.telefono || order.buyer.phone}</span>
                </div>
                {order.buyer.address && (
                  <>
                    <div className="info-row">
                      <span className="info-label">Dirección:</span>
                      <span className="info-value">{order.buyer.address}</span>
                    </div>
                    {order.buyer.city && (
                      <div className="info-row">
                        <span className="info-label">Ciudad:</span>
                        <span className="info-value">
                          {order.buyer.city}
                          {order.buyer.zipCode && `, CP: ${order.buyer.zipCode}`}
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Resumen de la orden */}
        <div className="order-sidebar">
          <div className="order-summary">
            <h2 className="summary-title">Resumen</h2>
            
            <div className="summary-row">
              <span>Productos ({order.totalItems || order.items?.length || 0})</span>
              <span>${order.total?.toFixed(2) || '0.00'}</span>
            </div>

            <div className="summary-row summary-total">
              <span>Total</span>
              <span className="total-amount">${order.total?.toFixed(2) || '0.00'}</span>
            </div>
          </div>

          <div className="order-actions">
            <Link to="/" className="btn-continue-shopping">
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;

