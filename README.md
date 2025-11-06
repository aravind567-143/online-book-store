# 📚 Online Book Store

A full-stack online book store application with React frontend and Express.js/MongoDB backend.

## 🌟 Features

### Frontend
- Modern, responsive UI with React
- Browse books by category
- Search functionality
- Shopping cart with localStorage persistence
- Guest and authenticated checkout
- User authentication (login/register)
- Book detail pages
- About page

### Backend
- RESTful API with Express.js
- MongoDB database with Mongoose ODM
- JWT authentication
- User management (register, login, profile)
- Book CRUD operations
- Order processing
- Admin panel functionality
- Guest checkout support
- Input validation and error handling

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router v6
- Context API for state management
- CSS3 for styling
- Vite for building

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd online-book-store
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/online-book-store
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

Seed the database:
```bash
npm run seed
```

Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal:
```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

## 👤 Default User Accounts

After seeding the database, you can use these accounts:

**Admin Account:**
- Email: admin@bookstore.com
- Password: admin123

**Test User Account:**
- Email: test@bookstore.com
- Password: test123

## 📁 Project Structure

```
online-book-store/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── bookController.js
│   │   ├── userController.js
│   │   └── orderController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Book.js
│   │   ├── User.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── bookRoutes.js
│   │   ├── userRoutes.js
│   │   └── orderRoutes.js
│   ├── scripts/
│   │   └── seedDatabase.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── README.md
│   └── server.js
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   │   ├── BookCard.jsx
    │   │   ├── Footer.jsx
    │   │   ├── Navbar.jsx
    │   │   └── SearchBar.jsx
    │   ├── context/
    │   │   └── CartContext.jsx
    │   ├── data/
    │   │   └── booksData.js
    │   ├── pages/
    │   │   ├── About.jsx
    │   │   ├── BookDetail.jsx
    │   │   ├── Cart.jsx
    │   │   ├── Checkout.jsx
    │   │   ├── Home.jsx
    │   │   └── Login.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── .env
    ├── .gitignore
    ├── index.html
    ├── package.json
    ├── README.md
    └── vite.config.js
```

## 🔌 API Endpoints

### Books
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get book by ID
- `GET /api/books/search?q=query` - Search books
- `POST /api/books` - Create book (Admin)
- `PUT /api/books/:id` - Update book (Admin)
- `DELETE /api/books/:id` - Delete book (Admin)

### Users
- `POST /api/users/register` - Register
- `POST /api/users/login` - Login
- `GET /api/users/profile` - Get profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users` - Get all users (Admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order
- `GET /api/orders/my-orders` - Get user orders
- `GET /api/orders` - Get all orders (Admin)
- `PUT /api/orders/:id/status` - Update status (Admin)

## 🎨 Features to Implement

The frontend is already set up to connect with the backend. You can now:

1. Update `Home.jsx` to fetch books from the API instead of using static data
2. Update `Login.jsx` to use the authentication API
3. Update `Checkout.jsx` to create orders via the API
4. Add protected routes for user profile and order history
5. Add admin dashboard for managing books and orders

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes with middleware
- Input validation
- CORS enabled
- Environment variables for sensitive data

## 🧪 Testing the API

You can test the API using tools like:
- Postman
- Thunder Client (VS Code extension)
- cURL commands

Example:
```bash
curl http://localhost:5000/api/books
```

## 📝 Development Tips

1. Make sure MongoDB is running before starting the backend
2. Run `npm run seed` to populate the database with sample data
3. Use `npm run dev` for development with auto-reload (nodemon)
4. Check browser console and terminal for errors
5. Use React DevTools for debugging frontend

## 🚢 Deployment

### Backend
- Deploy to platforms like Heroku, Railway, or DigitalOcean
- Use MongoDB Atlas for cloud database
- Set environment variables in deployment platform

### Frontend
- Deploy to Vercel, Netlify, or GitHub Pages
- Update VITE_API_URL to production backend URL
- Build with `npm run build`

## 📄 License

MIT

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Your Name

---

**Happy Coding! 📚✨**
