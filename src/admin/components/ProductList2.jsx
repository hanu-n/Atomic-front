import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AddProductForm from "./AddProductForm";
import EditProductModal from "./EditProductModal";
import { useLocation } from "react-router-dom";
import { auth } from "../../firebase";



const ProductList2 = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

   const query = useQuery();
  const urlSearchTerm = query.get("search") || "";

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
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const token = await auth.currentUser?.getIdToken();
        if (!token) {
          toast.error('No token found, please login again.');
          return;
        }

        await axios.delete(`/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts((prev) => prev.filter((product) => product._id !== id));
        toast.success(`Product deleted successfully`);
      } catch (error) {
        console.error("Failed to delete product", error);
        toast.error("Failed to delete product. Try again!");
      }
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts((prev) => 
      prev.map((product) => 
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
    setEditingProduct(null);
  };

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  // Separate in-stock and out-of-stock products
const inStockProducts = filteredProducts.filter((p) => p.countInStock > 0);
const outOfStockProducts = filteredProducts.filter((p) => p.countInStock === 0);

return (
  <div className="container-fluid">
    {/* Add Product Form */}
    <div className="mb-4">
      <AddProductForm onProductAdded={() => fetchProducts()} />
    </div>

    {/* Search and Filter Controls */}
    <div className="row mb-4">
      <div className="col-md-6">
        <div className="input-group">
          <span className="input-group-text">🔍</span>
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="col-md-4">
        <select
          className="form-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="school-equipment">School Equipment</option>
          <option value="university-equipment">University Equipment</option>
          <option value="manufacturing-equipment">Manufacturing Equipment</option>
          <option value="agricultural-supplies">Agricultural Supplies</option>
          <option value="medical-equipment">Medical Equipment</option>
        </select>
      </div>
      <div className="col-md-2">
        <div className="text-muted small">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>
    </div>

    {/* In-stock Products */}
    <h3 className="mb-4" style={{ color: "#2E8B57" }}>
      📦 In Stock Products ({inStockProducts.length})
    </h3>
    {loading ? (
      <div className="text-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    ) : inStockProducts.length === 0 ? (
      <div className="alert alert-info">
        {searchTerm || selectedCategory ? "No products match your search criteria." : "No products available."}
      </div>
    ) : (
      <div className="row g-4">
        {inStockProducts.map((p) => (
          <div key={p._id} className="col-lg-4 col-md-6">
            <div className="card shadow-sm border-0 h-100">
              <img
                src={p.image}
                alt={p.name}
                className="card-img-top"
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <div>
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text text-muted small mb-2">
                    {p.description?.substring(0, 100)}...
                  </p>
                  <div className="row text-center">
                    <div className="col-4">
                      <small className="text-muted">Stock</small>
                      <div className="fw-bold text-success">{p.countInStock}</div>
                    </div>
                    <div className="col-4">
                      <small className="text-muted">Price</small>
                      <div className="fw-bold">{p.price}-etb</div>
                    </div>
                    <div className="col-4">
                      <small className="text-muted">Category</small>
                      <div className="fw-bold text-primary">{p.category}</div>
                    </div>
                  </div>
                </div>
                <div className="mt-auto pt-3">
                  <div className="btn-group w-100" role="group">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => handleEditProduct(p)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => deleteProduct(p._id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Out-of-stock Products */}
    {outOfStockProducts.length > 0 && (
      <>
        <hr className="my-5" />
        <h3 className="mb-4" style={{ color: "#FF6B6B" }}>
          ⚠️ Out of Stock Products ({outOfStockProducts.length})
        </h3>
        <div className="row g-4">
          {outOfStockProducts.map((p) => (
            <div key={p._id} className="col-lg-4 col-md-6">
              <div className="card shadow-sm border-0 h-100 border-danger">
                <img
                  src={p.image}
                  alt={p.name}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover", opacity: 0.7 }}
                />
                <div className="card-body d-flex flex-column">
                  <div>
                    <h5 className="card-title text-muted">{p.name}</h5>
                    <div className="row text-center">
                      <div className="col-6">
                        <small className="text-muted">Stock</small>
                        <div className="fw-bold text-danger">{p.countInStock}</div>
                      </div>
                      <div className="col-6">
                        <small className="text-muted">Price</small>
                        <div className="fw-bold">{p.price}-etb</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto pt-3">
                    <div className="btn-group w-100" role="group">
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => handleEditProduct(p)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteProduct(p._id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    )}

    {/* Edit Product Modal */}
    {editingProduct && (
      <EditProductModal
        product={editingProduct}
        onUpdate={handleUpdateProduct}
        onClose={() => setEditingProduct(null)}
      />
    )}
  </div>
);


};

export default ProductList2;
