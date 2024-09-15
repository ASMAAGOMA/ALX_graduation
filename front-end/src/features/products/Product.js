import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { selectProductById } from './productsApiSlice';
import { selectCurrentUser, updateUserFavorites } from '../../features/auth/authSlice';
import { useAddFavoriteProductMutation, useRemoveFavoriteProductMutation } from '../../features/auth/authApiSlice';

const Product = ({ productId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const product = useSelector((state) => selectProductById(state, productId));
    const user = useSelector(selectCurrentUser);
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    
    const [addFavorite] = useAddFavoriteProductMutation();
    const [removeFavorite] = useRemoveFavoriteProductMutation();

    const isFavorite = useMemo(() => user?.favorites?.includes(productId), [user, productId]);

    console.log('User:', user);
    console.log('Token:', token);
    console.log('Current user in Product component:', user);

    const handleCardClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleFavoriteClick = async (e) => {
        console.log("Favorite button clicked");
        e.stopPropagation();
        console.log("User:", user);
        console.log("Product ID:", productId);
        
        if (!user) {
            console.log("No user logged in");
            alert("You must be logged in to add favorites.");
            return;
        }
    
        try {
            console.log("Attempting to update favorite");
            if (isFavorite) {
                console.log("Removing from favorites");
                const result = await removeFavorite(productId).unwrap();
                console.log("Remove result:", result);
            } else {
                console.log("Adding to favorites");
                const result = await addFavorite(productId).unwrap();
                console.log("Add result:", result);
            }
            console.log("Favorite update successful");
            
            // Update the user's favorites in the Redux store
            if (user && user.favorites) {
                const updatedFavorites = isFavorite
                    ? user.favorites.filter(id => id !== productId)
                    : [...user.favorites, productId];
                dispatch(updateUserFavorites(updatedFavorites));
            }
        } catch (err) {
            console.error('Failed to update favorite:', err);
            if (err.data) console.error('Error data:', err.data);
            if (err.status) console.error('Error status:', err.status);
            alert('Failed to update favorite. Please try again.');
        }
    };

    if (!product) return null;

    return (
        <>
            <div className="product-card" onClick={handleCardClick}>
                <div className="product-image">
                    <img src={`http://localhost:3500/uploads/${product.image}`} alt={product.name} />
                </div>
                <div className="product-details">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">${product.price.toFixed(2)}</p>
                    <p className="product-category">{product.category}</p>
                </div>
                <button 
                    className={`favorite-button ${isFavorite ? 'favorite' : ''}`} 
                    onClick={handleFavoriteClick}
                >
                    <FontAwesomeIcon icon={isFavorite ? fasHeart : farHeart} />
                    <span className="sr-only">Favorite</span>
                </button>
            </div>

            {isModalOpen && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={handleCloseModal}>&times;</button>
                        <div className="modal-content">
                            <img 
                                src={`http://localhost:3500/uploads/${product.image}`} 
                                alt={product.name} 
                                className="modal-image" 
                            />
                            <dl className="modal-product-info">
                                <dt className="modal-product-name">{product.name}</dt>
                                <dt>Price:</dt>
                                <dd className="modal-product-price">${product.price.toFixed(2)}</dd>
                                {product.category && (
                                    <>
                                        <dt>Category:</dt>
                                        <dd>{product.category}</dd>
                                    </>
                                )}
                                <dd className="modal-product-description">{product.description}</dd>
                            </dl>
                        </div>
                        <button 
                            className={`modal-favorite-button ${isFavorite ? 'favorite' : ''}`} 
                            onClick={handleFavoriteClick}
                        >
                            <FontAwesomeIcon icon={isFavorite ? fasHeart : farHeart} />
                            <span className="sr-only">Favorite</span>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Product;