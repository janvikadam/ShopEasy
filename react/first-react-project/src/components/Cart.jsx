import React, { useEffect, useState } from "react";
import axios from "axios";
import "./cart.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please login first!");
      window.location.href = "/login";
      return;
    }

    try {
      const res = await axios.get(`http://127.0.0.1:5000/api/cart/${user.email}`);
      setCart(res.data || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
      alert("Could not fetch cart. Check console.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line
  }, []);

  const handleRemove = async (cartId) => {
    if (!window.confirm("Remove this item from cart?")) return;

    try {
      await axios.delete(`http://127.0.0.1:5000/api/cart/item/${cartId}`);
      // remove locally so UI updates instantly
      setCart((prev) => prev.filter((it) => it._id !== cartId));
    } catch (err) {
      console.error("Error removing item:", err);
      alert("Could not remove item. Check console.");
    }
  };

  // ✅ Calculate total items & total amount
  const totalItems = cart.reduce((sum, item) => {
    const qty = item.quantity || 1; // assume quantity 1 if not present
    return sum + qty;
  }, 0);

  const totalAmount = cart.reduce((sum, item) => {
    const price = Number(item.product?.price) || 0;
    const qty = item.quantity || 1;
    return sum + price * qty;
  }, 0);

  if (loading) {
    return (
      <div className="cart-page">
        <h2>Loading cart...</h2>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cart.length > 0 ? (
        <>
          <ul className="cart-items">
            {cart.map((item) => (
              <li className="cart-item" key={item._id}>
                <img
                  src={item.product?.image || "https://via.placeholder.com/200"}
                  alt={item.product?.name || "Product"}
                />
                <div className="cart-item-details">
                  <h4>{item.product?.name}</h4>
                  <p>₹{item.product?.price}</p>
                  {/* ✅ Show quantity if available */}
                  <p className="cart-item-qty">
                    Qty: {item.quantity || 1}
                  </p>
                </div>
                <button onClick={() => handleRemove(item._id)}>Remove</button>
              </li>
            ))}
          </ul>

          {/* ✅ Cart Summary Block */}
          <div className="cart-summary">
            <div className="summary-row">
              <span>Items:</span>
              <span>{totalItems}</span>
            </div>
            <div className="summary-row">
              <span>Total Amount:</span>
              <span>₹{totalAmount.toLocaleString("en-IN")}</span>
            </div>
            <button className="checkout-btn">
              Proceed to Checkout
            </button>
          </div>
        </>
      ) : (
        <p className="cart-empty">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;



