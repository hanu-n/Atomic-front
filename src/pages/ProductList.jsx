import { useEffect,useState } from 'react'
import axios from 'axios'
import ProductCard from '../components/ProductCard'
import { useLocation } from 'react-router-dom';
import ContextualLoader from '../components/loader/ContextualLoader';


const ProductList = () => {
    const [products,setProducts]=useState([])
    const [loading, setLoading] = useState(true);
     const location = useLocation();
   

     const query = new URLSearchParams(location.search);
  const category = query.get('category');

     useEffect(() => {
    setLoading(true);
    let url = 'https://atomic-7jgw.onrender.com/api/products';
    if (category) {
      url += `?category=${category}`;
    }
    axios.get(url)
      .then((res) => {
        setProducts(Array.isArray(res.data) ? res.data : res.data.data || []);
      })
      .catch((err) => {
        console.error("❌ Error fetching products:", err);
        setProducts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [category]);



  if (loading) {
    return (
      <section className="product-section py-5" id="pro">
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
          <ContextualLoader category={category || "general"} size="medium" />
        </div>
      </section>
    );
  }

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