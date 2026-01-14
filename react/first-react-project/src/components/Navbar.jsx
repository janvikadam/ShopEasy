import React, { useState, useMemo } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaSearch } from 'react-icons/fa';

const suggestionItems = [
  'Wireless Headphones',
  'Smart Watch',
  'Bluetooth Speaker',
  'Samsung Tablet',
  'Fitness Band',
  'Teddy Bear',
  'PS5 Setup',
  'Pink Top',
  'Black Hoodie',
  'Denim Jacket',
  'White Sneakers',
  'Matte Lipstick',
  'Face Moisturizer',
  'Aloe Vera Skin Gel'
];

const Navbar = ({ setSearchQuery }) => {
  const [searchText, setSearchText] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Filter suggestions based on input
  const filteredSuggestions = useMemo(() => {
    if (!searchText.trim()) return [];
    return suggestionItems.filter(item =>
      item.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    setSearchQuery(value);   // 🔁 send search text to parent (App → Home)
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (value) => {
    setSearchText(value);
    setSearchQuery(value);
    setShowSuggestions(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span>ShopEasy</span>
      </div>

      {/* Search Bar + Suggestions */}
      <div className="navbar-search-wrapper">
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search products..."
            value={searchText}
            onChange={handleChange}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          />
          <button><FaSearch /></button>
        </div>

        {/* 🔽 Suggestions Dropdown */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <ul className="search-suggestions">
            {filteredSuggestions.map((item) => (
              <li
                key={item}
                onMouseDown={() => handleSuggestionClick(item)}
              >
                <FaSearch className="suggestion-icon" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ul className="navbar-links">
        <li><Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link></li>
        <li><Link to="/product" style={{ color: 'inherit', textDecoration: 'none' }}>Products</Link></li>
        <li><Link to="/deals" style={{ color: 'inherit', textDecoration: 'none' }}>Deals</Link></li>
        <li><Link to="/cart" style={{ color: 'inherit', textDecoration: 'none' }}>Cart</Link></li>
        <li><Link to="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</Link></li>
      </ul>

      <div className="navbar-actions">
        <Link to="/signup">
          <button className="navbar-btn signup">Sign Up</button>
        </Link>
        <Link to="/login">
          <button className="navbar-btn login">Login</button>
        </Link>
        <Link to="/profile" className="navbar-profile">
          <FaUserCircle size={28} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;


