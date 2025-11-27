import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrders } from '../../services/firebase';
import Loading from '../Loading/Loading';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getOrders()
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar órdenes:", error);
        setLoading(false);
      });
  }, []);

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
    return <Loading message="Cargando tus órdenes..." />;
  }

  if (orders.length === 0) {
    return (
      <div className="orders-empty">
        <div className="empty-orders-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2>No tienes órdenes aún</h2>
        <p>Cuando realices una compra, aquí aparecerán tus órdenes</p>
        <Link to="/" className="btn-start-shopping">
          Comenzar a comprar
        </Link>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1>Mis Órdenes</h1>
        <p className="orders-count">{orders.length} orden{orders.length !== 1 ? 'es' : ''} realizada{orders.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-card-header">
              <div className="order-info">
                <h3 className="order-id">Orden #{order.id.slice(0, 8).toUpperCase()}</h3>
                <p className="order-date">{formatDate(order.date)}</p>
              </div>
              <span className={`order-status ${getStatusClass(order.status)}`}>
                {getStatusText(order.status)}
              </span>
            </div>

            <div className="order-card-body">
              <div className="order-items-preview">
                <p className="items-count">
                  {order.totalItems || order.items?.length || 0} producto{(order.totalItems || order.items?.length) !== 1 ? 's' : ''}
                </p>
                {order.items && order.items.length > 0 && (
                  <div className="items-list-preview">
                    {order.items.slice(0, 3).map((item, index) => (
                      <span key={index} className="item-name">
                        {item.name}
                        {index < Math.min(order.items.length - 1, 2) && ', '}
                      </span>
                    ))}
                    {order.items.length > 3 && <span className="more-items">y más...</span>}
                  </div>
                )}
              </div>

              <div className="order-total">
                <span className="total-label">Total:</span>
                <span className="total-amount">${order.total?.toFixed(2) || '0.00'}</span>
              </div>
            </div>

            <div className="order-card-footer">
              <Link to={`/orders/${order.id}`} className="btn-view-order">
                Ver detalle
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

