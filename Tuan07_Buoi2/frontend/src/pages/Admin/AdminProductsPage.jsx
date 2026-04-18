import React, { useEffect, useState } from 'react';
import { productService } from '../../services/productService';
import { formatCurrency } from '../../utils/formatters';

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '', price: '', originalPrice: '', stock: '', imageUrl: '', description: ''
  });

  const loadData = () => {
    setLoading(true);
    productService.getProducts()
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingId(product.id);
      setFormData({
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice || '',
        stock: product.stock,
        imageUrl: product.imageUrl,
        description: product.description
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', price: '', originalPrice: '', stock: '', imageUrl: '', description: '' });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
      stock: Number(formData.stock)
    };

    try {
      if (editingId) {
        await productService.updateProduct(editingId, dataToSubmit);
      } else {
        await productService.createProduct(dataToSubmit);
      }
      setShowModal(false);
      loadData();
    } catch (err) {
      alert("Lỗi: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        await productService.deleteProduct(id);
        loadData();
      } catch (err) {
        alert("Lỗi: " + err.message);
      }
    }
  };

  if (loading && products.length === 0) return <div className="text-center p-10">Đang tải...</div>;

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 border-l-4 border-indigo-500 pl-4">Quản lý Sản phẩm</h1>
        <button 
          onClick={() => handleOpenModal()} 
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow font-medium"
        >
          + Thêm mới
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm border-b">
              <th className="p-4 w-16">ID</th>
              <th className="p-4">Hình ảnh</th>
              <th className="p-4 min-w-[200px]">Tên sản phẩm</th>
              <th className="p-4 text-right">Giá bán</th>
              <th className="p-4 text-center">Tồn kho</th>
              <th className="p-4 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-b hover:bg-gray-50 text-sm">
                <td className="p-4">{product.id}</td>
                <td className="p-4"><img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-contain rounded" /></td>
                <td className="p-4 font-medium text-gray-800">{product.name}</td>
                <td className="p-4 text-right font-medium text-red-600">{formatCurrency(product.price)}</td>
                <td className="p-4 text-center">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${product.stock > 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {product.stock}
                  </span>
                </td>
                <td className="p-4 text-center space-x-2">
                  <button onClick={() => handleOpenModal(product)} className="text-blue-500 hover:text-blue-700 font-medium">Sửa</button>
                  <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-700 font-medium">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden">
            <div className="bg-indigo-600 px-6 py-4 flex justify-between items-center text-white">
              <h2 className="text-xl font-bold">{editingId ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}</h2>
              <button onClick={() => setShowModal(false)} className="text-indigo-200 hover:text-white font-bold text-xl">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm *</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border rounded p-2 focus:ring focus:ring-indigo-200" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giá bán *</label>
                  <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full border rounded p-2 focus:ring focus:ring-indigo-200" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giá gốc</label>
                  <input type="number" value={formData.originalPrice} onChange={e => setFormData({...formData, originalPrice: e.target.value})} className="w-full border rounded p-2 focus:ring focus:ring-indigo-200" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tồn kho *</label>
                  <input required type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full border rounded p-2 focus:ring focus:ring-indigo-200" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Link ảnh *</label>
                  <input required type="text" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full border rounded p-2 focus:ring focus:ring-indigo-200" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <textarea rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border rounded p-2 focus:ring focus:ring-indigo-200"></textarea>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50">Hủy</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 font-medium pb-2">Lưu lại</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;
