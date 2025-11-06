import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Book from '../models/Book.js';
import User from '../models/User.js';

// Load environment variables
dotenv.config();

// Sample books data
const booksData = [
  {
    title: "React Mastery",
    author: "Dan Abramov",
    price: 25.99,
    description: "Master React from the ground up. Learn hooks, context, advanced patterns, and performance optimization techniques.",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=500&fit=crop",
    category: "Programming",
    rating: 4.8,
    inStock: true,
    stock: 50,
    publishedYear: 2022
  },
  {
    title: "Node.js in Action",
    author: "Ryan Dahl",
    price: 30.99,
    description: "Build scalable server-side applications with Node.js. Learn async programming, APIs, and microservices.",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=500&fit=crop",
    category: "Programming",
    rating: 4.6,
    inStock: true,
    stock: 45,
    publishedYear: 2021
  },
  {
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    price: 22.99,
    description: "Discover the elegant, essential parts of JavaScript. A must-read classic for all JS developers.",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=500&fit=crop",
    category: "Programming",
    rating: 4.7,
    inStock: true,
    stock: 60,
    publishedYear: 2008
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    price: 35.99,
    description: "A handbook of agile software craftsmanship. Learn to write code that is easy to read, maintain, and extend.",
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=500&fit=crop",
    category: "Software Engineering",
    rating: 4.9,
    inStock: true,
    stock: 40,
    publishedYear: 2008
  },
  {
    title: "Design Patterns",
    author: "Gang of Four",
    price: 42.99,
    description: "Elements of reusable object-oriented software. A fundamental book for software architects and developers.",
    image: "https://images.unsplash.com/photo-1618365908648-e71bd5716cba?w=400&h=500&fit=crop",
    category: "Software Engineering",
    rating: 4.8,
    inStock: true,
    stock: 35,
    publishedYear: 1994
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    price: 38.99,
    description: "Your journey to mastery. From journeyman to master, this book guides you through the software development lifecycle.",
    image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=400&h=500&fit=crop",
    category: "Software Engineering",
    rating: 4.8,
    inStock: true,
    stock: 42,
    publishedYear: 2019
  },
  {
    title: "Python Crash Course",
    author: "Eric Matthes",
    price: 28.99,
    description: "A hands-on, project-based introduction to programming. Perfect for beginners.",
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=400&h=500&fit=crop",
    category: "Programming",
    rating: 4.7,
    inStock: true,
    stock: 55,
    publishedYear: 2019
  },
  {
    title: "Deep Learning",
    author: "Ian Goodfellow",
    price: 65.99,
    description: "An MIT Press book covering the mathematical and conceptual background of deep learning.",
    image: "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=400&h=500&fit=crop",
    category: "Science",
    rating: 4.6,
    inStock: true,
    stock: 25,
    publishedYear: 2016
  },
  {
    title: "The Design of Everyday Things",
    author: "Don Norman",
    price: 32.99,
    description: "The essential principles of good design. Learn how to create products people love.",
    image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=500&fit=crop",
    category: "Design",
    rating: 4.7,
    inStock: true,
    stock: 38,
    publishedYear: 2013
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    price: 26.99,
    description: "An easy and proven way to build good habits and break bad ones.",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=500&fit=crop",
    category: "Self-Help",
    rating: 4.9,
    inStock: true,
    stock: 100,
    publishedYear: 2018
  }
];

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

// Seed data
const seedData = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Book.deleteMany({});
    await User.deleteMany({});
    
    // Insert books
    console.log('📚 Seeding books...');
    await Book.insertMany(booksData);
    console.log(`✅ ${booksData.length} books added`);
    
    // Create admin user
    console.log('👤 Creating admin user...');
    await User.create({
      fullName: 'Admin User',
      email: 'admin@bookstore.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log('✅ Admin user created (email: admin@bookstore.com, password: admin123)');
    
    // Create test user
    console.log('👤 Creating test user...');
    await User.create({
      fullName: 'Test User',
      email: 'test@bookstore.com',
      password: 'test123'
    });
    console.log('✅ Test user created (email: test@bookstore.com, password: test123)');
    
    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

// Run seed
seedData();
