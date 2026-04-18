import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productService } from '../../services/productService';
import { cartService } from '../../services/cartService';
import { formatCurrency } from '../../utils/formatters';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState('');
  const [addingToCartId, setAddingToCartId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    productService.getProducts()
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = async (e, id) => {
    e.preventDefault();
    setAddingToCartId(id);
    try {
      await cartService.addToCart(id, 1);
      setToastMsg('Đã thêm sản phẩm vào giỏ!');
      setProducts(prev => prev.map(p => p.id === id ? { ...p, stock: p.stock - 1 } : p));
      setTimeout(() => setToastMsg(''), 2000); 
    } catch (error) {
      console.error(error);
      const backendError = error.response?.data?.message || error.message;
      setToastMsg(backendError || 'Có lỗi xảy ra khi thêm vào giỏ.');
      setTimeout(() => setToastMsg(''), 3000); 
    } finally {
      setAddingToCartId(null);
    }
  };

  const handleBuyNow = async (e, id) => {
    e.preventDefault();
    setAddingToCartId(id);
    try {
      await cartService.addToCart(id, 1);
      navigate('/cart');
    } catch (error) {
      console.error(error);
      const backendError = error.response?.data?.message || error.message;
      setToastMsg(backendError || 'Có lỗi xảy ra khi thêm vào giỏ.');
      setTimeout(() => setToastMsg(''), 3000); 
      setAddingToCartId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 relative">
      {toastMsg && (
        <div className={`fixed top-20 right-4 ${toastMsg.includes('lỗi') || toastMsg.includes('Không đủ') ? 'bg-red-500' : 'bg-green-500'} text-white px-6 py-3 rounded shadow-lg z-50 animate-bounce`}>
          {toastMsg}
        </div>
      )}
      <h1 className="text-3xl font-bold text-gray-800 mb-8 border-l-4 border-red-500 pl-4">Khuyến Mãi Sốc Hôm Nay 🔥</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 relative group">
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
              SALE
            </div>
            <Link to={`/products/${product.id}`} className="block relative overflow-hidden bg-white pt-4">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-48 object-contain group-hover:scale-110 transition-transform duration-500"
              />
            </Link>
            <div className="p-5">
              <Link to={`/products/${product.id}`}>
                <h3 className="font-semibold text-lg text-gray-800 mb-2 truncate transition-colors hover:text-red-500">{product.name}</h3>
              </Link>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-red-600 font-bold text-xl">{formatCurrency(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-gray-400 line-through text-sm">{formatCurrency(product.originalPrice)}</span>
                )}
              </div>
              <div className="text-sm text-gray-500 mb-4 bg-gray-100 inline-block px-2 py-1 rounded">
                Còn lại: <span className="font-bold text-red-500">{product.stock}</span> sản phẩm
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <button 
                    onClick={(e) => handleAddToCart(e, product.id)}
                    disabled={addingToCartId === product.id}
                    className={`flex-shrink-0 border-2 border-red-500 text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors flex justify-center items-center ${addingToCartId === product.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                    title="Thêm vào giỏ"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </button>
                  <button 
                    onClick={(e) => handleBuyNow(e, product.id)}
                    disabled={addingToCartId === product.id}
                    className={`flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center ${addingToCartId === product.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Mua Ngay
                  </button>
                </div>
                <Link 
                  to={`/products/${product.id}`}
                  className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  Xem chi tiết
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
