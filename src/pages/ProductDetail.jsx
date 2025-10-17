import {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useCart } from '../context/CartContext'
import { toast } from 'react-toastify'
import ContextualLoader from '../components/loader/ContextualLoader'

const ProductDetail = () => {
 
   const [product,setProduct]=useState(null)
   const [loading, setLoading] = useState(true)
   const {id}=useParams()
   const { dispatch } = useCart()

  const handleAddToCart = () => {
    if (product) {
      dispatch({ type: "ADD_TO_CART", payload: product })
      toast.success(`${product.name} added to cart!`)
    }
  }

  useEffect(()=>{
    setLoading(true);
    axios(`https://atomic-7jgw.onrender.com/api/products/${id}`)
     .then((res) => {
      console.log("Fetched product:", res.data);
      setProduct(res.data);
    })
      .catch((err) => {
        console.error("❌ Product not found", err);
        setProduct(null);
      })
      .finally(() => {
        setLoading(false);
      });
  },[id])

    if (loading) {
      return (
        <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
          <ContextualLoader category={product?.category || "general"} size="medium" />
        </div>
      );
    }

    if (!product) {
      return (
        <div className="container py-5 text-center">
          <h4 className="text-danger">Product not found</h4>
          <p className="text-muted">The product you're looking for doesn't exist.</p>
        </div>
      );
    }

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
          <p><strong>Price:</strong>{product.price}</p>

          {product.readMoreLink && (
            <a href={product.readMoreLink} target="_blank" rel="noopener noreferrer">
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