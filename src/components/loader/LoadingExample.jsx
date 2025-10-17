// Example of how to use ContextualLoader in different pages
import React, { useState, useEffect } from 'react';
import ContextualLoader from './ContextualLoader';

const CategoryPageExample = ({ categoryName }) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Your API call here
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay
        setProducts([]); // Your products data
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <ContextualLoader category={categoryName} size="medium" />
      </div>
    );
  }

  return (
    <div>
      <h1>{categoryName} Products</h1>
      {/* Your products content */}
      <ContextualLoader category="biology" />     // Shows DNA helix
<ContextualLoader category="chemistry" />   // Shows beaker
<ContextualLoader category="physics" />     // Shows gears
<ContextualLoader category="agriculture" /> // Shows growing grass
<ContextualLoader category="medical" />     // Shows medical cross
<ContextualLoader category="general" />     // Shows atomic loader


    </div>
    
  );
};


export default CategoryPageExample;

// Usage Examples:
{/* <ContextualLoader category="biology" />     // Shows DNA helix
<ContextualLoader category="chemistry" />   // Shows beaker
<ContextualLoader category="physics" />     // Shows gears
<ContextualLoader category="agriculture" /> // Shows growing grass
<ContextualLoader category="medical" />     // Shows medical cross
<ContextualLoader category="general" />     // Shows atomic loader
 */}
