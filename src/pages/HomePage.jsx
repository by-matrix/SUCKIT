import React, { useState, useMemo } from 'react';
import CategoryGrid from '../components/CategoryGrid';
import ProductGrid from '../components/ProductGrid';
import CategoryFilter from '../components/CategoryFilter';
import ProductCard from '../components/ProductCard';
import { products } from '../data/mockData';

const HomePage = ({ searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  // Filter products based on search query and selected category
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by search query
    if (searchQuery && searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-green-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Fresh Groceries in <span className="text-yellow-200">15 Minutes</span>
            </h1>
            <p className="text-xl mb-6 opacity-90">
              Get fresh fruits, vegetables & daily essentials delivered to your doorstep
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-block">
              <p className="text-sm">
                🚀 <strong>Free delivery</strong> on orders above ₹199
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Grid - Only show when no search query and no category selected */}
      {!searchQuery && !selectedCategory && <CategoryGrid />}
      
      {/* Category Filter */}
      <CategoryFilter 
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Product Grid */}
      <ProductGrid 
        products={filteredProducts}
        title={
          searchQuery 
            ? `Search Results for "${searchQuery}"` 
            : selectedCategory 
              ? selectedCategory 
              : "Popular Products"
        }
      />

      {/* Features */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">15-Minute Delivery</h3>
              <p className="text-gray-600">Get your essentials delivered in just 15 minutes</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🥬</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fresh Quality</h3>
              <p className="text-gray-600">Hand-picked fresh produce from trusted sources</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Best Prices</h3>
              <p className="text-gray-600">Competitive prices with regular offers and discounts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
