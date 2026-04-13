const mongoose = require('mongoose');
const Product = require('./src/models/product');
require('dotenv').config();

const products = [
  {
    name: "Organic Almonds",
    price: 499,
    originalPrice: 699,
    image: "/almonds.png",
    rating: 5,
    numReviews: 12,
    discount: 28,
    badge: "HEALTHY CHOICE",
    category: "Dry Fruits",
    stock: 100,
    description: "Premium quality organic almonds. Rich in protein and essential nutrients."
  },
  {
    name: "Premium Cashews",
    price: 599,
    originalPrice: 799,
    image: "/cashews.png",
    rating: 5,
    numReviews: 15,
    discount: 25,
    badge: "TOP QUALITY",
    category: "Dry Fruits",
    stock: 120,
    description: "Creamy and delicious premium whole cashews. Perfect for a healthy snack."
  },
  {
    name: "Walnut Kernels",
    price: 450,
    originalPrice: 550,
    image: "/walnuts.png",
    rating: 5,
    numReviews: 8,
    discount: 18,
    badge: "BESTSELLER",
    category: "Dry Fruits",
    stock: 80,
    description: "Crispy and fresh walnut kernels. Excellent source of Omega-3 fatty acids."
  }
];

const seedProducts = async () => {
    try {
        console.log("Connecting to DB...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected successfully.");

        console.log("Clearing all existing products...");
        await Product.deleteMany({});
        console.log("Database cleared.");

        console.log("Adding simplified products with local assets...");
        await Product.insertMany(products);
        console.log(`[SUCCESS] ${products.length} products added successfully!`);

    } catch(e) { 
        console.error("[ERROR] Seeding failed:", e); 
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from DB.");
        process.exit();
    }
};

seedProducts();
