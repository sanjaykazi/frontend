import React from "react";
import "./Products.css"; // Import the CSS file

const Products = ({ products }) => {
  if (!products || products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div className="products-container">
      {products.map((product) => (
        <div className="product-box" key={product.id}>
          <h3>{product.name}</h3>
          <p>Price: ₹{product.price}</p>
          <p>Category: {product.category}</p>
          <p>Description: {product.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Products;