import React from "react";
import "./deals.css";

const Deals = () => {
  const dealsData = [
    {
      id: 1,
      name: "Wireless Headphones",
      oldPrice: 2999,
      newPrice: 1999,
      image: "src/assets/box2.jpg",
      discount: "33% OFF",
    },
    {
      id: 2,
      name: "Smart Watch",
      oldPrice: 4999,
      newPrice: 3499,
      image: "src/assets/box2.jpg",
      discount: "30% OFF",
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      oldPrice: 1999,
      newPrice: 1299,
      image: "src/assets/box2.jpg",
      discount: "35% OFF",
    },
  ];

  return (
    <div className="deals-page">
      <h1>🔥 Today’s Deals</h1>
      <div className="deals-list">
        {dealsData.map((deal) => (
          <div key={deal.id} className="deal-card">
            <span className="discount-badge">{deal.discount}</span>
            <img src={deal.image} alt={deal.name} />
            <h3>{deal.name}</h3>
            <p className="old-price">₹{deal.oldPrice}</p>
            <p className="new-price">₹{deal.newPrice}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deals;
