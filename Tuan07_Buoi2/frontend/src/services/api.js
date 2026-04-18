import axios from 'axios';

// Lấy base URL từ biến môi trường
const gatewayUrl = import.meta.env.VITE_API_GATEWAY_URL || 'http://localhost:8080';

// Cờ báo sử dụng Mock hay API thật
export const useMock = import.meta.env.VITE_USE_MOCK === 'true';

const api = axios.create({
  baseURL: gatewayUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
