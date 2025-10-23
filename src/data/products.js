// Base de datos simulada de productos
const products = [
  {
    id: 1,
    name: "Laptop HP Pavilion",
    category: "computadoras",
    price: 899.99,
    stock: 10,
    description: "Laptop potente con procesador Intel Core i7, 16GB RAM, SSD 512GB. Ideal para trabajo y gaming.",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400"
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    category: "celulares",
    price: 1199.99,
    stock: 15,
    description: "El último iPhone con chip A17 Pro, cámara de 48MP y pantalla Super Retina XDR de 6.1 pulgadas.",
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400"
  },
  {
    id: 3,
    name: "Samsung Galaxy S24",
    category: "celulares",
    price: 999.99,
    stock: 20,
    description: "Smartphone premium con pantalla AMOLED, cámara de 200MP y batería de larga duración.",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400"
  },
  {
    id: 4,
    name: "MacBook Pro M3",
    category: "computadoras",
    price: 1999.99,
    stock: 8,
    description: "La laptop más potente de Apple con chip M3, 32GB RAM unificada y pantalla Liquid Retina XDR.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400"
  },
  {
    id: 5,
    name: "iPad Air",
    category: "tablets",
    price: 599.99,
    stock: 12,
    description: "Tablet versátil con chip M1, pantalla Liquid Retina de 10.9 pulgadas y compatibilidad con Apple Pencil.",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400"
  },
  {
    id: 6,
    name: "Samsung Galaxy Tab S9",
    category: "tablets",
    price: 799.99,
    stock: 10,
    description: "Tablet Android premium con pantalla AMOLED de 11 pulgadas y S Pen incluido.",
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400"
  },
  {
    id: 7,
    name: "Dell XPS 13",
    category: "computadoras",
    price: 1299.99,
    stock: 7,
    description: "Ultrabook elegante y potente con pantalla InfinityEdge y procesador Intel de 13ª generación.",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400"
  },
  {
    id: 8,
    name: "Google Pixel 8",
    category: "celulares",
    price: 699.99,
    stock: 18,
    description: "Smartphone con la mejor cámara computacional, chip Google Tensor G3 y Android puro.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400"
  },
  {
    id: 9,
    name: "Microsoft Surface Pro 9",
    category: "tablets",
    price: 1099.99,
    stock: 9,
    description: "2 en 1 versátil que funciona como tablet y laptop con procesador Intel Core de 12ª generación.",
    image: "https://images.unsplash.com/photo-1585790050230-5dd28404f904?w=400"
  },
  {
    id: 10,
    name: "Lenovo ThinkPad X1",
    category: "computadoras",
    price: 1499.99,
    stock: 6,
    description: "Laptop empresarial de alta gama con seguridad mejorada y durabilidad certificada.",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400"
  },
  {
    id: 11,
    name: "OnePlus 12",
    category: "celulares",
    price: 799.99,
    stock: 14,
    description: "Flagship killer con carga rápida de 100W, pantalla AMOLED a 120Hz y cámaras Hasselblad.",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400"
  },
  {
    id: 12,
    name: "Amazon Fire HD 10",
    category: "tablets",
    price: 149.99,
    stock: 25,
    description: "Tablet económica perfecta para entretenimiento con pantalla Full HD de 10.1 pulgadas.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400"
  }
];

// Función que simula una llamada a API - devuelve todos los productos
export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 1500); // Simula un retardo de 1.5 segundos
  });
};

// Función que devuelve productos filtrados por categoría
export const getProductsByCategory = (categoryId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredProducts = products.filter(
        (product) => product.category === categoryId
      );
      resolve(filteredProducts);
    }, 1500);
  });
};

// Función que devuelve un producto específico por ID
export const getProductById = (productId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = products.find((prod) => prod.id === parseInt(productId));
      if (product) {
        resolve(product);
      } else {
        reject(new Error("Producto no encontrado"));
      }
    }, 1500);
  });
};

// Función que devuelve las categorías disponibles
export const getCategories = () => {
  const categories = [
    { id: "computadoras", name: "Computadoras" },
    { id: "celulares", name: "Celulares" },
    { id: "tablets", name: "Tablets" }
  ];
  return categories;
};

