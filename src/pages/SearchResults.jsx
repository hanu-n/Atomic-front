import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SearchResults = () => {
  const { keyword } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const { data } = await axios.get(`/api/products/search?keyword=${keyword}`);
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Search error:", error);
        setProducts([]);
      }
    };

    fetchSearchResults();
  }, [keyword]);

  const getHighlightedText = (text, highlight) => {
    if (!highlight) return text;
    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? <span key={i} className="bg-warning">{part}</span> : part
    );
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-success">Search Results for "{keyword}"</h2>

      {products.length > 0 ? (
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-4 mb-4">
              <Link to={`/products/${product._id}`} className="text-decoration-none text-dark">
                <div className="card h-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{getHighlightedText(product.name, keyword)}</h5>
                    <p className="card-text">${product.price}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted text-center">
          <i className="fas fa-search fa-spin me-2"></i>
          No products found for "{keyword}".
        </p>
      )}
    </div>
  );
};

export default SearchResults;
