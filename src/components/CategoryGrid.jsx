import React from 'react';
import { categories } from '../data/mockData';

const CategoryGrid = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group cursor-pointer transform transition-all duration-200 hover:scale-105"
          >
            <div className={`${category.color} rounded-2xl p-6 text-center shadow-sm group-hover:shadow-md transition-shadow`}>
              <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-sm font-medium text-gray-900 leading-tight">
                {category.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
