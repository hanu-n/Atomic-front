import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AddProductForm from "./AddProductForm";
import { useLocation } from "react-router-dom";


const ProductList2 = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

   const query = useQuery();
  const searchTerm = query.get("search") || "";

 const fetchProducts = async () => {
  setLoading(true);
  try {
    const res = await  axios.get("http://localhost:5000/api/products")
   

    setProducts(Array.isArray(res.data) ? res.data : res.data.data || []);
  } catch (error) {
    console.error("Error fetching products", error);
    toast.error("Failed to load products! Please try again");
  } finally {
    setLoading(false);
  }
};

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      setProducts((prev) => prev.filter((product) => product._id !== id));
      toast.success(`Product deleted successfully`);
    } catch (error) {
      console.error("Failed to delete product", error);
      toast.error("Failed to delete product. Try again!");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Separate in-stock and out-of-stock products
const inStockProducts = products.filter((p) => p.countInStock > 0);
const outOfStockProducts = products.filter((p) => p.countInStock === 0);
return (
  <div className="container my-5">
    {/* Add Product Form */}
    <div className="mb-5">
      <AddProductForm onProductAdded={(newProduct) => setProducts((prev) => [newProduct, ...prev])} />
    </div>

    {/* In-stock Products */}
    <h2 className="mb-4" style={{ color: "#2E8B57" }}>All Products</h2>
    {loading ? (
      <p className="text-muted">Loading products...</p>
    ) : inStockProducts.length === 0 ? (
      <p className="text-muted">No products available.</p>
    ) : (
      <div className="row g-4">
        {inStockProducts.map((p) => (
          <div key={p._id} className="col-md-4">
            <div className="card shadow-sm border-0 h-100">
              <img
            src={p.image}
            alt={p.name}
            className="card-img-top"
            style={{ height: "300px", objectFit: "cover" }}
          />
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text mb-1">Stock: {p.countInStock}</p>
                  <p className="card-text mb-3 fw-bold">${p.price}</p>
                </div>
                <div>
                  <button className="btn btn-outline-success w-100" disabled>
                    In Stock
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}

    <hr className="my-5" />

    {/* Out-of-stock Products */}
    <h3 className="mb-4" style={{ color: "#FF6B6B" }}>Out of Stock Products</h3>
    {outOfStockProducts.length === 0 ? (
      <p className="text-muted">🎉 All products are in stock!</p>
    ) : (
      <div className="row g-4">
        {outOfStockProducts.map((p) => (
          <div key={p._id} className="col-md-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text mb-1">Stock: {p.countInStock}</p>
                  <p className="card-text mb-3 fw-bold">${p.price}</p>
                </div>
                <div>
                  <button
                    className="btn btn-danger w-100"
                    onClick={() => deleteProduct(p._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);


};

export default ProductList2;
