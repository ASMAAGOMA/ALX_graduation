import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faHeart } from '@fortawesome/free-solid-svg-icons';

const ProductModal = ({ product, onClose, onFavoriteClick, isFavorite }) => {
  if (!product) return null;

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onFavoriteClick(product.id || product._id);

    // Close the modal after the favorite button is clicked (removal)
    if (isFavorite) {
      onClose(); // This closes the modal after the product is removed
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="modal-content">
          <img
            className="modal-image"
            src={`https://cozycorner-kappa.vercel.app/uploads/${product.image}`}
            alt={product.name}
          />
          <div className="modal-product-info">
            <h2 className="modal-product-name">{product.name}</h2>
            <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <button 
              className={`favorite-button ${isFavorite ? 'favorite' : ''}`}
              onClick={handleFavoriteClick}
            >
              <FontAwesomeIcon icon={faHeart} style={{color: isFavorite ? 'red' : 'currentColor'}} />
              <span className="sr-only">{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;