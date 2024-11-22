import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditProduct = ({ fetchProducts }) => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    price: 0, // Default to 0 for price
    category: "",
    description: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          // Ensure product fields are correctly populated
          setProduct({
            name: data.product?.name || "",
            price: data.product?.price || 0, // Default to 0 if price is not available
            category: data.product?.category || "",
            description: data.product?.description || "",
          });
        } else {
          console.error("Failed to fetch product");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  
  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        alert("Product updated successfully!");
        fetchProducts();
      } else {
        throw new Error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <input
        type="text"
        placeholder="Name"
        value={product.name || ""}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={product.price || 0} // Ensure it's a number (fallback to 0)
        onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) || 0 })}
      />
      <input
        type="text"
        placeholder="Category"
        value={product.category || ""}
        onChange={(e) => setProduct({ ...product, category: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={product.description || ""}
        onChange={(e) => setProduct({ ...product, description: e.target.value })}
      />
      <button onClick={handleUpdate}>Update Product</button>
    </div>
  );
};

export default EditProduct;