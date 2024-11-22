import React from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css";

const ProductList = ({ products, fetchProducts }) => {
  const navigate = useNavigate();

  const handleDelete = async (product) => {
    console.log(product);
    try {
      const response = await fetch(`http://localhost:3000/api/products/${product._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Product deleted successfully!");
        fetchProducts();
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <h2>Products List</h2>
      <div className="products-container">
        {products.map((product, index) => (
          <div className="product-box" key={index}>
            <h3>{product.name}</h3>
            <p>Price: ₹{product.price}</p>
            <p>Category: {product.category}</p>
            <p>Description: {product.description}</p>
            <button onClick={() => navigate(`/edit/${product._id}`)}>Edit</button>
            <button onClick={() => handleDelete(product)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;