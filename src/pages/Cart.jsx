import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Cart = () => {
  const { cartItems, dispatch } = useCart();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container py-5">
      
      <h2 className="mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="">Your cart is empty.</p>
        
      ) : (
        <>
          <div className="row g-4">
            {cartItems.map((item) => (
              <div className="col-md-4" key={item._id}>
                <div className="card h-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <h5 className="card-title">{item.name}</h5>
                    
                    <div className="card-text mb-2">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() =>
                            dispatch({ type: "DECREMENT_QUANTITY", payload: item._id })
                          }
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() =>
                            dispatch({ type: "INCREMENT_QUANTITY", payload: item._id })
                          }
                        >
                          +
                        </button>
                      </div>
                      <p>
                        Price: etb-{item.price} <br />
                        Subtotal: etb-{item.price * item.quantity}
                      </p>
                    </div>

                    <button
                      className="btn btn-danger mt-auto"
                      onClick={() => handleRemove(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
             
            ))}
          </div>
                 <button
                   onClick={() => {
                     if (!currentUser) {
                       navigate('/auth', { state: { from: { pathname: '/checkout' } } });
                     } else {
                       navigate('/checkout');
                     }
                   }}
                   className="ms-3 fw-bolder w-75 text-align-center text-white btn btn-success"
                 >
                   Proceed to checkout
                 </button>

          <div className="mt-4">
            <h4>Total: etb-{total.toFixed(2)}</h4>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
