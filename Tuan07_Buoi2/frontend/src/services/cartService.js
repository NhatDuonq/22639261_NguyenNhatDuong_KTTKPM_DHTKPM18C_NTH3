import api, { useMock } from './api';
import { mockCart, mockProducts, redisSim } from './mockData';

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

      const stockKey = `stock:${pid}`;
      try {
        // Cập nhật kho bằng hàm mô phỏng giãm Redis (tuyệt đối không quá kho)
        await redisSim.decrby(stockKey, quantity);
      } catch (error) {
        throw new Error(error.message);
      }

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
      
      if (!existingItem) throw new Error("Item not in cart");

      const diff = quantity - existingItem.quantity;
      const stockKey = `stock:${pid}`;

      try {
        if (diff > 0) {
          // Khách muốn thêm -> trừ kho
          await redisSim.decrby(stockKey, diff);
        } else if (diff < 0) {
          // Khách giảm bớt -> cộng lại kho
          await redisSim.incrby(stockKey, -diff);
        }
      } catch (error) {
        throw new Error(error.message); // Quăng lỗi nếu không đủ số lượng
      }

      existingItem.quantity = quantity;
      return { success: true, cart: { ...mockCart } };
    }
    const response = await api.put('/cart/update', { productId, quantity });
    return response.data;
  },

  removeItem: async (productId) => {
    if (useMock) {
      await delay(200);
      const pid = Number(productId);
      const existingItem = mockCart.items.find(item => item.productId === pid);
      
      if (existingItem) {
        // Hoàn lại kho số lượng trong giỏ
        await redisSim.incrby(`stock:${pid}`, existingItem.quantity);
        mockCart.items = mockCart.items.filter(item => item.productId !== pid);
      }
      return { success: true, cart: { ...mockCart } };
    }
    const response = await api.delete(`/cart/remove/${productId}`);
    return response.data;
  }
};
