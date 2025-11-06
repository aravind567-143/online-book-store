import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./BookCard.css";

function BookCard({ book }) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(book);
    
    // Visual feedback
    const button = e.target;
    button.textContent = "Added! ✓";
    button.style.background = "#2ecc71";
    
    setTimeout(() => {
      button.textContent = "Add to Cart";
      button.style.background = "";
    }, 1500);
  };

  return (
    <div className="book-card">
      <Link to={`/book/${book.id}`} className="book-card-link">
        <div className="book-image-container">
          <img src={book.image} className="book-image" alt={book.title} />
          {!book.inStock && <div className="out-of-stock-badge">Out of Stock</div>}
          <div className="book-rating">⭐ {book.rating}</div>
        </div>
        
        <div className="book-info">
          <h3 className="book-title">{book.title}</h3>
          <p className="book-author">by {book.author}</p>
          <span className="book-category">{book.category}</span>
          <div className="book-footer">
            <p className="book-price">${book.price.toFixed(2)}</p>
          </div>
        </div>
      </Link>
      
      <div className="book-actions">
        <button 
          onClick={handleAddToCart}
          disabled={!book.inStock}
          className={`add-to-cart-btn ${!book.inStock ? 'disabled' : ''}`}
        >
          {book.inStock ? 'Add to Cart' : 'Unavailable'}
        </button>
      </div>
    </div>
  );
}

export default BookCard;
