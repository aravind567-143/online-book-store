# Online Book Store - Backend API

Backend API for the Online Book Store built with Express.js and MongoDB.

## 🚀 Features

- RESTful API for book management
- User authentication and authorization (JWT)
- Order processing and management
- Guest checkout support
- Admin panel functionality
- MongoDB database with Mongoose ODM
- Secure password hashing with bcrypt
- Input validation
- Error handling middleware

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## 🛠️ Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

**Note:** If using MongoDB Atlas with Node.js v20+, you may need to set `NODE_OPTIONS='--tls-min-v1.0'` to resolve SSL/TLS compatibility issues.

4. Seed the database with sample data:
```bash
# For local MongoDB:
npm run seed

# For MongoDB Atlas (if you encounter SSL errors):
$env:NODE_OPTIONS='--tls-min-v1.0' ; npm run seed
```

5. Start the development server:
```bash
# For local MongoDB:
npm run dev

# For MongoDB Atlas (recommended):
$env:NODE_OPTIONS='--tls-min-v1.0' ; npm start

# OR use the PowerShell script:
.\start-server.ps1
```

The server will start on `http://localhost:5000`

## 📚 API Endpoints

### Books
- `GET /api/books` - Get all books (supports filtering)
- `GET /api/books/:id` - Get book by ID
- `GET /api/books/search?q=query` - Search books
- `POST /api/books` - Create book (Admin only)
- `PUT /api/books/:id` - Update book (Admin only)
- `DELETE /api/books/:id` - Delete book (Admin only)

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (Protected)
- `PUT /api/users/profile` - Update user profile (Protected)
- `GET /api/users` - Get all users (Admin only)

### Orders
- `POST /api/orders` - Create new order (Guest or authenticated)
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders/my-orders` - Get user orders (Protected)
- `GET /api/orders` - Get all orders (Admin only)
- `PUT /api/orders/:id/status` - Update order status (Admin only)

### Health Check
- `GET /api/health` - Check API status

## 🔐 Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## 👤 Default Users

After seeding the database:

**Admin User:**
- Email: admin@bookstore.com
- Password: admin123

**Test User:**
- Email: test@bookstore.com
- Password: test123

## 🗄️ Database Models

### Book
- title, author, price, description
- image, category, rating
- inStock, stock, isbn, publishedYear

### User
- fullName, email, password (hashed)
- phone, address, role (user/admin)
- isActive

### Order
- user, orderNumber, items[]
- shippingInfo, paymentInfo
- totalAmount, status

## 🧪 Testing API

You can test the API using:
- Postman
- Thunder Client (VS Code extension)
- cURL commands
- Browser (for GET requests)

Example cURL request:
```bash
curl http://localhost:5000/api/books
```

## 📦 Project Structure

```
backend/
├── config/
│   └── database.js       # MongoDB connection
├── controllers/          # Request handlers
│   ├── bookController.js
│   ├── userController.js
│   └── orderController.js
├── middleware/
│   └── auth.js          # Authentication middleware
├── models/              # Mongoose schemas
│   ├── Book.js
│   ├── User.js
│   └── Order.js
├── routes/              # API routes
│   ├── bookRoutes.js
│   ├── userRoutes.js
│   └── orderRoutes.js
├── scripts/
│   └── seedDatabase.js  # Database seeding script
├── .env                 # Environment variables
├── .env.example         # Example env file
├── .gitignore
├── package.json
└── server.js            # Main application file
```

## 🚀 Deployment

1. Update `.env` with production values
2. Set `NODE_ENV=production`
3. Use a process manager like PM2:
```bash
npm install -g pm2
pm2 start server.js --name bookstore-api
```

## 📝 License

MIT
