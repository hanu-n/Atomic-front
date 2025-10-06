import React, { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import axios from "axios";
import ContextualLoader from "../components/loader/ContextualLoader";


const CategoryPage = () => {
  const { categoryName, subCategoryName, subSubCategoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryInfo, setCategoryInfo] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let url = `/api/products?category=${categoryName}`;
        
        if (subCategoryName && subCategoryName !== "all") {
          url += `&subCategory=${subCategoryName}`;
        }
        
        if (subSubCategoryName && subSubCategoryName !== "all") {
          url += `&subSubCategory=${subSubCategoryName}`;
        }
        
        console.log("Fetching products from:", url);
        const { data } = await axios.get(url);
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategoryInfo = async () => {
      try {
        const { data } = await axios.get(`/api/categories/${categoryName}`);
        setCategoryInfo(data);
      } catch (error) {
        console.error("Error fetching category info:", error);
      }
    };

    if (categoryName) {
      fetchProducts();
      fetchCategoryInfo();
    }
  }, [categoryName, subCategoryName, subSubCategoryName]);

  const getPageTitle = () => {
    if (subSubCategoryName) {
      return `${subSubCategoryName.replace(/-/g, " ")} (${subCategoryName.replace(/-/g, " ")})`;
    } else if (subCategoryName) {
      return `${subCategoryName.replace(/-/g, " ")} (${categoryName.replace(/-/g, " ")})`;
    } else {
      return categoryName.replace(/-/g, " ");
    }
  };

  const getBreadcrumb = () => {
    const breadcrumbs = [
      { name: "Home", path: "/" },
      { name: categoryInfo?.name || categoryName.replace(/-/g, " "),
        //  path: `/category/${categoryName}`
        path: `/products/category/${categoryName}`
 }
    ];

    if (subCategoryName && subCategoryName !== "all") {
      const subCategory = categoryInfo?.subCategories?.find(sub => sub.slug === subCategoryName);
      breadcrumbs.push({
        name: subCategory?.name || subCategoryName.replace(/-/g, " "),
        // path: `/category/${categoryName}/${subCategoryName}`
        path: `/products/category/${categoryName}/${subCategoryName}`

      });
    }

    if (subSubCategoryName && subSubCategoryName !== "all") {
      breadcrumbs.push({
        name: subSubCategoryName.replace(/-/g, " "),
        path: `/products/category/${categoryName}/${subCategoryName}/${subSubCategoryName}`

        // path: `/category/${categoryName}/${subCategoryName}/${subSubCategoryName}`
      });
    }

    return breadcrumbs;
  };

  if (loading) {
    return (
      <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <ContextualLoader category={categoryName} size="medium" />
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          {getBreadcrumb().map((breadcrumb, index) => (
            <li key={index} className={`breadcrumb-item ${index === getBreadcrumb().length - 1 ? 'active' : ''}`}>
              {index === getBreadcrumb().length - 1 ? (
                breadcrumb.name
              ) : (
                <a href={breadcrumb.path} className="text-decoration-none">
                  {breadcrumb.name}
                </a>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Page Title */}
      <h2 className="mb-4 text-success">
        {getPageTitle().toUpperCase()}
      </h2>

      {/* Products Count */}
      <p className="text-muted mb-4">
        {products.length} product{products.length !== 1 ? 's' : ''} found
      </p>

      {/* Products Grid */}
      <div className="row">
        {products.length > 0 ? (
          products.map((p) => (
            <div key={p._id} className="col-md-4 mb-4">
               <Link 
    to={`/products/${p._id}`} 
    className="text-decoration-none text-dark"
    style={{ cursor: "pointer" }}
  >
              <div className="card shadow-sm h-100">
                <img 
                  src={p.image} 
                  className="card-img-top" 
                  alt={p.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text text-muted">
                    {p.description || "No description available"}
                  </p>
                  <div className="mt-auto">
                    <p className="card-text">
                      <strong className="text-success">etb-{p.price}</strong>
                    </p>
                    <button className="btn btn-primary btn-sm w-100">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <div className="py-5">
              <i className="fas fa-search fa-3x text-muted mb-3"></i>
              <h4 className="text-muted">No products found</h4>
              <p className="text-muted">
                No products found in this category. Please try a different selection.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
