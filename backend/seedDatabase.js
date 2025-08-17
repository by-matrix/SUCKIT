const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');
const Product = require('./models/Product');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/suckit', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const categories = [
  {
    name: "Vegetables & Fruits",
    description: "Fresh vegetables and fruits delivered daily",
    icon: "🥬",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200&h=200&fit=crop",
    color: "bg-green-100",
    sortOrder: 1
  },
  {
    name: "Dairy & Bakery",
    description: "Fresh dairy products and bakery items",
    icon: "🥛",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop",
    color: "bg-green-50",
    sortOrder: 2
  },
  {
    name: "Snacks & Beverages",
    description: "Delicious snacks and refreshing beverages",
    icon: "🍿",
    image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=200&h=200&fit=crop",
    color: "bg-green-100",
    sortOrder: 3
  },
  {
    name: "Personal Care",
    description: "Personal care and hygiene products",
    icon: "🧴",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&h=200&fit=crop",
    color: "bg-green-50",
    sortOrder: 4
  },
  {
    name: "Household Items",
    description: "Essential household and cleaning items",
    icon: "🧽",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    color: "bg-green-100",
    sortOrder: 5
  },
  {
    name: "Baby Care",
    description: "Baby care products and essentials",
    icon: "👶",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=200&h=200&fit=crop",
    color: "bg-green-50",
    sortOrder: 6
  }
];

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('🗑️ Cleared existing data');

    // Insert categories
    const insertedCategories = await Category.insertMany(categories);
    console.log('📂 Categories inserted successfully');

    // Create products for each category
    const products = [];
    
    // Vegetables & Fruits
    const vegFruitCategory = insertedCategories.find(cat => cat.name === "Vegetables & Fruits");
    products.push(
      {
        name: "Fresh Bananas",
        description: "Sweet and ripe bananas, perfect for snacking and smoothies",
        category: vegFruitCategory._id,
        brand: "Fresh Farm",
        price: 40,
        mrp: 50,
        discount: 20,
        unit: "1 kg",
        images: [{
          url: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop",
          alt: "Fresh Bananas"
        }],
        stock: 150,
        isAvailable: true,
        isFeatured: true,
        fastDelivery: true,
        tags: ["organic", "healthy", "fruit"],
        nutritionalInfo: {
          calories: 89,
          carbs: 23,
          fiber: 2.6,
          protein: 1.1
        }
      },
      {
        name: "Organic Tomatoes",
        description: "Fresh organic tomatoes, perfect for cooking and salads",
        category: vegFruitCategory._id,
        brand: "Organic Valley",
        price: 60,
        mrp: 70,
        discount: 14,
        unit: "500g",
        images: [{
          url: "https://images.unsplash.com/photo-1546470427-e5f2e6c5e5c4?w=300&h=300&fit=crop",
          alt: "Organic Tomatoes"
        }],
        stock: 100,
        isAvailable: true,
        isFeatured: true,
        fastDelivery: true,
        tags: ["organic", "vegetable", "healthy"]
      },
      {
        name: "Green Apples",
        description: "Crisp and juicy green apples, rich in fiber and vitamins",
        category: vegFruitCategory._id,
        brand: "Premium Fruits",
        price: 120,
        mrp: 140,
        discount: 14,
        unit: "1 kg",
        images: [{
          url: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop",
          alt: "Green Apples"
        }],
        stock: 80,
        isAvailable: true,
        isFeatured: false,
        fastDelivery: true,
        tags: ["fruit", "healthy", "vitamin-c"]
      }
    );

    // Dairy & Bakery
    const dairyCategory = insertedCategories.find(cat => cat.name === "Dairy & Bakery");
    products.push(
      {
        name: "Fresh Milk",
        description: "Pure and fresh full cream milk, rich in calcium",
        category: dairyCategory._id,
        brand: "Amul",
        price: 56,
        mrp: 60,
        discount: 7,
        unit: "1L",
        images: [{
          url: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=300&fit=crop",
          alt: "Fresh Milk"
        }],
        stock: 200,
        isAvailable: true,
        isFeatured: true,
        fastDelivery: true,
        tags: ["dairy", "calcium", "protein"]
      },
      {
        name: "Brown Bread",
        description: "Healthy whole wheat brown bread, perfect for breakfast",
        category: dairyCategory._id,
        brand: "Britannia",
        price: 25,
        mrp: 30,
        discount: 17,
        unit: "400g",
        images: [{
          url: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=300&h=300&fit=crop",
          alt: "Brown Bread"
        }],
        stock: 50,
        isAvailable: true,
        isFeatured: false,
        fastDelivery: false,
        tags: ["bakery", "healthy", "wheat"]
      },
      {
        name: "Greek Yogurt",
        description: "Creamy Greek yogurt, high in protein and probiotics",
        category: dairyCategory._id,
        brand: "Epigamia",
        price: 85,
        mrp: 100,
        discount: 15,
        unit: "400g",
        images: [{
          url: "https://images.unsplash.com/photo-1571212515416-6cd1b87e2b9a?w=300&h=300&fit=crop",
          alt: "Greek Yogurt"
        }],
        stock: 60,
        isAvailable: true,
        isFeatured: true,
        fastDelivery: true,
        tags: ["dairy", "protein", "probiotics"]
      }
    );

    // Snacks & Beverages
    const snacksCategory = insertedCategories.find(cat => cat.name === "Snacks & Beverages");
    products.push(
      {
        name: "Potato Chips",
        description: "Crispy and delicious potato chips, perfect for snacking",
        category: snacksCategory._id,
        brand: "Lays",
        price: 20,
        mrp: 25,
        discount: 20,
        unit: "100g",
        images: [{
          url: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&h=300&fit=crop",
          alt: "Potato Chips"
        }],
        stock: 120,
        isAvailable: true,
        isFeatured: false,
        fastDelivery: true,
        tags: ["snacks", "crispy", "potato"]
      },
      {
        name: "Coca Cola",
        description: "Refreshing Coca Cola, the classic cola drink",
        category: snacksCategory._id,
        brand: "Coca Cola",
        price: 40,
        mrp: 45,
        discount: 11,
        unit: "750ml",
        images: [{
          url: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=300&h=300&fit=crop",
          alt: "Coca Cola"
        }],
        stock: 90,
        isAvailable: true,
        isFeatured: false,
        fastDelivery: true,
        tags: ["beverage", "cola", "refreshing"]
      },
      {
        name: "Orange Juice",
        description: "Fresh and natural orange juice, rich in vitamin C",
        category: snacksCategory._id,
        brand: "Real",
        price: 75,
        mrp: 90,
        discount: 17,
        unit: "1L",
        images: [{
          url: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&h=300&fit=crop",
          alt: "Orange Juice"
        }],
        stock: 70,
        isAvailable: true,
        isFeatured: true,
        fastDelivery: true,
        tags: ["juice", "vitamin-c", "natural"]
      }
    );

    // Personal Care
    const personalCareCategory = insertedCategories.find(cat => cat.name === "Personal Care");
    products.push(
      {
        name: "Face Wash",
        description: "Gentle face wash for all skin types, removes dirt and oil",
        category: personalCareCategory._id,
        brand: "Cetaphil",
        price: 150,
        mrp: 180,
        discount: 17,
        unit: "100ml",
        images: [{
          url: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop",
          alt: "Face Wash"
        }],
        stock: 40,
        isAvailable: true,
        isFeatured: false,
        fastDelivery: false,
        tags: ["skincare", "gentle", "cleansing"]
      }
    );

    // Household Items
    const householdCategory = insertedCategories.find(cat => cat.name === "Household Items");
    products.push(
      {
        name: "Dish Soap",
        description: "Effective dish soap that cuts through grease and grime",
        category: householdCategory._id,
        brand: "Vim",
        price: 45,
        mrp: 55,
        discount: 18,
        unit: "500ml",
        images: [{
          url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
          alt: "Dish Soap"
        }],
        stock: 80,
        isAvailable: true,
        isFeatured: false,
        fastDelivery: true,
        tags: ["cleaning", "household", "effective"]
      }
    );

    // Baby Care
    const babyCareCategory = insertedCategories.find(cat => cat.name === "Baby Care");
    products.push(
      {
        name: "Baby Diapers",
        description: "Soft and comfortable baby diapers with 12-hour protection",
        category: babyCareCategory._id,
        brand: "Pampers",
        price: 320,
        mrp: 380,
        discount: 16,
        unit: "Pack of 20",
        images: [{
          url: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&h=300&fit=crop",
          alt: "Baby Diapers"
        }],
        stock: 30,
        isAvailable: true,
        isFeatured: true,
        fastDelivery: true,
        tags: ["baby", "diapers", "comfort"]
      }
    );

    // Insert products
    await Product.insertMany(products);
    console.log('🛍️ Products inserted successfully');

    console.log('✅ Database seeding completed successfully!');
    console.log(`📊 Inserted ${insertedCategories.length} categories and ${products.length} products`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
