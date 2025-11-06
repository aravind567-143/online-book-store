import { useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import { booksData } from "../data/booksData";
import "./Home.css";

function Home() {
  const [books, setBooks] = useState(booksData);
  const [filteredBooks, setFilteredBooks] = useState(booksData);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["All", ...new Set(books.map(book => book.category))];

  const applyFilters = (search, category) => {
    let filtered = books;
    
    // Apply search filter
    if (search) {
      const term = search.toLowerCase();
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term) ||
        book.category.toLowerCase().includes(term)
      );
    }
    
    // Apply category filter if not "All"
    if (category !== "All") {
      filtered = filtered.filter(book => book.category === category);
    }
    
    setFilteredBooks(filtered);
  };

  const handleSearch = (search) => {
    setSearchTerm(search);
    applyFilters(search, selectedCategory);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    applyFilters(searchTerm, category);
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Our Book Store</h1>
          <p className="hero-subtitle">
            Discover amazing books that inspire, educate, and entertain
          </p>
        </div>
      </div>

      <div className="container">
        <SearchBar onSearch={handleSearch} />

        <div className="category-filter">
          <h3 className="filter-title">Browse by Category</h3>
          <div className="category-buttons">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="books-section">
          <div className="section-header">
            <h2 className="section-title">
              {selectedCategory === "All" ? "All Books" : selectedCategory}
            </h2>
            <p className="books-count">{filteredBooks.length} books found</p>
          </div>

          {filteredBooks.length === 0 ? (
            <div className="no-books">
              <span className="no-books-icon">📚</span>
              <h3>No books found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="books-grid">
              {filteredBooks.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
