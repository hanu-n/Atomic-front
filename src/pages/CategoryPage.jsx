import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ContextualLoader from "../components/loader/ContextualLoader";

const CategoryPage = () => {
  const { categoryName, subCategoryName, subSubCategoryName } = useParams();
  const { dispatch } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // 🧹 Normalize slugs like "school-equipment" → "school equipment"
        const categoryForQuery = categoryName?.replace(/-/g, " ") || "";
        const subCatForQuery = subCategoryName?.replace(/-/g, " ") || "";
        const subSubCatForQuery = subSubCategoryName?.replace(/-/g, " ") || "";

 // 🔧 FIX: Use lowercase for consistent API matching
const finalCategory = categoryForQuery.toLowerCase();
const finalSubCategory = subCatForQuery?.toLowerCase() || "";
const finalSubSubCategory = subSubCatForQuery?.toLowerCase() || "";
        // 🌐 Build final API URL
        let url = `https://atomic-7jgw.onrender.com/api/products?category=${encodeURIComponent(finalCategory)}`;
        if (subCatForQuery && subCatForQuery !== "all")
          url += `&subCategory=${encodeURIComponent(finalSubCategory)}`;
        if (subSubCatForQuery && subSubCatForQuery !== "all")
          url += `&subSubCategory=${encodeURIComponent(finalSubSubCategory)}`;

        const { data } = await axios.get(url);

        // ✅ Ensure valid array response
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.warn("Unexpected response format:", data);
          setProducts([]);
        }

        // 🪄 Optional fallback: If no products, refetch without case formatting
        if (data.length === 0 && categoryName) {
          console.log("⚠️ Empty result — retrying with lowercase fallback");
          const fallbackUrl = `https://atomic-7jgw.onrender.com/api/products?category=${encodeURIComponent(
            categoryForQuery.toLowerCase()
          )}`;
          const { data: retry } = await axios.get(fallbackUrl);
          if (Array.isArray(retry)) setProducts(retry);
        }
      } catch (error) {
        console.error("❌ Error fetching products:", error);
        toast.error("Failed to load products.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (categoryName) fetchProducts();
  }, [categoryName, subCategoryName, subSubCategoryName]);

  const getPageTitle = () => {
    if (subSubCategoryName)
      return `${subSubCategoryName.replace(/-/g, " ")} (${subCategoryName?.replace(/-/g, " ")})`;
    if (subCategoryName)
      return `${subCategoryName.replace(/-/g, " ")} (${categoryName?.replace(/-/g, " ")})`;
    return categoryName?.replace(/-/g, " ");
  };

  if (loading) {
    return (
      <div
        className="container py-5 d-flex justify-content-center align-items-center"
        style={{ minHeight: "400px" }}
      >
        <ContextualLoader category={categoryName} size="medium" />
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-success">{getPageTitle().toUpperCase()}</h2>

      <p className="text-muted mb-4">
        {products.length} product{products.length !== 1 ? "s" : ""} found
      </p>

      <div className="row">
        {products.length > 0 ? (
          products.map((p) => (
            <div key={p._id} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100">
                <Link
                  to={`/products/${p._id}`}
                  className="text-decoration-none text-dark"
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={p.image}
                    className="card-img-top"
                    alt={p.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                </Link>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text text-muted">
                    {p.description || "No description available"}
                  </p>
                  <div className="mt-auto">
                    <p className="card-text">
                      <strong className="text-success">ETB {p.price}</strong>
                    </p>
                    <button
                      className="btn btn-success btn-sm w-100 mb-2"
                      onClick={() => {
                        dispatch({ type: "ADD_TO_CART", payload: p });
                        toast.success(`${p.name} added to cart`);
                      }}
                    >
                      Add to Cart
                    </button>
                    <Link
                      to={`/products/${p._id}`}
                      className="btn btn-primary btn-sm w-100"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <i className="fas fa-search fa-3x text-muted mb-3"></i>
            <h4 className="text-muted">No products found</h4>
            <p className="text-muted">
              Try a different category or check again later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;

