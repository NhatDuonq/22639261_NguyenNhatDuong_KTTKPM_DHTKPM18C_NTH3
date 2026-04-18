import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../../services/productService';
import { formatCurrency } from '../../utils/formatters';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
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
              <Link 
                to={`/products/${product.id}`}
                className="block w-full text-center bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Xem chi tiết
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
