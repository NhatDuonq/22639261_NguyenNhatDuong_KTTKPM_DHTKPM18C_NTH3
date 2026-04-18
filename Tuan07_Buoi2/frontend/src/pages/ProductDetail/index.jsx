import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../../services/productService';
import { cartService } from '../../services/cartService';
import { formatCurrency } from '../../utils/formatters';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    productService.getProductById(id)
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = async () => {
    setAddingToCart(true);
    try {
      await cartService.addToCart(id, 1);
      setToastMsg('Đã thêm sản phẩm vào giỏ!');
      setTimeout(() => setToastMsg(''), 2000); 
    } catch (error) {
      console.error(error);
      const backendError = error.response?.data?.message || error.message;
      setToastMsg(backendError || 'Có lỗi xảy ra khi thêm vào giỏ.');
      setTimeout(() => setToastMsg(''), 3000); 
    } finally {
      setAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    navigate('/cart');
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
    </div>
  );

  if (!product) return <div className="text-center mt-10 text-xl font-medium">Không tìm thấy sản phẩm.</div>;

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      {toastMsg && (
        <div className={`fixed top-20 right-4 ${toastMsg.includes('lỗi') || toastMsg.includes('Không đủ') || toastMsg.includes('thấy') ? 'bg-red-500' : 'bg-green-500'} text-white px-6 py-3 rounded shadow-lg z-50 animate-bounce`}>
          {toastMsg}
        </div>
      )}
      
      <div className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Hình ảnh */}
        <div className="md:w-1/2 p-8 flex justify-center items-center bg-gray-50 border-r border-gray-100">
          <img src={product.imageUrl} alt={product.name} className="max-h-96 object-contain hover:scale-105 transition-transform duration-300" />
        </div>
        
        {/* Thông tin */}
        <div className="md:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-3xl font-bold text-red-600">{formatCurrency(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xl text-gray-400 line-through">{formatCurrency(product.originalPrice)}</span>
            )}
          </div>
          <div className="bg-red-50 text-red-700 px-4 py-2 rounded-lg inline-block mb-6 w-fit font-medium">
            🔥 Chỉ còn lại {product.stock} sản phẩm
          </div>
          
          <p className="text-gray-600 mb-8 whitespace-pre-line leading-relaxed border-l-4 border-gray-200 pl-4">
            {product.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            <button 
              onClick={handleAddToCart}
              disabled={addingToCart}
              className={`flex-1 border-2 border-red-500 text-red-500 font-bold py-3 px-6 rounded-lg hover:bg-red-50 transition-colors flex justify-center items-center gap-2 ${addingToCart ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Thêm Giỏ Hàng
            </button>
            <button 
               onClick={handleBuyNow}
               disabled={addingToCart}
              className="flex-1 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Mua Ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
