import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './containers/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './containers/ItemDetailContainer/ItemDetailContainer';
import NotFound from './components/NotFound/NotFound';
import './App.css';

function App() {
  return (
    <BrowserRouter>
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
            
            {/* Ruta temporal para el carrito (próxima entrega) */}
            <Route 
              path="/cart" 
              element={
                <div className="coming-soon">
                  <h2>🛒 Carrito de Compras</h2>
                  <p>Esta funcionalidad estará disponible en la próxima entrega</p>
                </div>
              } 
            />
            
            {/* Ruta 404 - Cualquier ruta no definida */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <footer className="footer">
          <p>&copy; 2025 Mi Tienda Online. Todos los derechos reservados.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

