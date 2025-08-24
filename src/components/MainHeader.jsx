// import { Link } from "react-router-dom";
// import logo from '../assets/logo.jpg'

// const MainHeader = () => {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "rgba(226, 227, 226, 1)" }}>
//       <div className="container d-flex align-items-center justify-content-between">
//         {/* Logo */}
//         <Link to="/" className="navbar-brand">
//           <img src={logo} alt="logo" width="100" height="60" id="logo"/>
//         </Link>

//         {/* Hamburger icon (for mobile) */}
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#mainNavbar"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* Main Nav Links */}
//         <div className="collapse navbar-collapse" id="mainNavbar">
//           <ul className="navbar-nav fw-bold ms-auto gap-3">

//             <li className="nav-item">
//               <Link to="/" className="nav-link active">Home</Link>
//             </li>

//             {/* Dropdown: School Lab Equipment */}
//             <li className="nav-item dropdown">
//               <Link
//                 to="#"
//                 className="nav-link dropdown-toggle"
//                 data-bs-toggle="dropdown"
//               >
//                 School Lab Equipment
//               </Link>
//               <ul className="dropdown-menu">
//     <Link className="dropdown-item" to={`/products?category=bio-models`}>Biology Models</Link>
//     <Link className="dropdown-item" to={`/products?category=lab-chemicals`}>Laboratory Chemicals</Link>
//     <Link className="dropdown-item" to={`/products?category=lab-equipments`}>Laboratory Equipment</Link>
//     <Link className="dropdown-item" to={`/products?category=analytical-apparatus`}>Analytical Apparatus</Link>

//               </ul>
//             </li>

//             {/* Other Dropdowns */}
//             <li className="nav-item dropdown">
//               <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
//                 General Lab Equipment
//               </Link>
//               <ul className="dropdown-menu">
//                     <Link className="dropdown-item" to={`/products?category=for-university`}>For University</Link>
//                     <Link className="dropdown-item" to={`/products?category=for-researches`}>For Researches</Link>
//                     <Link className="dropdown-item" to={`/products?category=for-manufacturing`}>For Manufacturing</Link>


//               </ul>
//             </li>

//             <li className="nav-item dropdown">
//               <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
//                 Chemicals
//               </Link>
//               <ul className="dropdown-menu">
//                 <Link className="dropdown-item" to={`/products?category=lab-chemicals`}>Lab Chemicals</Link>
//                 <Link className="dropdown-item" to={`/products?category=industrial-chemicals`}>Industrial Chemicals</Link>


//               </ul>
//             </li>

//             <li className="nav-item dropdown">
//               <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
//                 Agricultural Supplies
//               </Link>
//               <ul className="dropdown-menu">
//                     <Link className="dropdown-item" to={`/products?category=agricultural-chemicals`}>Agricultural Chemicals</Link>
//                     <Link className="dropdown-item" to={`/products?category=agricultural-medicines`}>Agricultural Medicines</Link>


//               </ul>
//             </li>

//             <li className="nav-item dropdown">
//               <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
//                 Medical Supplies
//               </Link>
//               <ul className="dropdown-menu">
//                     <Link className="dropdown-item" to={`/products?category=hospital-equipment`}>Hospital Equipment</Link>
//                     <Link className="dropdown-item" to={`/products?category=lab-kits`}>Lab Kits</Link>
//                     <Link className="dropdown-item" to={`/products?category=lab-chemicals`}>Laboratory Chemicals</Link>


//               </ul>
//             </li>

//             <li className="nav-item">
//               <Link to="/about" className="nav-link">About</Link>
//             </li>

//             <li className="nav-item">
//               <Link to="/contact" className="nav-link">Contact</Link>
//             </li>

//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default MainHeader;
// MainHeader.jsx
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const MainHeader = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/api/categories");
      setCategories(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <ul className="navbar-nav">
        {categories.map((cat) => (
          <li key={cat.slug} className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle"
              to="#"
              id={`${cat.slug}-dropdown`}
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {cat.name}
            </Link>
            <ul className="dropdown-menu" aria-labelledby={`${cat.slug}-dropdown`}>
              {/* All Option */}
              <li>
                <Link className="dropdown-item" to={`/category/${cat.slug}`}>
                  All
                </Link>
              </li>
              {/* Subcategories */}
              {cat.subCategories.map((sub) => (
                <li key={sub.slug}>
                  <Link
                    className="dropdown-item"
                    to={`/category/${cat.slug}/${sub.slug}`}
                  >
                    {sub.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MainHeader;
