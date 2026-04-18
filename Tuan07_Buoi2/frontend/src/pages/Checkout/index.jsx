import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderService } from '../../services/orderService';

const CheckoutPage = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleCheckout = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const result = await orderService.checkout();
      setSuccess(true);
      setOrderInfo(result);
    } catch (error) {
      setErrorMsg(error.message || "Có lỗi xảy ra khi đặt hàng.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container mx-auto p-4 max-w-2xl mt-10">
        <div className="bg-white p-8 rounded-xl shadow-lg border-t-8 border-green-500 text-center">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
            <svg className="h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Đặt hàng thành công!</h1>
          <p className="text-gray-600 mb-6">Mã đơn hàng của bạn là <span className="font-bold text-gray-800">{orderInfo?.orderId}</span></p>
          <button 
            onClick={() => navigate('/')}
            className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-8 rounded transition-colors"
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl mt-10">
      <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-red-500">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Xác nhận thanh toán</h1>
        
        {errorMsg && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
            <p>{errorMsg}</p>
          </div>
        )}

        <div className="mb-8 p-6 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4 items-center flex gap-2">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Hệ thống sẽ thực hiện thanh toán cho tất cả sản phẩm trong giỏ hàng. 
          </p>
          <p className="font-medium text-gray-800">Bạn đã chắc chắn muốn đặt hàng chưa?</p>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={handleCheckout}
            disabled={loading}
            className={`flex-1 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold py-4 rounded-lg shadow transition-all text-lg flex justify-center items-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <><div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div> Đang xử lý...</>
            ) : "Xác nhận Đặt hàng"}
          </button>
          <button 
            onClick={() => navigate('/cart')}
            disabled={loading}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 rounded-lg transition-colors text-lg"
          >
            Quay lại giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
