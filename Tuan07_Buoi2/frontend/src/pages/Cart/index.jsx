import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cartService } from '../../services/cartService';
import { formatCurrency } from '../../utils/formatters';

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    cartService.getCart()
      .then(data => {
        setCart(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const totalAmount = cart?.items.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  const handleUpdateQuantity = async (productId, currentQty, delta) => {
    const newQty = currentQty + delta;
    if (newQty <= 0) {
      if (window.confirm("Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?")) {
        await handleRemoveItem(productId);
      }
      return;
    }
    
    // Optimistic UI update
    setCart(prev => ({
      ...prev,
      items: prev.items.map(i => i.productId === productId ? { ...i, quantity: newQty } : i)
    }));
    
    try {
      await cartService.updateQuantity(productId, newQty);
    } catch (err) {
      console.error(err);
      const backendError = err.response?.data?.message || err.message;
      alert(backendError || "Không thể cập nhật số lượng");
      // Rollback UI update
      setCart(prev => ({
        ...prev,
        items: prev.items.map(i => i.productId === productId ? { ...i, quantity: currentQty } : i)
      }));
    }
  };

  const handleRemoveItem = async (productId) => {
    // Optimistic UI update
    setCart(prev => ({
      ...prev,
      items: prev.items.filter(i => i.productId !== productId)
    }));
    
    try {
      await cartService.removeItem(productId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
    </div>
  );

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 border-l-4 border-red-500 pl-4">Giỏ hàng của bạn</h1>
      
      {!cart || cart.items.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
          <p className="text-xl text-gray-500 mb-6">Giỏ hàng đang trống.</p>
          <Link to="/" className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold py-3 px-8 rounded-lg shadow hover:shadow-lg transition-all">
            Tiếp tục mua sắm
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="grid grid-cols-12 gap-4 bg-gray-50 p-4 font-semibold text-gray-700 border-b">
                <div className="col-span-6">Sản phẩm</div>
                <div className="col-span-2 text-center">Đơn giá</div>
                <div className="col-span-2 text-center">Số lượng</div>
                <div className="col-span-2 text-right">Thành tiền</div>
              </div>
              
              {cart.items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 p-4 items-center border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                  <div className="col-span-6 flex items-center gap-4">
                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-contain rounded bg-white border p-1" />
                    <span className="font-medium text-gray-800 truncate" title={item.name}>{item.name}</span>
                  </div>
                  <div className="col-span-2 text-center text-gray-600">
                    {formatCurrency(item.price)}
                  </div>
                  <div className="col-span-3 lg:col-span-2 flex items-center justify-center gap-2">
                    <button onClick={() => handleUpdateQuantity(item.productId, item.quantity, -1)} className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 font-bold">-</button>
                    <span className="font-medium w-6 text-center">{item.quantity}</span>
                    <button onClick={() => handleUpdateQuantity(item.productId, item.quantity, 1)} className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 font-bold">+</button>
                  </div>
                  <div className="col-span-3 lg:col-span-2 text-right font-bold text-red-600 flex flex-col items-end gap-2">
                    {formatCurrency(item.price * item.quantity)}
                    <button onClick={() => handleRemoveItem(item.productId)} className="text-xs text-gray-400 hover:text-red-500 underline">Xóa</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24 border-t-4 border-red-500">
              <h2 className="text-xl font-bold text-gray-800 mb-6 pb-4 border-b">Tổng cộng</h2>
              
              <div className="flex justify-between mb-4 text-gray-600">
                <span>Tạm tính:</span>
                <span className="font-medium">{formatCurrency(totalAmount)}</span>
              </div>
              <div className="flex justify-between mb-6 pb-6 border-b text-gray-600">
                <span>Phí giao hàng:</span>
                <span className="font-medium text-green-500">Miễn phí</span>
              </div>
              
              <div className="flex justify-between items-end mb-8">
                <span className="text-lg font-bold text-gray-800">Tổng thanh toán:</span>
                <span className="text-2xl font-bold text-red-600">{formatCurrency(totalAmount)}</span>
              </div>
              
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all text-lg"
              >
                Tiến hành thanh toán
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
