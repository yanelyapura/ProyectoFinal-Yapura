# Mi Tienda Online - Segunda Entrega React

Aplicación de e-commerce desarrollada con React y React Router para la navegación entre vistas.

## 🚀 Características Implementadas

### Navegación con React Router
- ✅ Catálogo principal de productos
- ✅ Filtrado de productos por categorías
- ✅ Vista detallada de cada producto
- ✅ Rutas dinámicas con parámetros
- ✅ Página 404 para rutas no encontradas

### Componentes

#### Componentes Contenedores
- **ItemListContainer**: Maneja el estado y efectos para el listado de productos
- **ItemDetailContainer**: Maneja el estado y efectos para el detalle de un producto

#### Componentes de Presentación
- **NavBar**: Barra de navegación con menú de categorías
- **ItemList**: Lista de productos usando Array.map()
- **Item**: Tarjeta individual de producto
- **ItemDetail**: Vista detallada de un producto
- **ItemCount**: Contador de cantidad para agregar al carrito
- **Loading**: Indicador de carga
- **NotFound**: Página 404

### Funcionalidades

1. **Navegación por categorías**
   - Menú desplegable con todas las categorías
   - Filtrado dinámico de productos
   - URL amigables: `/category/computadoras`, `/category/celulares`, etc.

2. **Detalle de productos**
   - Información completa del producto
   - Imágenes de alta calidad
   - Stock disponible
   - Contador para seleccionar cantidad
   - Enlace de regreso al catálogo

3. **Promesas asíncronas**
   - Simulación de llamadas a API con retardo
   - Estados de carga mientras se obtienen datos
   - Manejo de errores

4. **Hooks implementados**
   - `useParams()`: Para leer parámetros de la URL
   - `useState()`: Para manejo de estado
   - `useEffect()`: Para efectos secundarios con dependencias correctas

## 📦 Instalación

1. Clona este repositorio:
\`\`\`bash
git clone <tu-repositorio>
cd segundaEntregaReact
\`\`\`

2. Instala las dependencias:
\`\`\`bash
npm install
\`\`\`

3. Inicia el servidor de desarrollo:
\`\`\`bash
npm start
\`\`\`

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador

## 🗂️ Estructura del Proyecto

\`\`\`
src/
├── components/          # Componentes de presentación
│   ├── NavBar/
│   ├── Item/
│   ├── ItemList/
│   ├── ItemDetail/
│   ├── ItemCount/
│   ├── Loading/
│   └── NotFound/
├── containers/          # Componentes contenedores
│   ├── ItemListContainer/
│   └── ItemDetailContainer/
├── data/                # Datos simulados y funciones asíncronas
│   └── products.js
├── App.js              # Configuración de rutas
├── App.css             # Estilos globales
├── index.js            # Punto de entrada
└── index.css           # Estilos base
\`\`\`

## 🛣️ Rutas Implementadas

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | ItemListContainer | Catálogo completo |
| `/category/:categoryId` | ItemListContainer | Productos por categoría |
| `/item/:itemId` | ItemDetailContainer | Detalle de producto |
| `/cart` | Coming Soon | Carrito (próxima entrega) |
| `*` | NotFound | Página 404 |

## 🎨 Diseño

- Interfaz moderna y responsiva
- Gradientes y animaciones suaves
- Diseño mobile-first
- Paleta de colores profesional
- Transiciones fluidas entre vistas

## 📚 Tecnologías Utilizadas

- React 18.2.0
- React Router DOM 6.20.0
- CSS3 (Grid, Flexbox, Animations)
- JavaScript ES6+

## ✅ Requisitos Cumplidos

- ✅ Implementación de React Router con todas las rutas necesarias
- ✅ División entre componentes contenedores y de presentación
- ✅ Llamadas asíncronas con Promises y retardos
- ✅ Uso de Array.map() con prop "key"
- ✅ Uso de useParams() para leer segmentos de URL
- ✅ Arrays de dependencias correctos en useEffect
- ✅ Ruta única para categorías (no duplicación)
- ✅ Ruta 404 implementada
- ✅ ItemCount incluido en ItemDetail

## 🔜 Próximas Entregas

- Funcionalidad completa del carrito de compras
- Context API para estado global
- Persistencia de datos
- Integración con backend/Firebase

## 👤 Autor

Proyecto desarrollado como parte del curso de React en Coderhouse.

## 📝 Notas

Este proyecto utiliza imágenes de Unsplash para demostración. En producción, se deben usar imágenes propias y optimizadas.

