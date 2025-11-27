import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { createOrder } from '../../services/firebase';
import Loading from '../Loading/Loading';
import './CheckoutForm.css';

const CheckoutForm = () => {
  const { cart, getTotalPrice, clear } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'La dirección es requerida';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'La ciudad es requerida';
    }
    
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'El código postal es requerido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (cart.length === 0) {
      alert('El carrito está vacío');
      navigate('/');
      return;
    }
    
    setLoading(true);
    
    try {
      const order = {
        buyer: formData,
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image // Incluir imagen del producto
        })),
        total: getTotalPrice(),
        totalItems: cart.reduce((sum, item) => sum + item.quantity, 0),
        date: new Date().toISOString()
      };
      
      const id = await createOrder(order);
      setOrderId(id);
      clear();
    } catch (error) {
      console.error('Error al crear la orden:', error);
      alert('Hubo un error al procesar tu orden. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading message="Procesando tu orden..." />;
  }

  if (orderId) {
    return (
      <div className="checkout-success">
        <div className="success-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" 
              fill="currentColor"
            />
          </svg>
        </div>
        <h2>¡Compra realizada con éxito!</h2>
        <p className="order-id">ID de tu orden: <strong>{orderId}</strong></p>
        <p className="success-message">
          Recibirás un email de confirmación en {formData.email}
        </p>
        <button 
          onClick={() => navigate('/')}
          className="btn-back-home"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <div className="checkout-form-section">
          <h2 className="checkout-title">Finalizar compra</h2>
          
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-section">
              <h3>Datos de contacto</h3>
              
              <div className="form-group">
                <label htmlFor="name">Nombre completo</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
            </div>
            
            <div className="form-section">
              <h3>Datos de envío</h3>
              
              <div className="form-group">
                <label htmlFor="address">Dirección</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={errors.address ? 'error' : ''}
                />
                {errors.address && <span className="error-message">{errors.address}</span>}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">Ciudad</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={errors.city ? 'error' : ''}
                  />
                  {errors.city && <span className="error-message">{errors.city}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="zipCode">Código Postal</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className={errors.zipCode ? 'error' : ''}
                  />
                  {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
                </div>
              </div>
            </div>
            
            <button type="submit" className="btn-submit-order">
              Confirmar compra
            </button>
          </form>
        </div>
        
        <div className="checkout-summary">
          <h3>Resumen de compra</h3>
          
          <div className="summary-items">
            {cart.map(item => (
              <div key={item.id} className="summary-item">
                <img src={item.image} alt={item.name} />
                <div className="summary-item-info">
                  <p className="summary-item-name">{item.name}</p>
                  <p className="summary-item-quantity">Cantidad: {item.quantity}</p>
                </div>
                <p className="summary-item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          
          <div className="summary-total">
            <span>Total</span>
            <span className="total-amount">${getTotalPrice().toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;

