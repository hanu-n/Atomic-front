import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SearchResults = () => {
  const { keyword } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const { data } = await axios.get(`/api/products/search?keyword=${keyword}`);
        setProducts(data);
      } catch (error) {
        console.error("Search error:", error);
      }
    };

    fetchSearchResults();
  }, [keyword]);

  return (
    <div>
      <h2>Search Results for "{keyword}"</h2>
      <div className="row">
        {products.map(product => (
          <div key={product._id} className="col-md-4 mb-4">
            {/* Render product info */}
            <div className="card">
              <img src={product.image} alt={product.name} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">${product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
