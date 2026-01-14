import React, { useEffect, useState } from "react";
import axios from "axios";
import "./product.css"; // styling file

const Product = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from backend when page loads
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Handle Add to Cart
  const handleAddToCart = (product) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login to add items to your cart!");
      window.location.href = "/login"; // redirect to login page
      return;
    }

    axios
      .post("http://127.0.0.1:5000/api/cart", {
        email: user.email,
        product: product,
      })
      .then(() => alert(`${product.name} added to cart!`))
      .catch((err) => console.error("Error adding to cart:", err));
  };

  return (
    <div className="product-page">
      <h1>Our Products</h1>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div className="product-card" key={index}>
              <img
                src={product.image || "https://via.placeholder.com/200"}
                alt={product.name}
              />
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
              <button onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default Product;


