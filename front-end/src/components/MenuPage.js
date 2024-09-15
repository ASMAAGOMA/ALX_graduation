import React from 'react';
import { Link } from 'react-router-dom';
import Header from './DashHeader';
import Footer from './DashFooter';

const categories = [
  { name: 'Hot Drinks', slug: 'hot-drinks' },
  { name: 'Cold Drinks', slug: 'cold-drinks' },
  { name: 'Desserts', slug: 'desserts' },
  { name: 'Cakes', slug: 'cakes' },
];

const MenuPage = () => {
  return (
    <div className="page menu-page">
      <Header />
      <main className="main-content">
        <div className="categories-container">
          {categories.map((category) => (
            <Link
              to={`/menu/${category.slug}`}
              key={category.slug}
              className="category-item"
            >
              <div className={`category-image ${category.slug}`}></div>
              <div className="category-name">{category.name}</div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MenuPage;