# Instrucciones para completar la entrega

## Paso 1: Instalar dependencias

Abre una terminal en la carpeta del proyecto y ejecuta:

\`\`\`bash
npm install
\`\`\`

## Paso 2: Probar la aplicación

Para ejecutar el proyecto en modo desarrollo:

\`\`\`bash
npm start
\`\`\`

La aplicación se abrirá en http://localhost:3000

## Paso 3: Hacer commit con el formato correcto

Los archivos ya están en el área de staging. Para hacer el commit con el formato requerido, ejecuta:

\`\`\`bash
git commit -m "NavegaLasRutas+TuApellido"
\`\`\`

Reemplaza "TuApellido" por tu apellido real. Por ejemplo:
- Si tu apellido es "Fernandez", el comando sería: `git commit -m "NavegaLasRutas+Fernandez"`
- Si tu apellido es "González", el comando sería: `git commit -m "NavegaLasRutas+González"`

## Paso 4: Obtener el link del último commit

Después de hacer el commit, puedes ver el hash del commit con:

\`\`\`bash
git log --oneline -1
\`\`\`

Si ya tienes el repositorio en GitHub/GitLab:

\`\`\`bash
git push origin main
\`\`\`

Luego ve a tu repositorio online y copia el link del último commit.

## Navegación de la aplicación

1. **Página principal**: Muestra todos los productos
2. **Categorías**: Haz clic en "Categorías" en el menú para filtrar por:
   - Computadoras
   - Celulares
   - Tablets
3. **Detalle de producto**: Haz clic en "Ver detalle" en cualquier producto
4. **Contador**: En la página de detalle, puedes aumentar/disminuir la cantidad y agregar al carrito

## Características implementadas

✅ React Router con navegación completa
✅ Componentes contenedores (ItemListContainer, ItemDetailContainer)
✅ Componentes de presentación (ItemList, ItemDetail, Item, NavBar, etc.)
✅ Promises asíncronas con retardo simulado
✅ useParams() para leer parámetros de URL
✅ Arrays de dependencias correctos en useEffect
✅ Ruta única para categorías (no duplicación)
✅ Ruta 404 para páginas no encontradas
✅ ItemCount integrado en ItemDetail
✅ Diseño moderno y responsivo
✅ 12 productos de ejemplo en 3 categorías

## Estructura del proyecto

\`\`\`
src/
├── components/          # Componentes de presentación
│   ├── NavBar/         # Barra de navegación
│   ├── Item/           # Tarjeta de producto
│   ├── ItemList/       # Lista de productos
│   ├── ItemDetail/     # Detalle del producto
│   ├── ItemCount/      # Contador de cantidad
│   ├── Loading/        # Indicador de carga
│   └── NotFound/       # Página 404
├── containers/         # Componentes contenedores
│   ├── ItemListContainer/     # Contenedor del listado
│   └── ItemDetailContainer/   # Contenedor del detalle
├── data/
│   └── products.js     # Datos y funciones asíncronas
├── App.js              # Configuración de rutas
└── index.js            # Punto de entrada
\`\`\`

## Rutas implementadas

- `/` - Catálogo completo
- `/category/:categoryId` - Productos filtrados por categoría
- `/item/:itemId` - Detalle de un producto específico
- `/cart` - Carrito (placeholder para próxima entrega)
- `*` - Página 404 para rutas no encontradas

