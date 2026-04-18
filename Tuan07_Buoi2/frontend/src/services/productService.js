import api, { useMock } from './api';
import { mockProducts } from './mockData';

// Giả lập độ trễ mạng
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const productService = {
  getProducts: async () => {
    if (useMock) {
      await delay(300); // Fake delay
      return mockProducts;
    }
    // Khi gọi API thực tế
    const response = await api.get('/products');
    return response.data;
  },

  getProductById: async (id) => {
    if (useMock) {
      await delay(200);
      return mockProducts.find(p => p.id === Number(id));
    }
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  createProduct: async (data) => {
    if (useMock) {
      await delay(400);
      const newId = mockProducts.length > 0 ? Math.max(...mockProducts.map(p => p.id)) + 1 : 1;
      const newProduct = { id: newId, ...data };
      mockProducts.push(newProduct);
      return newProduct;
    }
    const response = await api.post('/products', data);
    return response.data;
  },

  updateProduct: async (id, data) => {
    if (useMock) {
      await delay(400);
      const idx = mockProducts.findIndex(p => p.id === Number(id));
      if (idx !== -1) {
        mockProducts[idx] = { ...mockProducts[idx], ...data };
        return mockProducts[idx];
      }
      throw new Error("Product not found");
    }
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  },

  deleteProduct: async (id) => {
    if (useMock) {
      await delay(400);
      const idx = mockProducts.findIndex(p => p.id === Number(id));
      if (idx !== -1) {
        mockProducts.splice(idx, 1);
        return { success: true };
      }
      throw new Error("Product not found");
    }
    const response = await api.delete(`/products/${id}`);
    return response.data;
  }
};
