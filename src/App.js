import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './containers/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './containers/ItemDetailContainer/ItemDetailContainer';
import Cart from './components/Cart/Cart';
import CheckoutForm from './components/CheckoutForm/CheckoutForm';
import SearchResults from './components/SearchResults/SearchResults';
import Orders from './components/Orders/Orders';
import OrderDetail from './components/OrderDetail/OrderDetail';
import NotFound from './components/NotFound/NotFound';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="App">
          <NavBar />
          
          <main className="main-content">
            <Routes>
              {/* Ruta principal - Catálogo completo */}
              <Route path="/" element={<ItemListContainer />} />
              
              {/* Ruta de categoría - Catálogo filtrado */}
              <Route path="/category/:categoryId" element={<ItemListContainer />} />
              
              {/* Ruta de detalle de producto */}
              <Route path="/item/:itemId" element={<ItemDetailContainer />} />
              
              {/* Ruta de búsqueda */}
              <Route path="/search" element={<SearchResults />} />
              
              {/* Ruta del carrito */}
              <Route path="/cart" element={<Cart />} />
              
              {/* Ruta del checkout */}
              <Route path="/checkout" element={<CheckoutForm />} />
              
              {/* Ruta de órdenes */}
              <Route path="/orders" element={<Orders />} />
              
              {/* Ruta de detalle de orden */}
              <Route path="/orders/:orderId" element={<OrderDetail />} />
              
              {/* Ruta 404 - Cualquier ruta no definida */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          
          <footer className="footer">
            <p>&copy; 2025 Mi Tienda Online. Todos los derechos reservados.</p>
          </footer>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;

