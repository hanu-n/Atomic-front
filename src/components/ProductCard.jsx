import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import {toast} from 'react-toastify'

const ProductCard = ({ product }) => {
const { dispatch } = useCart();
  const handleAddToCart = (e) => {
    e.preventDefault(); 
    dispatch({ type: 'ADD_TO_CART', payload: product });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="col-md-4">
      <div className="card h-100">
        <Link to={`/products/${product._id}`} className="text-decoration-none text-dark">
          <img
            src={product.image}
            alt={product.name}
            className="card-img-top"
            style={{ height: "200px", objectFit: "cover" }}
          />
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">${product.price}</p>
          </div>
        </Link>
        <div className="card-footer bg-transparent border-top-0">
          <button
            className="btn btn-sm btn-success w-100"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
