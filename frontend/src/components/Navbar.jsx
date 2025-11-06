import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Navbar.css";

function Navbar() {
  const { getCartCount } = useContext(CartContext);
  const location = useLocation();
  const cartCount = getCartCount();

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link className="navbar-brand" to="/">
          <span className="brand-icon">📚</span>
          BookStore
        </Link>
        
        <div className="navbar-menu">
          <Link className={`nav-link ${isActive("/")}`} to="/">
            Home
          </Link>
          <Link className={`nav-link ${isActive("/about")}`} to="/about">
            About
          </Link>
          <Link className={`nav-link cart-link ${isActive("/cart")}`} to="/cart">
            🛒 Cart
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <Link className={`nav-link login-btn ${isActive("/login")}`} to="/login">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
