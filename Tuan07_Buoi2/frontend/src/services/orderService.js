import api, { useMock } from './api';
import { mockCart, mockOrders } from './mockData';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const orderService = {
  checkout: async () => {
    if (useMock) {
      await delay(800); // Simulate processing time
      if (mockCart.items.length === 0) {
        throw new Error("Cart is empty");
      }
      
      // Giả lập checkout thành công và xoá cart
      const orderId = `ORD-${Math.floor(Math.random() * 10000)}`;
      
      const newOrder = {
        orderId: orderId,
        userId: mockCart.userId,
        totalPrice: mockCart.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        items: [...mockCart.items],
        status: "COMPLETED",
        createdAt: new Date().toISOString()
      };
      
      mockOrders.push(newOrder); // Lưu vào mockDB
      mockCart.items = []; // Clear cart
      
      return { 
        success: true, 
        message: "Order placed successfully", 
        orderId: orderId 
      };
    }
    
    // Gateway call
    const response = await api.post('/checkout');
    return response.data;
  },

  getMyOrders: async () => {
    if (useMock) {
      await delay(400);
      return [...mockOrders].reverse(); // Đơn mới nhất lên đầu
    }
    const response = await api.get('/orders');
    return response.data;
  }
};
