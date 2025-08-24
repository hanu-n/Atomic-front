import {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'


const ProductDetail = () => {
 
   const [product,setProduct]=useState(null)
   const {id}=useParams()

  // const handleAddToCart =()=>{
  //       dispatch({type:"ADD_TO_CART",payload:product})
  //  }

  useEffect(()=>{
    axios(`http://localhost:5000/api/products/${id}`)
     .then((res) => {
      console.log("Fetched product:", res.data);
      setProduct(res.data);
    })
      .catch((err) => console.error("❌ Product not found", err));
  },[id])

    if (!product) return <h4 className="text-center py-5">Loading...</h4>;

 return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6">
          <img src={product.image} alt={product.name} className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h2 className="text-success fw-bold">{product.name}</h2>
          <p><strong>Origin:</strong> {product.origin}</p>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Package:</strong> {product.package}</p>
          <p><strong>Quantity:</strong> {product.quantity}</p>
          <p><strong>Price:</strong> {product.price}</p>

          {product.readMoreLink && (
            <a href={product.readMoreLink} target="_blank" rel="noreferrer">
              <button className="btn btn-success btn-sm me-2">Read More</button>
            </a>
          )}

          <button onClick={handleAddToCart} className="btn btn-primary btn-sm">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail