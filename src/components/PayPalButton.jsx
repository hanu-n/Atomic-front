import { PayPalButtons } from '@paypal/react-paypal-js';
import { useCart } from '../context/CartContext';

const PayPalButton = ({ shippingInfo }) => {
  const { cartItems = [] } = useCart();

  const orderTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <PayPalButtons
      style={{ layout: 'vertical', color: 'blue', shape: 'rect' }}
      createOrder={async () => {
        try {
          const res = await fetch('https://atomic-7jgw.onrender.com/api/payments/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ total: orderTotal }),
          });
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          const data = await res.json();
          if (!data.id) {
            throw new Error('Order ID missing from backend');
          }
          console.log('Order ID:', data.id);
          return data.id;
        } catch (err) {
          console.error('Create order failed:', err);
          throw err;
        }
      }}
      onApprove={async (data) => {
        try {
          const res = await fetch('https://atomic-7jgw.onrender.com/api/payments/capture-order', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}` // If protect middleware needs token
            },
            body: JSON.stringify({
              orderID: data.orderID,
              orderItems: cartItems,
              shippingAddress: shippingInfo,
              totalPrice: orderTotal,
            }),
          });
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          const result = await res.json();
          console.log('Payment captured:', result);
          alert('Payment successful! Your order has been saved.');
        } catch (err) {
          console.error('Capture order failed:', err);
          alert('Payment error: ' + err.message);
        }
      }}
      onError={(err) => {
        console.error('PayPal Error:', err);
        alert('Payment error: ' + err.message);
      }}
    />
  );
};

export default PayPalButton;