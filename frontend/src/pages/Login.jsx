import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    // Simulate login/signup
    alert(isLogin ? "Login successful!" : "Account created successfully!");
    navigate("/");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-title">
              {isLogin ? "Welcome Back!" : "Create Account"}
            </h1>
            <p className="login-subtitle">
              {isLogin
                ? "Sign in to access your account"
                : "Join us to start your reading journey"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {!isLogin && (
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
              </div>
            )}

            {isLogin && (
              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="forgot-link">
                  Forgot password?
                </a>
              </div>
            )}

            <button type="submit" className="login-btn">
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="login-divider">
            <span>OR</span>
          </div>

          <div className="social-login">
            <button className="social-btn google-btn">
              <span className="social-icon">🔍</span>
              Continue with Google
            </button>
            <button className="social-btn facebook-btn">
              <span className="social-icon">📘</span>
              Continue with Facebook
            </button>
          </div>

          <div className="toggle-form">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="toggle-btn"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>

        <div className="login-illustration">
          <div className="illustration-content">
            <h2>📚 Discover Your Next Great Read</h2>
            <p>
              Join thousands of readers who trust BookStore for their literary
              adventures. Access exclusive deals, personalized recommendations,
              and a seamless shopping experience.
            </p>
            <div className="features-list">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Exclusive member discounts</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Personalized book recommendations</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Early access to new releases</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
