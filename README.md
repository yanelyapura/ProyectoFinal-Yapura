# 🛒 E-Commerce React + Firebase

E-Commerce SPA desarrollado con React y Firebase/Firestore.

## 🛠️ Tecnologías

- React 18.2.0
- React Router DOM 6.20.0
- Firebase 12.6.0 (Firestore)
- Context API
- CSS3

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/yanelyapura/ProyectoFinal-Yapura.git
cd ProyectoFinal-Yapura
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar la aplicación

```bash
npm start
```

La aplicación se abrirá en [http://localhost:3000](http://localhost:3000)

## ✨ Funcionalidades

- Catálogo de productos con filtrado por categorías
- Búsqueda de productos
- Carrito de compras (Context API)
- Proceso de checkout completo
- Historial de órdenes
- Integración con Firebase/Firestore

## 📦 Estructura de Componentes

```
App
├── NavBar (CartWidget)
├── ItemListContainer (ItemList → Item)
├── ItemDetailContainer (ItemDetail → ItemCount)
├── Cart (CartItem)
├── CheckoutForm
├── Orders
└── OrderDetail
```

## 🔥 Firebase

El proyecto está conectado a Firebase con las credenciales configuradas en `src/services/firebase.js`. Los productos y órdenes se almacenan en Firestore.

