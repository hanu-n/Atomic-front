// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const CategoryPage = () => {
//   const { categoryName } = useParams();
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const { data } = await axios.get(`/api/products?category=${categoryName}`);
//         setProducts(data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchProducts();
//   }, [categoryName]);

//   return (
//     <div className="container py-4">
//       <h2 className="mb-4 text-success">
//         {categoryName.replace("-", " ").toUpperCase()}
//       </h2>
//       <div className="row">
//         {products.length > 0 ? (
//           products.map((p) => (
//             <div key={p._id} className="col-md-4 mb-4">
//               <div className="card shadow-sm">
//                 <img src={p.image} className="card-img-top" alt={p.name} />
//                 <div className="card-body">
//                   <h5>{p.name}</h5>
//                   <p>${p.price}</p>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No products found in this category.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CategoryPage;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CategoryPage = () => {
  const { categoryName, subCategoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `/api/products?category=${categoryName}`;
        if (subCategoryName) {
          url += `&subCategory=${subCategoryName}`;
        }
        const { data } = await axios.get(url);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [categoryName, subCategoryName]);

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-success">
        {subCategoryName
          ? `${subCategoryName.replace("-", " ")} (${categoryName})`
          : categoryName.replace("-", " ")}
      </h2>
      <div className="row">
        {products.length > 0 ? (
          products.map((p) => (
            <div key={p._id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <img src={p.image} className="card-img-top" alt={p.name} />
                <div className="card-body">
                  <h5>{p.name}</h5>
                  <p>${p.price}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
