import React, { useEffect, useState } from 'react';
import DashHeader from '../../components/DashHeader';
import DashFooter from '../../components/DashFooter';
import ProductsList from './ProductList';

const ProductsPage = () => {
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setIsHeaderFixed(true);
      } else {
        setIsHeaderFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="page-container">
      <DashHeader className={isHeaderFixed ? 'fixed' : ''} />
      <main className="main-content">
        <ProductsList />
      </main>
      <DashFooter />
    </div>
  );
};

export default ProductsPage;