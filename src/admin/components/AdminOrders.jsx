import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext"

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/orders/all', {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsSeen = async (id) => {
    try {
      await axios.put(`/api/orders/${id}/seen`, {}, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      fetchOrders(); // refresh after update
    } catch (error) {
      console.error('Failed to update:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="admin-orders-wrapper" style={{ backgroundColor: '#e6ffe6', minHeight: '100vh', padding: '2rem' }}>
      <h2 style={{ color: '#008000', marginBottom: '2rem', fontWeight: 'bold' }}>🧾 Admin Order Dashboard</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <div
              key={order._id}
              style={{
                border: '1px solid #4CAF50',
                borderRadius: '8px',
                marginBottom: '1.5rem',
                padding: '1rem',
                backgroundColor: '#f6fff6',
                boxShadow: '0 0 5px rgba(0,128,0,0.2)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <strong>User:</strong>
                <span>{order.user?.email || 'Unknown'}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>Total Price:</strong>
                <span>${order.totalPrice}</span>
              </div>

              <div style={{ marginTop: '0.5rem' }}>
                <strong>Items:</strong>
                <ul>
                  {order.orderItems.map((item, idx) => (
                    <li key={idx}>{item.qty} × {item.name}</li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>Status:</strong> {order.isSeenByAdmin ? (
                    <span style={{ color: 'green', fontWeight: 'bold' }}>Seen ✅</span>
                  ) : (
                    <span style={{ color: 'red', fontWeight: 'bold' }}>Not Seen ❌</span>
                  )}
                </div>

                {!order.isSeenByAdmin && (
                  <button
                    onClick={() => markAsSeen(order._id)}
                    style={{
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      padding: '8px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Mark as Seen
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
