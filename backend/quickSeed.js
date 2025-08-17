const mongoose = require('mongoose');
const Category = require('./models/Category');
const Product = require('./models/Product');

async function quickSeed() {
  try {
    console.log('🌱 Quick seeding...');
    
    // Create categories
    const fruitsCategory = await Category.create({
      name: 'Fruits',
      description: 'Fresh fruits and seasonal produce',
      icon: '🍎'
    });

    const vegetablesCategory = await Category.create({
      name: 'Vegetables',
      description: 'Fresh vegetables and leafy greens',
      icon: '🥬'
    });

    // Create some products
    const products = [
      {
        name: 'Fresh Bananas',
        category: fruitsCategory._id,
        price: 2.99,
        unit: 'per kg',
        description: 'Sweet and ripe bananas, perfect for smoothies',
        image: '/api/placeholder/400/300',
        inStock: true,
        stock: 50
      },
      {
        name: 'Organic Spinach',
        category: vegetablesCategory._id,
        price: 3.49,
        unit: 'per bunch',
        description: 'Fresh organic spinach leaves',
        image: '/api/placeholder/400/300',
        inStock: true,
        stock: 30
      }
    ];

    await Product.insertMany(products);
    
    console.log('✅ Quick seed completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Quick seed error:', error);
    process.exit(1);
  }
}

quickSeed();
