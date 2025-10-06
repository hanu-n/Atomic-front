import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ImageUploadHelper from './ImageUploadHelper';
import { auth } from '../../firebase';

const AddProductForm = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    countInStock: '',
    description: '',
    category: '',
    brand: '',
    origin: '',
    subcategory: '',
    subSubcategory: '',
    image: null,
    imageUrl: '',
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, image: file, imageUrl: '' })); // clear imageUrl if file selected
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => setImagePreview(e.target.result);
        reader.readAsDataURL(file);
      }
    } else if (e.target.name === 'imageUrl') {
      setFormData((prev) => ({ ...prev, imageUrl: e.target.value, image: null })); // clear file if url entered
      setImagePreview(e.target.value);
    } else {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      let headers;
      if (formData.imageUrl) {
        // Use image URL directly, do not send imageUrl to backend
        data = {
          name: formData.name,
          price: formData.price,
          countInStock: formData.countInStock,
          description: formData.description,
          category: formData.category,
          brand: formData.brand,
          origin: formData.origin,
          subcategory: formData.subcategory,
          subSubcategory: formData.subSubcategory,
          image: formData.imageUrl,
        };
        headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`,
        };
      } else if (formData.image) {
        // Use file upload
        data = new FormData();
        data.append('name', formData.name);
        data.append('price', formData.price);
        data.append('countInStock', formData.countInStock);
        data.append('description', formData.description);
        data.append('category', formData.category);
        data.append('brand', formData.brand);
        data.append('origin', formData.origin);
        data.append('subcategory', formData.subcategory);
        data.append('subSubcategory', formData.subSubcategory);
        data.append('image', formData.image);
        headers = {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`,
        };
      } else {
        toast.error('Please provide an image file or image URL.');
        return;
      }

      const res = await axios.post('http://localhost:5000/api/products', data, { headers });

      toast.success('Product added successfully');
      onProductAdded(res.data.product);
      setFormData({
        name: '',
        price: '',
        countInStock: '',
        description: '',
        category: '',
        brand: '',
        origin: '',
        subcategory: '',
        subSubcategory: '',
        image: null,
        imageUrl: '',
      });
      setImagePreview(null);
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to add product';
      toast.error(errorMsg);
      console.error('Failed to add product:', error.response?.data || error);
    }
  };

  return (
    <div className="container-fluid">
      <ImageUploadHelper />
      <div className="card shadow-sm border-0 mb-5" style={{ maxWidth: '600px' }}>
        <div className="card-body">
          <h4 className="card-title text-success mb-4">🛍️ Add New Product</h4>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row">
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="productName"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Product Name"
                    required
                  />
                  <label htmlFor="productName">Product Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    id="productPrice"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price"
                    required
                  />
                  <label htmlFor="productPrice">Price ($)</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id="productStock"
                    name="countInStock"
                    value={formData.countInStock}
                    onChange={handleChange}
                    placeholder="Stock"
                    required
                  />
                  <label htmlFor="productStock">Stock Quantity</label>
                </div>
                <div className="form-floating mb-3">
                  <select
                    className="form-select"
                    id="productCategory"
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
                  <label htmlFor="productCategory">Category</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="productBrand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="Brand"
                  />
                  <label htmlFor="productBrand">Brand</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="productOrigin"
                    name="origin"
                    value={formData.origin}
                    onChange={handleChange}
                    placeholder="Origin"
                  />
                  <label htmlFor="productOrigin">Origin/Country</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="productSubcategory"
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={handleChange}
                    placeholder="Subcategory"
                  />
                  <label htmlFor="productSubcategory">Subcategory (optional)</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="productSubSubcategory"
                    name="subSubcategory"
                    value={formData.subSubcategory}
                    onChange={handleChange}
                    placeholder="Sub-subcategory"
                  />
                  <label htmlFor="productSubSubcategory">Sub-subcategory (optional)</label>
                </div>
                <div className="mb-3">
                  <label htmlFor="productImage" className="form-label">Product Image (File or URL)</label>
                  <input
                    type="file"
                    className="form-control mb-2"
                    id="productImage"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    disabled={!!formData.imageUrl}
                  />
                  <input
                    type="url"
                    className="form-control"
                    id="productImageUrl"
                    name="imageUrl"
                    placeholder="Paste image URL here..."
                    value={formData.imageUrl}
                    onChange={handleChange}
                    disabled={!!formData.image}
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="img-thumbnail"
                        style={{ maxWidth: '100px', maxHeight: '100px' }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="form-floating mb-4">
              <textarea
                className="form-control"
                id="productDescription"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Product Description"
                style={{ height: '100px' }}
              />
              <label htmlFor="productDescription">Product Description</label>
            </div>
            <button type="submit" className="btn btn-success w-100 btn-lg">
              ➕ Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;