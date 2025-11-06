import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { booksData } from "../data/booksData";
import "./BookDetail.css";

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const book = booksData.find(b => b.id === parseInt(id));

  if (!book) {
    return (
      <div className="container error-container">
        <h2>Book not found</h2>
        <button onClick={() => navigate("/")} className="back-btn">
          Back to Home
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(book);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const relatedBooks = booksData
    .filter(b => b.category === book.category && b.id !== book.id)
    .slice(0, 3);

  return (
    <div className="book-detail-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-link">
          ← Back
        </button>

        <div className="book-detail-container">
          <div className="book-detail-image">
            <img src={book.image} alt={book.title} />
            {!book.inStock && <div className="out-of-stock">Out of Stock</div>}
          </div>

          <div className="book-detail-info">
            <div className="book-category-badge">{book.category}</div>
            <h1 className="book-detail-title">{book.title}</h1>
            <p className="book-detail-author">by {book.author}</p>
            
            <div className="book-rating-section">
              <span className="rating-stars">⭐ {book.rating}</span>
              <span className="rating-text">(Based on customer reviews)</span>
            </div>

            <p className="book-description">{book.description}</p>

            <div className="book-price-section">
              <span className="price-label">Price:</span>
              <span className="book-detail-price">${book.price.toFixed(2)}</span>
            </div>

            <div className="book-availability">
              <span className={`availability-status ${book.inStock ? 'in-stock' : 'out-stock'}`}>
                {book.inStock ? '✓ In Stock' : '✕ Out of Stock'}
              </span>
            </div>

            {book.inStock && (
              <div className="purchase-section">
                <div className="quantity-selector">
                  <label>Quantity:</label>
                  <div className="quantity-controls">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span className="quantity-display">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`add-to-cart-large ${addedToCart ? 'added' : ''}`}
                >
                  {addedToCart ? '✓ Added to Cart!' : '🛒 Add to Cart'}
                </button>
              </div>
            )}
          </div>
        </div>

        {relatedBooks.length > 0 && (
          <div className="related-books-section">
            <h2 className="related-title">Related Books</h2>
            <div className="related-books-grid">
              {relatedBooks.map(relatedBook => (
                <div
                  key={relatedBook.id}
                  className="related-book-card"
                  onClick={() => navigate(`/book/${relatedBook.id}`)}
                >
                  <img src={relatedBook.image} alt={relatedBook.title} />
                  <h4>{relatedBook.title}</h4>
                  <p>{relatedBook.author}</p>
                  <span className="related-price">${relatedBook.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookDetail;
