import React from 'react';
import ContextualLoader from './ContextualLoader';

const LoaderTest = () => {
  const testCategories = [
    'biology',
    'chemistry', 
    'physics',
    'agricultural-supplies',
    'medical-equipment',
    'school-equipment',
    'university-equipment',
    'manufacturing-equipment',
    'general'
  ];

  return (
    <div className="container py-5">
      <h2 className="mb-4">Contextual Loader Test</h2>
      <div className="row">
        {testCategories.map((category, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body text-center">
                <h5 className="card-title">{category}</h5>
                <ContextualLoader category={category} size="small" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoaderTest;

//
