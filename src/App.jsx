import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import EditProduct from "./components/EditProduct"
import './App.css'
function App() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
      } else {
        throw new Error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/add">Add Product</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ProductList products={products} fetchProducts={fetchProducts} />} />
        <Route path="/add" element={<AddProduct fetchProducts={fetchProducts} />} />
        <Route path="/edit/:id" element={<EditProduct products={products} fetchProducts={fetchProducts} />} />
      </Routes>
    </Router>
  );
}

export default App;
// import { useState } from "react";
// import Products from "./components/Products";
// import "./App.css";

// function App() {
//   const [apiResponse, setApiResponse] = useState([]);

//   const handleClick = async () => {
//     const apiUrl = "http://localhost:3000/api/products/";

//     try {
//       const response = await fetch(apiUrl);

//       // Check if the response was successful
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       // Parse the response to JSON
//       const data = await response.json();

//       // Log the API response data
//       console.log("API Response:", data);

//       // Store the response data in the state
//       setApiResponse(data.products || []); // Assuming API returns { products: [...] }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   return (
//     <>
//       <div>
//         <button onClick={handleClick}>Fetch Products</button>
//       </div>
//       <Products products={apiResponse} />
//     </>
//   );
// }

// export default App;