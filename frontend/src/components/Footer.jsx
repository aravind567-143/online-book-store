import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">📚 BookStore</h3>
          <p className="footer-description">
            Your one-stop destination for quality books. We bring knowledge to your doorstep.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/cart">Shopping Cart</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Categories</h4>
          <ul className="footer-links">
            <li><a href="/">Programming</a></li>
            <li><a href="/">Software Engineering</a></li>
            <li><a href="/">Computer Science</a></li>
            <li><a href="/">Design</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Connect With Us</h4>
          <div className="social-links">
            <a href="#" className="social-link" aria-label="Facebook">📘</a>
            <a href="#" className="social-link" aria-label="Twitter">🐦</a>
            <a href="#" className="social-link" aria-label="Instagram">📷</a>
            <a href="#" className="social-link" aria-label="LinkedIn">💼</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} BookStore. All rights reserved. Built with React ❤️</p>
      </div>
    </footer>
  );
}

export default Footer;
