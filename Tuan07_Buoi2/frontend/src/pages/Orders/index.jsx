import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { orderService } from '../../services/orderService';
import { formatCurrency } from '../../utils/formatters';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderService.getMyOrders()
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 border-l-4 border-blue-500 pl-4">Đơn hàng của tôi</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
          <p className="text-xl text-gray-500 mb-6">Bạn chưa có đơn hàng nào.</p>
          <Link to="/" className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold py-3 px-8 rounded-lg shadow hover:shadow-lg transition-all">
            Mua sắm ngay
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="bg-gray-50 p-4 border-b flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div>
                  <span className="font-bold text-gray-800 mr-2">Mã đơn: #{order.orderId}</span>
                  <span className="text-sm text-gray-500">({new Date(order.createdAt).toLocaleString()})</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                    {order.status}
                  </span>
                  <span className="font-bold text-lg text-red-600">{formatCurrency(order.totalPrice)}</span>
                </div>
              </div>
              
              <div className="p-4">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-gray-500 text-sm border-b">
                      <th className="pb-2 font-medium">Sản phẩm</th>
                      <th className="pb-2 font-medium text-center">Số lượng</th>
                      <th className="pb-2 font-medium text-right">Đơn giá</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, idx) => (
                      <tr key={idx} className="border-b last:border-0 text-sm">
                        <td className="py-3 flex items-center gap-3">
                          <img src={item.imageUrl} alt={item.name} className="w-10 h-10 object-contain rounded border p-1" />
                          <span className="font-medium text-gray-700">{item.name}</span>
                        </td>
                        <td className="py-3 text-center text-gray-600">{item.quantity}</td>
                        <td className="py-3 text-right text-gray-600">{formatCurrency(item.price)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
