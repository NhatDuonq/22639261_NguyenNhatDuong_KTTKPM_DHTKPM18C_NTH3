export const mockProducts = [
  {
    id: 1,
    name: "MacBook Pro M3",
    price: 40000000,
    originalPrice: 45000000,
    imageUrl: "https://shopdunk.com/images/thumbs/0008740_macbook-air-m2-13-inch-2022-8gb-ram-256gb-ssd_550.png",
    description: "Flash sale 12h đêm - Siêu phẩm MacBook Pro M3 mạnh mẽ.",
    stock: 15,
  },
  {
    id: 2,
    name: "MacBook Air M2 8GB 256GB",
    price: 26990000,
    originalPrice: 29990000,
    imageUrl: "https://shopdunk.com/images/thumbs/0008740_macbook-air-m2-13-inch-2022-8gb-ram-256gb-ssd_550.png",
    description: "MacBook Air cực mỏng nhẹ với chip M2.",
    stock: 5,
  },
  {
    id: 3,
    name: "AirPods Pro (2nd generation)",
    price: 6490000,
    originalPrice: 7990000,
    imageUrl: "https://shopdunk.com/images/thumbs/0010996_airpods-pro-2_550.png",
    description: "Tai nghe chống ồn chủ động xuất sắc nhất.",
    stock: 50,
  },
  {
    id: 4,
    name: "Apple Watch Series 9 GPS 41mm",
    price: 10490000,
    originalPrice: 11990000,
    imageUrl: "https://shopdunk.com/images/thumbs/0022237_apple-watch-series-9-nhom-gps-the-thao_550.webp",
    description: "Đồng hồ thông minh thế hệ mới, màn hình siêu sáng.",
    stock: 20,
  }
];

// Giả lập Redis Cart Data
export let mockCart = {
  cartId: "cart:999",
  userId: 999,
  items: [] // { productId, name, price, imageUrl, quantity }
};

// Giả lập Redis Data cho Đơn hàng
export let mockOrders = [];
