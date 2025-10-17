import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { auth } from "../../firebase";

const EditProductModal = ({ product, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    countInStock: "",
    description: "",
    category: "",
    brand: "",
    origin: "",
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price || "",
        countInStock: product.countInStock || "",
        description: product.description || "",
        category: product.category || "",
        brand: product.brand || "",
        origin: product.origin || "",
        image: null
      });
      setImagePreview(product.image);
    }
  }, [product]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => setImagePreview(e.target.result);
        reader.readAsDataURL(file);
      }
    } else {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("countInStock", formData.countInStock);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("brand", formData.brand);
      data.append("origin", formData.origin);
      
      // Only append image if a new one was selected
      if (formData.image) {
        data.append("image", formData.image);
      }
          const token = await auth.currentUser.getIdToken();
      const res = await axios.put(`https://atomic-7jgw.onrender.com/api/products/${product._id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
             Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Product updated successfully");
      onUpdate(res.data);
      onClose();
    } catch (error) {
      toast.error("Failed to update product");
      console.error("Failed to update product", error);
    } finally {
      setLoading(false);
    }
  };

  if (!product) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">✏️ Edit Product</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              disabled={loading}
            ></button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row">
                {/* Left Column */}
                <div className="col-md-6">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="editName"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Product Name"
                      required
                    />
                    <label htmlFor="editName">Product Name</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      id="editPrice"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="Price"
                      required
                    />
                    <label htmlFor="editPrice">Price ($)</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="editStock"
                      name="countInStock"
                      value={formData.countInStock}
                      onChange={handleChange}
                      placeholder="Stock Quantity"
                      required
                    />
                    <label htmlFor="editStock">Stock Quantity</label>
                  </div>

                  <div className="form-floating mb-3">
                    <select
                      className="form-select"
                      id="editCategory"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="school-equipment">School Equipment</option>
                      <option value="university-equipment">University Equipment</option>
                      <option value="manufacturing-equipment">Manufacturing Equipment</option>
                      <option value="agricultural-supplies">Agricultural Supplies</option>
                      <option value="medical-equipment">Medical Equipment</option>
                    </select>
                    <label htmlFor="editCategory">Category</label>
                  </div>
                </div>

                {/* Right Column */}
                <div className="col-md-6">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="editBrand"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      placeholder="Brand"
                    />
                    <label htmlFor="editBrand">Brand</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="editOrigin"
                      name="origin"
                      value={formData.origin}
                      onChange={handleChange}
                      placeholder="Origin"
                    />
                    <label htmlFor="editOrigin">Origin/Country</label>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="editImage" className="form-label">Product Image</label>
                    <input
                      type="file"
                      className="form-control"
                      id="editImage"
                      name="image"
                      accept="image/*"
                      onChange={handleChange}
                    />
                    {imagePreview && (
                      <div className="mt-2">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="img-thumbnail"
                          style={{ maxWidth: "150px", maxHeight: "150px" }}
                        />
                        <small className="text-muted d-block mt-1">
                          {formData.image ? "New image selected" : "Current image"}
                        </small>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  id="editDescription"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Product Description"
                  style={{ height: "100px" }}
                />
                <label htmlFor="editDescription">Product Description</label>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Updating...
                  </>
                ) : (
                  "💾 Update Product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;












