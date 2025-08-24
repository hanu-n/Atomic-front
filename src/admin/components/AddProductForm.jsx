import React, { useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify'



const AddProductForm = ({onProductAdded }) => {
      const [formData, setFormData] = useState({ name: "", price: "", stock: "",image:null });

      const handleChange=(e)=>{
        if (e.target.name===image) {
          setFormData((prev)=>({...prev,image:e.target.file[0]}))
        }else{
        setFormData((prev)=>({...prev,[e.target.name]:e.target.value}))}
      }

      const handleSubmit=async(e)=>{
              e.preventDefault()
              try {

                    const data = new FormData();
                    data.append("name", form.name);
                    data.append("price", form.price);
                    data.append("stock", form.stock);
                    data.append("image", form.image);

                const res = await axios.post("/api/products", data, {
                          headers: {
                          "Content-Type": "multipart/form-data", }, });
                            toast.success('product added successfully')
                onProductAdded(res.data)
                setFormData({name:'',price:'',stock:'',image:null})
          

              } catch (error) { 
                toast.error('failed to add product')
                      console.error("Failed to add product", err);

              }  
      }

 return (
  <div className="card shadow-sm border-0 mb-5" style={{ maxWidth: "500px" }}>
    <div className="card-body">
      <h4 className="card-title text-success mb-4">Add New Product</h4>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Product Name */}
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

        {/* Price */}
        <div className="form-floating mb-3">
          <input
            type="number"
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

        {/* Stock */}
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            id="productStock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Stock"
            required
          />
          <label htmlFor="productStock">Stock</label>
        </div>

        {/* Image */}
        <div className="mb-4">
          <input
            type="file"
            className="form-control"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-success w-100">
          Add Product
        </button>
      </form>
    </div>
  </div>
);

}

export default AddProductForm
