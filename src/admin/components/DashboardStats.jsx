import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "../../context/AuthContext";

const DashboardStats = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    lowStockProducts: 0,
    todayOrders: 0
  });
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();


  useEffect(() => {
    if (currentUser && currentUser.token) {
      fetchStats();
    }
  }, [currentUser]);

  const fetchStats = async () => {
    if (!currentUser || !currentUser.token) return;
    try {
      // Fetch products
      const productsRes = await axios.get('https://atomic-7jgw.onrender.com/api/products');
      const products = productsRes.data;
      
      // Fetch orders
      const ordersRes = await axios.get('https://atomic-7jgw.onrender.com/api/orders/all', {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      const orders = ordersRes.data;

      // Calculate stats
      const totalProducts = products.length;
      const totalOrders = orders.length;
      const totalRevenue = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
      const pendingOrders = orders.filter(order => !order.isSeenByAdmin).length;
      const lowStockProducts = products.filter(product => product.countInStock < 10).length;
      
      // Today's orders
      const today = new Date().toDateString();
      const todayOrders = orders.filter(order => 
        new Date(order.createdAt).toDateString() === today
      ).length;

      setStats({
        totalProducts,
        totalOrders,
        totalRevenue,
        pendingOrders,
        lowStockProducts,
        todayOrders
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="row g-4 mb-4">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="col-md-4 col-lg-2">
            <div className="card">
              <div className="card-body text-center">
                <div className="spinner-border text-success" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: "🛍️",
      color: "primary",
      bgColor: "#e3f2fd"
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: "📦",
      color: "info",
      bgColor: "#e0f2f1"
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: "💰",
      color: "success",
      bgColor: "#e8f5e8"
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      icon: "⏳",
      color: "warning",
      bgColor: "#fff3cd"
    },
    {
      title: "Low Stock Items",
      value: stats.lowStockProducts,
      icon: "⚠️",
      color: "danger",
      bgColor: "#f8d7da"
    },
    {
      title: "Today's Orders",
      value: stats.todayOrders,
      icon: "📅",
      color: "secondary",
      bgColor: "#f8f9fa"
    }
  ];

  return (
    <div className="row g-4 mb-4">
      {statCards.map((stat, index) => (
        <div key={index} className="col-md-4 col-lg-2">
          <div 
            className="card h-100 border-0 shadow-sm"
            style={{ backgroundColor: stat.bgColor }}
          >
            <div className="card-body text-center">
              <div className="mb-2" style={{ fontSize: '2rem' }}>
                {stat.icon}
              </div>
              <h4 className={`text-${stat.color} mb-1`}>
                {stat.value}
              </h4>
              <small className="text-muted">
                {stat.title}
              </small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
