import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  query, 
  where,
  addDoc,
  serverTimestamp 
} from 'firebase/firestore';

// Datos mockeados como fallback
const mockProducts = [
  {
    id: "1",
    name: "Laptop HP Pavilion",
    category: "computadoras",
    price: 899.99,
    stock: 10,
    description: "Laptop potente con procesador Intel Core i7, 16GB RAM, SSD 512GB. Ideal para trabajo y gaming.",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400"
  },
  {
    id: "2",
    name: "iPhone 15 Pro",
    category: "celulares",
    price: 1199.99,
    stock: 15,
    description: "El último iPhone con chip A17 Pro, cámara de 48MP y pantalla Super Retina XDR de 6.1 pulgadas.",
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400"
  },
  {
    id: "3",
    name: "Samsung Galaxy S24",
    category: "celulares",
    price: 999.99,
    stock: 20,
    description: "Smartphone premium con pantalla AMOLED, cámara de 200MP y batería de larga duración.",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400"
  },
  {
    id: "4",
    name: "MacBook Pro M3",
    category: "computadoras",
    price: 1999.99,
    stock: 8,
    description: "La laptop más potente de Apple con chip M3, 32GB RAM unificada y pantalla Liquid Retina XDR.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400"
  },
  {
    id: "5",
    name: "iPad Air",
    category: "tablets",
    price: 599.99,
    stock: 12,
    description: "Tablet versátil con chip M1, pantalla Liquid Retina de 10.9 pulgadas y compatibilidad con Apple Pencil.",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400"
  },
  {
    id: "6",
    name: "Samsung Galaxy Tab S9",
    category: "tablets",
    price: 799.99,
    stock: 10,
    description: "Tablet Android premium con pantalla AMOLED de 11 pulgadas y S Pen incluido.",
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400"
  },
  {
    id: "7",
    name: "Dell XPS 13",
    category: "computadoras",
    price: 1299.99,
    stock: 7,
    description: "Ultrabook elegante y potente con pantalla InfinityEdge y procesador Intel de 13ª generación.",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400"
  },
  {
    id: "8",
    name: "Google Pixel 8",
    category: "celulares",
    price: 699.99,
    stock: 18,
    description: "Smartphone con la mejor cámara computacional, chip Google Tensor G3 y Android puro.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400"
  },
  {
    id: "9",
    name: "Microsoft Surface Pro 9",
    category: "tablets",
    price: 1099.99,
    stock: 9,
    description: "2 en 1 versátil que funciona como tablet y laptop con procesador Intel Core de 12ª generación.",
    image: "https://images.unsplash.com/photo-1593642532400-2682810df593?w=400"
  },
  {
    id: "10",
    name: "Lenovo ThinkPad X1",
    category: "computadoras",
    price: 1499.99,
    stock: 6,
    description: "Laptop empresarial de alta gama con seguridad mejorada y durabilidad certificada.",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400"
  },
  {
    id: "11",
    name: "OnePlus 12",
    category: "celulares",
    price: 799.99,
    stock: 14,
    description: "Flagship killer con carga rápida de 100W, pantalla AMOLED a 120Hz y cámaras Hasselblad.",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400"
  },
  {
    id: "12",
    name: "Amazon Fire HD 10",
    category: "tablets",
    price: 149.99,
    stock: 25,
    description: "Tablet económica perfecta para entretenimiento con pantalla Full HD de 10.1 pulgadas.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400"
  }
];

// Configuración de Firebase desde variables de entorno
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Verificar si Firebase está configurado
const isFirebaseConfigured = !!(
  firebaseConfig.apiKey && 
  firebaseConfig.authDomain && 
  firebaseConfig.projectId
);

// Inicializar Firebase
let app = null;
let db = null;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  console.log('✅ Firebase inicializado correctamente con ecommerce-yapura');
} catch (error) {
  console.error('❌ Error al inicializar Firebase:', error);
  console.log('⚠️ Usando datos mockeados como fallback');
}

export { db };

// Nota: Las colecciones se crean dinámicamente en cada función cuando se necesitan

/**
 * Obtener todos los productos de Firestore o mock data
 * @returns {Promise<Array>} Array de productos
 */
export const getProducts = async () => {
  // Si Firebase no está configurado, usar datos mockeados
  if (!isFirebaseConfigured || !db) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockProducts);
      }, 800); // Simular delay de red
    });
  }

  try {
    const productsCollection = collection(db, 'products');
    const querySnapshot = await getDocs(productsCollection);
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return products;
  } catch (error) {
    console.error('Error al obtener productos de Firebase, usando mock data:', error);
    return mockProducts;
  }
};

/**
 * Obtener productos filtrados por categoría
 * @param {string} categoryId - ID de la categoría
 * @returns {Promise<Array>} Array de productos filtrados
 */
export const getProductsByCategory = async (categoryId) => {
  // Si Firebase no está configurado, usar datos mockeados
  if (!isFirebaseConfigured || !db) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = mockProducts.filter(p => p.category === categoryId);
        resolve(filtered);
      }, 800);
    });
  }

  try {
    const productsCollection = collection(db, 'products');
    const q = query(productsCollection, where('category', '==', categoryId));
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return products;
  } catch (error) {
    console.error('Error al obtener productos por categoría, usando mock data:', error);
    const filtered = mockProducts.filter(p => p.category === categoryId);
    return filtered;
  }
};

/**
 * Obtener un producto específico por ID
 * @param {string} productId - ID del producto
 * @returns {Promise<Object>} Producto encontrado
 */
export const getProductById = async (productId) => {
  // Si Firebase no está configurado, usar datos mockeados
  if (!isFirebaseConfigured || !db) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = mockProducts.find(p => p.id === productId);
        if (product) {
          resolve(product);
        } else {
          reject(new Error('Producto no encontrado'));
        }
      }, 800);
    });
  }

  try {
    const docRef = doc(db, 'products', productId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      throw new Error('Producto no encontrado');
    }
  } catch (error) {
    console.error('Error al obtener producto, buscando en mock data:', error);
    const product = mockProducts.find(p => p.id === productId);
    if (product) {
      return product;
    }
    throw new Error('Producto no encontrado');
  }
};

/**
 * Crear una nueva orden en Firestore o simular creación
 * @param {Object} order - Objeto con los datos de la orden
 * @returns {Promise<string>} ID de la orden creada
 */
export const createOrder = async (order) => {
  // Si Firebase no está configurado, simular creación de orden
  if (!isFirebaseConfigured || !db) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockOrderId = `MOCK-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        console.log('Orden simulada creada:', mockOrderId, order);
        resolve(mockOrderId);
      }, 1000);
    });
  }

  try {
    const ordersCollection = collection(db, 'orders');
    const orderWithTimestamp = {
      ...order,
      createdAt: serverTimestamp(),
      status: 'pending'
    };
    
    const docRef = await addDoc(ordersCollection, orderWithTimestamp);
    return docRef.id;
  } catch (error) {
    console.error('Error al crear orden, generando ID simulado:', error);
    const mockOrderId = `MOCK-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    return mockOrderId;
  }
};

/**
 * Obtener todas las órdenes de Firestore
 * @returns {Promise<Array>} Array de órdenes
 */
export const getOrders = async () => {
  if (!isFirebaseConfigured || !db) {
    // Simular órdenes para desarrollo
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([]);
      }, 800);
    });
  }

  try {
    const ordersCollection = collection(db, 'orders');
    const querySnapshot = await getDocs(ordersCollection);
    const orders = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    // Ordenar por fecha más reciente primero
    return orders.sort((a, b) => {
      const dateA = a.date ? new Date(a.date) : new Date(0);
      const dateB = b.date ? new Date(b.date) : new Date(0);
      return dateB - dateA;
    });
  } catch (error) {
    console.error('Error al obtener órdenes:', error);
    return [];
  }
};

/**
 * Obtener una orden específica por ID
 * @param {string} orderId - ID de la orden
 * @returns {Promise<Object>} Orden encontrada
 */
export const getOrderById = async (orderId) => {
  if (!isFirebaseConfigured || !db) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Orden no encontrada'));
      }, 800);
    });
  }

  try {
    const docRef = doc(db, 'orders', orderId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      throw new Error('Orden no encontrada');
    }
  } catch (error) {
    console.error('Error al obtener orden:', error);
    throw error;
  }
};

/**
 * Obtener todas las categorías disponibles
 * @returns {Array} Array de categorías
 */
export const getCategories = () => {
  return [
    { id: "computadoras", name: "Computadoras" },
    { id: "celulares", name: "Celulares" },
    { id: "tablets", name: "Tablets" }
  ];
};

// Firebase configurado dinámicamente según variables de entorno

