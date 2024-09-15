import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from './productsApiSlice';
import Product from './Product';

const ProductsList = () => {
  const { category } = useParams();
  const { data: products, isLoading, isSuccess, isError, error } = useGetProductsQuery();

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids, entities } = products;

    // Filter products based on category
    const filteredIds = ids.filter(id => entities[id].category === category);

    content = (
      <div className="product-grid">
        {filteredIds.length ? (
          filteredIds.map(productId => <Product key={productId} productId={productId} />)
        ) : (
          <p className="no-products-message">No products found in this category.</p>
        )}
      </div>
    );
  }

  return (
    <>
      <h1 className="category-title">{category.replace('-', ' ').toUpperCase()}</h1>
      {content}
    </>
  );
};

export default ProductsList;