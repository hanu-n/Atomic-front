import  { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext";
import { toast } from 'react-toastify';

const EnhancedAdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); 
  const [searchTerm, setSearchTerm] = useState('');
  const { currentUser } = useAuth();

  const orderStatuses = [
    { value: 'pending', label: 'Pending', color: 'warning' },
    { value: 'processing', label: 'Processing', color: 'info' },
    { value: 'shipped', label: 'Shipped', color: 'primary' },
    { value: 'delivered', label: 'Delivered', color: 'success' },
    { value: 'cancelled', label: 'Cancelled', color: 'danger' }
  ];

  const fetchOrders = async () => {
    if (!currentUser || !currentUser.token) return;
    try {
      const { data } = await axios.get('/api/orders/all', {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error); 
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`/api/orders/${orderId}/status`, 
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      
      setOrders(prev => prev.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
      
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error('Failed to update order status:', error);
      toast.error('Failed to update order status');
    }
  };

  const markAsSeen = async (id) => {
    try {
      await axios.put(`/api/orders/${id}/seen`, {}, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      setOrders(prev => prev.map(order => 
        order._id === id ? { ...order, isSeenByAdmin: true } : order
      ));
      toast.success('Order marked as seen');
    } catch (error) {
      console.error('Failed to update:', error);
      toast.error('Failed to mark as seen');
    }
  };

  useEffect(() => {
    if (currentUser && currentUser.token) {
      fetchOrders();
    }
  }, [currentUser]);

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'all' || order.status === filter;
    const matchesSearch = order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order._id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    const statusObj = orderStatuses.find(s => s.value === status);
    return statusObj ? statusObj.color : 'secondary';
  };

  const getStatusLabel = (status) => {
    const statusObj = orderStatuses.find(s => s.value === status);
    return statusObj ? statusObj.label : status;
  };

  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">🔍</span>
            <input
              type="text"
              className="form-control"
              placeholder="Search orders by email or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Orders</option>
            {orderStatuses.map(status => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <button 
            className="btn btn-outline-success w-100"
            onClick={fetchOrders}
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="alert alert-info">
          No orders found matching your criteria.
        </div>
      ) : (
        <div className="row g-4">
          {filteredOrders.map((order) => (
            <div key={order._id} className="col-lg-6">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-header bg-light d-flex justify-content-between align-items-center">
                  <div>
                    <strong>Order #{order._id.slice(-8)}</strong>
                    <br />
                    <small className="text-muted">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                  <div className="text-end">
                    <span className={`badge bg-${getStatusColor(order.status || 'pending')}`}>
                      {getStatusLabel(order.status || 'pending')}
                    </span>
                    {!order.isSeenByAdmin && (
                      <span className="badge bg-danger ms-1">New</span>
                    )}
                  </div>
                </div>
                
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col-6">
                      <strong>Customer:</strong><br />
                      <span>{order.user?.email || 'Unknown'}</span>
                    </div>
                    <div className="col-6">
                      <strong>Total:</strong><br />
                      <span className="text-success fw-bold">${order.totalPrice}</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <strong>Items:</strong>
                    <ul className="list-unstyled mt-1">
                      {order.orderItems?.map((item, idx) => (
                        <li key={idx} className="small">
                          {item.qty} × {item.name} - ${item.price}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {order.shippingAddress && (
                    <div className="mb-3">
                      <strong>Shipping Address:</strong><br />
                      <small className="text-muted">
                        {order.shippingAddress.address}, {order.shippingAddress.city}
                      </small>
                    </div>
                  )}
                </div>

                <div className="card-footer bg-light">
                  <div className="row g-2">
                    <div className="col-6">
                      <select
                        className="form-select form-select-sm"
                        value={order.status || 'pending'}
                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                      >
                        {orderStatuses.map(status => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-6">
                      {!order.isSeenByAdmin ? (
                        <button
                          className="btn btn-success btn-sm w-100"
                          onClick={() => markAsSeen(order._id)}
                        >
                          Mark as Seen
                        </button>
                      ) : (
                        <span className="badge bg-success w-100 py-2">Seen ✅</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnhancedAdminOrders;
