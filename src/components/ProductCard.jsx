import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const { dispatch } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // prevent card click
    e.preventDefault();
    dispatch({ type: "ADD_TO_CART", payload: product });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="col-md-4 mt-0">
      <Link
        to={`/products/${product._id}`}
        className="text-decoration-none text-dark"
      >
        <div className="card h-100 shadow-sm cursor-pointer">
          <img
            src={
              product.image && (product.image.startsWith('http://') || product.image.startsWith('https://'))
                ? product.image
                : product.image
                  ? `http://localhost:5000${product.image}`
                  : '/placeholder.png'
            }
            alt={product.name}
            className="card-img-top"
            style={{ height: "350px", objectFit: "cover" }}
            onError={e => {
              console.error('Image failed to load:', e.target.src);
              e.target.src = '/placeholder.png';
            }}
          />
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text text-success fw-bold">{product.price}-etb</p>
          </div>
          <div className="card-footer bg-transparent border-top-0">
            <button
              className="btn btn-sm btn-success w-100"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
