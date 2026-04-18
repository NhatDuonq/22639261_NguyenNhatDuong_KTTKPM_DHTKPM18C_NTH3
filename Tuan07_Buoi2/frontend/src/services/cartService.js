import api, { useMock } from './api';
import { mockCart, mockProducts } from './mockData';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const cartService = {
  getCart: async () => {
    if (useMock) {
      await delay(200);
      return { ...mockCart };
    }
    const response = await api.get('/cart');
    return response.data;
  },

  addToCart: async (productId, quantity = 1) => {
    if (useMock) {
      // Simulate real adding to cart
      await delay(300);
      const pid = Number(productId);
      const product = mockProducts.find(p => p.id === pid);
      if (!product) throw new Error("Product not found");

      const existingItem = mockCart.items.find(item => item.productId === pid);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        mockCart.items.push({
          productId: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: quantity
        });
      }
      return { success: true, message: "Added to cart", cart: { ...mockCart } };
    }
    
    // Gateway call
    const response = await api.post('/cart/add', { productId, quantity });
    return response.data;
  },

  updateQuantity: async (productId, quantity) => {
    if (useMock) {
      await delay(200);
      const pid = Number(productId);
      const existingItem = mockCart.items.find(item => item.productId === pid);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
      return { success: true, cart: { ...mockCart } };
    }
    const response = await api.put('/cart/update', { productId, quantity });
    return response.data;
  },

  removeItem: async (productId) => {
    if (useMock) {
      await delay(200);
      const pid = Number(productId);
      mockCart.items = mockCart.items.filter(item => item.productId !== pid);
      return { success: true, cart: { ...mockCart } };
    }
    const response = await api.delete(`/cart/remove/${productId}`);
    return response.data;
  }
};
