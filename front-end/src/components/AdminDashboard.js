import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Edit, Trash2 } from 'lucide-react';
import DashHeader from './DashHeader';
import DashFooter from './DashFooter';

const categories = [
  { name: 'Hot Drinks', slug: 'hot-drinks' },
  { name: 'Cold Drinks', slug: 'cold-drinks' },
  { name: 'Desserts', slug: 'desserts' },
  { name: 'Cakes', slug: 'cakes' },
];

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', description: '', image: null });
    const [editProduct, setEditProduct] = useState(null);

    // Fetch all products
    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://cozycorner-delta.vercel.app/menu');
            setProducts(response.data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setNewProduct({ ...newProduct, image: e.target.files[0] });
    };

    // Handle creating a new product
    const handleCreateProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', newProduct.name);
        formData.append('price', newProduct.price);
        formData.append('category', newProduct.category);
        formData.append('description', newProduct.description);
        formData.append('image', newProduct.image);

        try {
            await axios.post('https://cozycorner-delta.vercel.app/menu', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            fetchProducts();
            setNewProduct({ name: '', price: '', category: '', description: '', image: null });
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    // Handle deleting a product
    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete('https://cozycorner-delta.vercel.app/menu', { data: { id } });
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    // Handle updating a product
    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('id', editProduct._id);
        formData.append('name', editProduct.name);
        formData.append('price', editProduct.price);
        formData.append('category', editProduct.category);
        formData.append('description', editProduct.description);
        if (editProduct.image instanceof File) {
            formData.append('image', editProduct.image);
        }

        try {
            await axios.patch('https://cozycorner-delta.vercel.app/menu', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            fetchProducts();
            setEditProduct(null);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className="page-container">
            <DashHeader />
            <main className="admin-dashboard">
                <h1 className="dashboard-title">Admin Dashboard</h1>

                <div className="dashboard-content">
                    <section className="product-form-section">
                        <h2>Create New Product</h2>
                        <form onSubmit={handleCreateProduct} className="product-form">
                            <input type="text" name="name" placeholder="Product Name" onChange={handleInputChange} value={newProduct.name} required />
                            <input type="text" name="price" placeholder="Price" onChange={handleInputChange} value={newProduct.price} required />
                            <select name="category" onChange={handleInputChange} value={newProduct.category} required>
                                <option value="">Select a category</option>
                                {categories.map((category) => (
                                    <option key={category.slug} value={category.slug}>{category.name}</option>
                                ))}
                            </select>
                            <textarea name="description" placeholder="Description" onChange={handleInputChange} value={newProduct.description}></textarea>
                            <input type="file" name="image" onChange={handleImageChange} required />
                            <button type="submit" className="btn btn-primary">Create Product</button>
                        </form>
                    </section>

                    <section className="product-list-section">
                        <h2>Product List</h2>
                        <div className="product-grid">
                            {products.map((product) => (
                                <div key={product._id} className="product-item">
                                    <img src={`https://cozycorner-delta.vercel.app/uploads/${product.image}`} alt={product.name} className="product-image" />
                                    <div className="product-details">
                                        <h3>{product.name}</h3>
                                        <p>Price: ${product.price}</p>
                                        <p>Category: {categories.find(cat => cat.slug === product.category)?.name || product.category}</p>
                                        <p>Description: {product.description}</p>
                                    </div>
                                    <div className="product-actions">
                                        <button onClick={() => setEditProduct(product)} className="btn-edit">
                                            <Edit size={16} /> Edit
                                        </button>
                                        <button onClick={() => handleDeleteProduct(product._id)} className="btn-delete">
                                            <Trash2 size={16} /> Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {editProduct && (
                    <div className="admin-dashboard-modal">
                        <div className="admin-dashboard-modal-content">
                            <h2>Edit Product</h2>
                            <form onSubmit={handleUpdateProduct} className="product-form">
                                <input
                                    type="text"
                                    name="name"
                                    value={editProduct.name}
                                    onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                                    required
                                />
                                <input
                                    type="text"
                                    name="price"
                                    value={editProduct.price}
                                    onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                                    required
                                />
                                <select
                                    name="category"
                                    value={editProduct.category}
                                    onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
                                    required
                                >
                                    {categories.map((category) => (
                                        <option key={category.slug} value={category.slug}>{category.name}</option>
                                    ))}
                                </select>
                                <textarea
                                    name="description"
                                    value={editProduct.description}
                                    onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                                ></textarea>
                                <input 
                                    type="file" 
                                    name="image" 
                                    onChange={(e) => setEditProduct({ ...editProduct, image: e.target.files[0] })} 
                                />
                                <div className="admin-dashboard-modal-actions">
                                    <button type="submit" className="btn btn-primary">Update Product</button>
                                    <button type="button" onClick={() => setEditProduct(null)} className="btn btn-secondary">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
            <DashFooter />
        </div>
    );
};

export default AdminDashboard;