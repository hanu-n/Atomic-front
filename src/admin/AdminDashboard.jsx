import React, { useState } from "react";
import AdminOrders from "./components/AdminOrders";
import { useNavigate } from "react-router-dom";


const AdminDashboard = () => {
    const [activeTab,setActiveTab]=useState('products')
    const Navigate=useNavigate()
 
 return (
    <div style={{ width: "750px",height:'300px', backgroundColor: "#f0f0f0", padding: "20px", marginLeft:'200px'  }}>
      <h3>Admin Panel</h3>
      <ul style={{ listStyle: "none", padding: 0  }}>
        <li
          onClick={() => setActiveTab("products")}
          style={{ marginBottom: "10px", cursor: "pointer", fontWeight: activeTab === "products" ? "bold" : "normal" }}
        >
          🛒 Products
        </li>
        <li
          onClick={() => {setActiveTab("orders"),Navigate(AdminOrders)}}
          style={{ cursor: "pointer", fontWeight: activeTab === "orders" ? "bold" : "normal" }}
        >
          📦 Orders
        </li>
      </ul>
    </div>
  );

}

export default AdminDashboard