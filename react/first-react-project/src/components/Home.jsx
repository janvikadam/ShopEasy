import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Home.css';

const categories = [
  { name: 'All', icon: '⭐' },
  { name: 'Electronics', icon: '💻' },
  { name: 'Fashion', icon: '👗' },
  { name: 'Home', icon: '🏠' },
  { name: 'Sports', icon: '🏀' },
  { name: 'Beauty', icon: '💄' }
];

const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 2499,
    image: './src/assets/wireless headphone.jpg',
    category: 'Electronics'
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 1999,
    image: './src/assets/box5.jpg',
    category: 'Electronics'
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    price: 2299,
    image: './src/assets/bluethoot.jpg',
    category: 'Electronics'
  },
  {
    id: 4,
    name: 'Samsung Tablet',
    price: 10299,
    image: './src/assets/box9.jpg',
    category: 'Electronics'
  },
  {
    id: 5,
    name: 'Fitness Band',
    price: 1999,
    image: './src/assets/fitnessband.jpg',
    category: 'Sports'
  },
  {
    id: 6,
    name: 'Teddy Bear',
    price: 1000,
    image: './src/assets/box2.jpg',
    category: 'Home'
  },
  {
    id: 7,
    name: 'PS5 Setup',
    price: 45299,
    image: './src/assets/game image.jpg',
    category: 'Electronics'
  },
  {
    id: 8,
    name: 'Pink Top',
    price: 599,
    image: './src/assets/pinktop.jpg',
    category: 'Fashion'
  },
  {
    id: 9,
    name: 'Black Hoodie',
    price: 1299,
    image: './src/assets/blackhoodie.jpg',
    category: 'Fashion'
  },
  {
    id: 10,
    name: 'Women’s Denim Jacket',
    price: 1599,
    image: './src/assets/denimjacket.jpg',
    category: 'Fashion'
  },
  {
    id: 11,
    name: 'Printed Summer Dress',
    price: 899,
    image: './src/assets/summerdress.jpg',
    category: 'Fashion'
  },
  {
    id: 12,
    name: 'Matte Lipstick',
    price: 299,
    image: './src/assets/mattelipstick.jpg',
    category: 'Beauty'
  },
  {
    id: 13,
    name: 'Face Moisturizer',
    price: 449,
    image: './src/assets/moisturizer.jpg',
    category: 'Beauty'
  },
  {
    id: 14,
    name: 'Aloe Vera Skin Gel',
    price: 199,
    image: './src/assets/aloegel.jpg',
    category: 'Beauty'
  },
];

const Home = ({ searchQuery }) => {       // ✅ get search text from App/Navbar
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Add to cart logic
  const handleAddToCart = async (product) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login to add items to your cart!");
      window.location.href = "/login";
      return;
    }

    try {
      await axios.post("http://127.0.0.1:5000/api/cart", {
        email: user.email,
        product: product
      });
      alert(`${product.name} added to cart!`);
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add product to cart");
    }
  };

  // ✅ Filter products based on selectedCategory + searchQuery
  const filteredProducts = products.filter((p) => {
    const matchCategory =
      selectedCategory === 'All' || p.category === selectedCategory;

    const matchSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1>
            Welcome to <span className="brand">ShopEasy</span>
          </h1>
          <p>Get exclusive deals on top products. Fast delivery & easy returns!</p>
          {/* ✅ go to /product, matches your App.jsx route */}
          <button className="shop-btn" onClick={() => navigate("/product")}>
            Shop Now
          </button>
        </div>
        <div className="promo-banner">
          <span>🔥 Summer Sale: Up to 50% OFF on Electronics!</span>
        </div>
      </header>

      {/* ✅ Category filter */}
      <section className="categories-section">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          {categories.map((cat) => (
            <div
              className={`category-card ${
                selectedCategory === cat.name ? 'active-category' : ''
              }`}
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
            >
              <span className="category-icon">{cat.icon}</span>
              <span className="category-name">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Filtered product list */}
      <section className="products-section">
        <div className="products-header">
          <h2>
            {selectedCategory === 'All'
              ? 'Featured Products'
              : `${selectedCategory} Products`}
          </h2>
          <span className="products-count">
            ({filteredProducts.length} items)
          </span>
        </div>

        <div className="products-grid">
          {filteredProducts.length === 0 ? (
            // ✅ No-results block (you can style/animate with CSS)
            <div className="no-results">
              <div className="no-results-circle">
                <div className="no-results-glass" />
              </div>
              <h3>No results found</h3>
              <p>Try a different keyword or change your category filter.</p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p className="price">₹{product.price}</p>
                <button
                  className="add-cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;



