# Frontend Integration Guide

This guide shows how to update the frontend to use the backend API instead of static data.

## ✅ Already Done

1. ✅ Created `src/services/api.js` - API service with all endpoints
2. ✅ Created `.env` file with backend URL
3. ✅ Backend is running on http://localhost:5000

## 🔄 Updates Needed

### 1. Update Home.jsx to fetch books from API

Replace the static `booksData` import with API call:

```jsx
import { useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import { booksAPI } from "../services/api";  // Add this import
import "./Home.css";

function Home() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch books from API on component mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await booksAPI.getAll();
        setBooks(response.data);
        setFilteredBooks(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching books:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Rest of the component remains the same...
  // Just add loading and error states in the render
}
```

### 2. Update Login.jsx to use authentication API

Add API calls for login and register:

```jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usersAPI } from "../services/api";  // Add this import
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    try {
      setLoading(true);
      
      if (isLogin) {
        // Login
        const response = await usersAPI.login({
          email: formData.email,
          password: formData.password
        });
        alert(response.message || "Login successful!");
      } else {
        // Register
        const response = await usersAPI.register({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password
        });
        alert(response.message || "Account created successfully!");
      }
      
      navigate("/");
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Rest of the component...
  // Add error display and loading state in the render
}
```

### 3. Update Checkout.jsx to create orders via API

Add API call to create orders:

```jsx
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { ordersAPI } from "../services/api";  // Add this import
import "./Checkout.css";

function Checkout() {
  const { cart, getCartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // ... formData state ...

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError("");
      
      // Prepare order data
      const orderData = {
        items: cart.map(item => ({
          book: item.id,
          title: item.title,
          author: item.author,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        shippingInfo: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode
        },
        paymentInfo: {
          method: 'credit_card',
          status: 'completed'
        },
        totalAmount: getCartTotal()
      };
      
      // Create order
      const response = await ordersAPI.create(orderData);
      
      setOrderPlaced(true);
      setTimeout(() => {
        clearCart();
        navigate("/");
      }, 3000);
    } catch (err) {
      setError(err.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  // Rest of the component...
}
```

### 4. Update BookDetail.jsx to fetch book details

```jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { booksAPI } from "../services/api";  // Add this import

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const response = await booksAPI.getById(id);
        setBook(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching book:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!book) return <div className="not-found">Book not found</div>;

  // Rest of the component...
}
```

### 5. Create AuthContext for managing user state

Create `src/context/AuthContext.jsx`:

```jsx
import { createContext, useState, useEffect } from "react";
import { usersAPI } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const currentUser = usersAPI.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const response = await usersAPI.login(credentials);
    setUser(response.data.user);
    return response;
  };

  const register = async (userData) => {
    const response = await usersAPI.register(userData);
    setUser(response.data.user);
    return response;
  };

  const logout = () => {
    usersAPI.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### 6. Update App.jsx to include AuthProvider

```jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";  // Add this
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import BookDetail from "./pages/BookDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import About from "./pages/About";
import "./App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/book/:id" element={<BookDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
```

### 7. Update Navbar to show user info

Update Navbar.jsx to display logged-in user and logout button:

```jsx
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";  // Add this
import "./Navbar.css";

function Navbar() {
  const { getCartCount } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);  // Add this
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          📚 Book Store
        </Link>
        
        <div className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          
          {user ? (
            <>
              <span className="nav-link">Hello, {user.fullName}</span>
              <button onClick={handleLogout} className="nav-link btn-link">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-link">Login</Link>
          )}
          
          <Link to="/cart" className="nav-link cart-link">
            🛒 Cart {getCartCount() > 0 && (
              <span className="cart-badge">{getCartCount()}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
```

## 🧪 Testing the Integration

1. **Start Backend**: `cd backend && npm run dev` (Already running!)
2. **Start Frontend**: `cd frontend && npm run dev`
3. **Test Features**:
   - Browse books (should load from API)
   - Search books
   - Register new account
   - Login with test account
   - Add books to cart
   - Complete checkout

## 🔑 Test Accounts

- **Admin**: admin@bookstore.com / admin123
- **User**: test@bookstore.com / test123

## 📝 Notes

- The backend supports both guest and authenticated checkout
- Cart data is stored in localStorage
- User authentication uses JWT tokens
- All API calls are handled through the `services/api.js` file
