import { useEffect,useState } from 'react'
import axios from 'axios'
import ProductCard from '../components/ProductCard'
import { useLocation } from 'react-router-dom';


const ProductList = () => {
    const [products,setProducts]=useState([])
     const location = useLocation();
   

     const query = new URLSearchParams(location.search);
  const category = query.get('category');

     useEffect(() => {
    let url = 'http://localhost:5000/api/products';
    if (category) {
      url += `?category=${category}`;
    }
    axios.get(url)
      .then((res) => setProducts(Array.isArray(res.data) ? res.data : res.data.data || []))
      .catch((err) => console.error("❌ Error fetching products:", err));
  }, [category]);



  return (
    <section className="product-section py-5" id="pro">
      <div className="container">
        <div className="row justify-content-center g-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductList