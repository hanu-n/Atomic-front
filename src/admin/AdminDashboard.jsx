import React, { useState } from "react";
import AdminOrders from "./components/AdminOrders";
import EnhancedAdminOrders from "./components/EnhancedAdminOrders";
import DashboardStats from "./components/DashboardStats";
import UserManagement from "./components/UserManagement";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardStats />;
      case 'products':
        return navigate('/admin/pro-list');
      case 'orders':
        return <EnhancedAdminOrders />;
      case 'users':
        return <UserManagement />;
      default:
        return <DashboardStats />;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
          <div className="position-sticky pt-3">
            <div className="text-center mb-4">
              <h4 className="text-success">Atomic MAS</h4>
              <small className="text-muted">Admin Dashboard</small>
            </div>
            
            <ul className="nav flex-column">
              <li className="nav-item">
                <button
                  className={`nav-link btn btn-link text-start w-100 ${
                    activeTab === 'dashboard' ? 'active bg-success text-white' : 'text-dark'
                  }`}
                  onClick={() => setActiveTab('dashboard')}
                  style={{ border: 'none', textDecoration: 'none' }}
                >
                  📊 Dashboard
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link btn btn-link text-start w-100 ${
                    activeTab === 'products' ? 'active bg-success text-white' : 'text-dark'
                  }`}
                  onClick={() => setActiveTab('products')}
                  style={{ border: 'none', textDecoration: 'none' }}
                >
                  🛍️ Product Management
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link btn btn-link text-start w-100 ${
                    activeTab === 'orders' ? 'active bg-success text-white' : 'text-dark'
                  }`}
                  onClick={() => setActiveTab('orders')}
                  style={{ border: 'none', textDecoration: 'none' }}
                >
                  📦 Order Management
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link btn btn-link text-start w-100 ${
                    activeTab === 'users' ? 'active bg-success text-white' : 'text-dark'
                  }`}
                  onClick={() => setActiveTab('users')}
                  style={{ border: 'none', textDecoration: 'none' }}
                >
                  👥 User Management
                </button>
              </li>
              <li className="nav-item mt-3">
                <button
                  className="nav-link btn btn-link text-start w-100 text-dark"
                  onClick={() => navigate('/')}
                  style={{ border: 'none', textDecoration: 'none' }}
                >
                  🏠 Back to Site
                </button>
              </li>
            </ul>

            {/* Quick Stats */}
            <div className="mt-4">
              <h6 className="text-muted">Quick Stats</h6>
              <div className="small text-muted">
                <div>📊 Dashboard Overview</div>
                <div>📦 Enhanced Orders</div>
                <div>👥 User Management</div>
                <div>🛍️ Product Control</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-9 col-lg-10 ms-sm-auto px-md-4">
          <div className="pt-3 pb-2 mb-3">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
              <h1 className="h2 text-success">
                {activeTab === 'dashboard' && '📊 Dashboard Overview'}
                {activeTab === 'products' && '🛍️ Product Management'}
                {activeTab === 'orders' && '📦 Order Management'}
                {activeTab === 'users' && '👥 User Management'}
              </h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                {activeTab === 'products' && (
                  <div className="btn-group me-2">
                    <button type="button" className="btn btn-sm btn-outline-secondary">
                      📊 Export
                    </button>
                    <button type="button" className="btn btn-sm btn-outline-secondary">
                      📈 Analytics
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;