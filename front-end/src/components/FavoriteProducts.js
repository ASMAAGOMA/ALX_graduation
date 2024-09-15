import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice';
import { useGetFavoriteProductsQuery, useRemoveFavoriteProductMutation } from '../features/auth/authApiSlice';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import DashHeader from './DashHeader';
import Footer from './DashFooter';
import ProductModal from './ProductModal';
import { updateUserFavorites } from '../features/auth/authSlice';

const FavoriteProducts = () => {
    const user = useSelector(selectCurrentUser);
    const { data: favorites, isLoading, isError, error } = useGetFavoriteProductsQuery();
    const [removeFavorite] = useRemoveFavoriteProductMutation();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const dispatch = useDispatch();

    if (!user) {
        return (
            <div className="page-container">
                <DashHeader />
                <main className="main-content">
                    <div className="favorite-products">
                        <h2>Your Favorite Products</h2>
                        <p>You must be logged in to view your favorites. <Link to="/login">Login here</Link></p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="page-container">
                <DashHeader />
                <main className="main-content">
                    <div>Loading favorite products...</div>
                </main>
                <Footer />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="page-container">
                <DashHeader />
                <main className="main-content">
                    <div>Error loading favorites: {error.toString()}</div>
                </main>
                <Footer />
            </div>
        );
    }

    const handleRemoveFavorite = async (productId) => {
        try {
            await removeFavorite(productId).unwrap();
            
            // Update the user's favorites in the Redux store
            if (user && user.favorites) {
                const updatedFavorites = user.favorites.filter(id => id !== productId);
                dispatch(updateUserFavorites(updatedFavorites));
            }
        } catch (err) {
            console.error('Failed to remove favorite:', err);
        }
    };

    const handleOpenModal = (product) => {
        setSelectedProduct(product);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    return (
        <div className="page-container">
            <DashHeader />
            <main className="main-content">
                <div className="favorite-products">
                    <h2>Your Favorite Products</h2>
                    {favorites?.length === 0 ? (
                        <p>You haven't added any products to your favorites yet.</p>
                    ) : (
                        <div className="product-grid">
                            {favorites?.map(product => (
                                <ProductCard
                                key={product._id || product.id}
                                product={product}
                                isFavorite={true}
                                onFavoriteClick={handleRemoveFavorite}
                                onOpenModal={handleOpenModal}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>
            {selectedProduct && (
                <ProductModal 
                    product={selectedProduct} 
                    onClose={handleCloseModal} 
                    onFavoriteClick={handleRemoveFavorite}
                    isFavorite={true}
                />
            )}
            <Footer />
        </div>
    );
};

export default FavoriteProducts;