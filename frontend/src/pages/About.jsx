import "./About.css";

function About() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="container">
          <h1 className="about-hero-title">About BookStore</h1>
          <p className="about-hero-subtitle">
            Your trusted partner in the world of books since 2024
          </p>
        </div>
      </div>

      <div className="container">
        <section className="about-section">
          <div className="about-content">
            <h2 className="section-title">Our Story</h2>
            <p className="section-text">
              BookStore was founded with a simple yet powerful vision: to make quality
              literature accessible to everyone. We believe that books have the power to
              transform lives, broaden perspectives, and inspire change.
            </p>
            <p className="section-text">
              What started as a small collection of carefully curated titles has grown
              into a comprehensive online bookstore serving thousands of readers worldwide.
              Our commitment remains unchanged – delivering exceptional books with
              exceptional service.
            </p>
          </div>
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&h=400&fit=crop"
              alt="Bookstore"
            />
          </div>
        </section>

        <section className="values-section">
          <h2 className="section-title centered">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">📚</div>
              <h3>Quality Selection</h3>
              <p>
                Every book in our collection is carefully selected to ensure we offer
                only the best titles across all genres and categories.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🚀</div>
              <h3>Fast Delivery</h3>
              <p>
                We understand your excitement to start reading. That's why we ensure
                fast and reliable delivery to get books to you quickly.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3>Customer First</h3>
              <p>
                Your satisfaction is our priority. Our dedicated support team is always
                ready to help with any questions or concerns.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌍</div>
              <h3>Global Reach</h3>
              <p>
                We ship worldwide, bringing great literature to readers everywhere,
                breaking down geographical barriers to knowledge.
              </p>
            </div>
          </div>
        </section>

        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-item">
              <h3 className="stat-number">10,000+</h3>
              <p className="stat-label">Books Available</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">50,000+</h3>
              <p className="stat-label">Happy Customers</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">100+</h3>
              <p className="stat-label">Countries Served</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">4.9/5</h3>
              <p className="stat-label">Customer Rating</p>
            </div>
          </div>
        </section>

        <section className="mission-section">
          <div className="mission-content">
            <h2 className="section-title">Our Mission</h2>
            <p className="mission-text">
              To inspire a love of reading by providing access to diverse, high-quality
              literature and creating a community where readers can discover, share,
              and celebrate the transformative power of books.
            </p>
            <p className="mission-text">
              We're not just selling books – we're fostering a culture of learning,
              imagination, and growth. Every purchase supports authors, publishers,
              and the literary ecosystem that enriches our world.
            </p>
          </div>
        </section>

        <section className="team-section">
          <h2 className="section-title centered">Meet Our Team</h2>
          <p className="team-intro">
            Behind BookStore is a passionate team of book lovers, tech enthusiasts,
            and customer service experts dedicated to delivering the best experience.
          </p>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">👨‍💼</div>
              <h3>John Smith</h3>
              <p className="member-role">Founder & CEO</p>
              <p className="member-bio">
                Passionate about making literature accessible to all.
              </p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👩‍💻</div>
              <h3>Sarah Johnson</h3>
              <p className="member-role">Head of Technology</p>
              <p className="member-bio">
                Building seamless digital experiences for readers.
              </p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👨‍🎨</div>
              <h3>Mike Chen</h3>
              <p className="member-role">Curator</p>
              <p className="member-bio">
                Discovering hidden gems and bestsellers alike.
              </p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👩‍💼</div>
              <h3>Emily Davis</h3>
              <p className="member-role">Customer Success</p>
              <p className="member-bio">
                Ensuring every customer has an amazing experience.
              </p>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <h2>Ready to Start Your Reading Journey?</h2>
          <p>Join thousands of satisfied readers today!</p>
          <a href="/" className="cta-button">
            Explore Our Collection
          </a>
        </section>
      </div>
    </div>
  );
}

export default About;
