import React from 'react';
import './ContextualLoader.css';

const ContextualLoader = ({ category, size = 'medium' }) => {
  const renderLoader = () => {
    const categoryLower = category?.toLowerCase() || '';
    
    // Biology variations
    if (categoryLower.includes('biology') || categoryLower.includes('biological') || 
        categoryLower.includes('bio') || categoryLower.includes('life') ||
        categoryLower.includes('models') || categoryLower.includes('specimens')) {
      return <DNALoader size={size} />;
    }
    
    // Chemistry variations
    if (categoryLower.includes('chemistry') || categoryLower.includes('chemical') || 
        categoryLower.includes('chem') || categoryLower.includes('lab') ||
        categoryLower.includes('glassware') || categoryLower.includes('safety-equipment') ||
        categoryLower.includes('indicators') || categoryLower.includes('dyes')) {
      return <BeakerLoader size={size} />;
    }
    
    // Physics variations
    if (categoryLower.includes('physics') || categoryLower.includes('physical') || 
        categoryLower.includes('mechanical') || categoryLower.includes('apparatus') ||
        categoryLower.includes('school-equipment') || categoryLower.includes('university-equipment')) {
      return <GearLoader size={size} />;
    }
    
    // Agriculture variations
    if (categoryLower.includes('agriculture') || categoryLower.includes('agricultural') || 
        categoryLower.includes('farming') || categoryLower.includes('crop') ||
        categoryLower.includes('fertilizers') || categoryLower.includes('pesticides') ||
        categoryLower.includes('herbicides') || categoryLower.includes('soil-conditioners') ||
        categoryLower.includes('veterinary') || categoryLower.includes('growth-regulators')) {
      return <GrassLoader size={size} />;
    }
    
    // Medical variations
    if (categoryLower.includes('medical') || categoryLower.includes('medicine') || 
        categoryLower.includes('health') || categoryLower.includes('clinical') ||
        categoryLower.includes('hospital') || categoryLower.includes('diagnostic') ||
        categoryLower.includes('surgical') || categoryLower.includes('protective-equipment') ||
        categoryLower.includes('testing-kits') || categoryLower.includes('sample-collection')) {
      return <MedicalLoader size={size} />;
    }
    
    // Manufacturing/Research variations - use gears
    if (categoryLower.includes('manufacturing') || categoryLower.includes('research') ||
        categoryLower.includes('quality-control') || categoryLower.includes('production') ||
        categoryLower.includes('analytical') || categoryLower.includes('instruments')) {
      return <GearLoader size={size} />;
    }
    
    // Default to atomic loader
    return <AtomicLoader size={size} />;
  };

  return (
    <div className={`contextual-loader ${size}`}>
      {renderLoader()}
      {/* Debug info - remove this in production */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{ fontSize: '10px', color: '#666', marginTop: '5px' }}>
          Category: {category || 'undefined'}
        </div>
      )}
    </div>
  );
};

// STUNNING DNA Helix Loader for Biology
const DNALoader = ({ size }) => (
  <div className="dna-loader">
    <div className="dna-strand strand-1">
      <div className="base-pair base-1"></div>
      <div className="base-pair base-2"></div>
      <div className="base-pair base-3"></div>
      <div className="base-pair base-4"></div>
      <div className="base-pair base-5"></div>
      <div className="base-pair base-6"></div>
      <div className="base-pair base-7"></div>
    </div>
    <div className="dna-strand strand-2">
      <div className="base-pair base-1"></div>
      <div className="base-pair base-2"></div>
      <div className="base-pair base-3"></div>
      <div className="base-pair base-4"></div>
      <div className="base-pair base-5"></div>
      <div className="base-pair base-6"></div>
      <div className="base-pair base-7"></div>
    </div>
    <div className="dna-helix"></div>
    <span className="loading-text">🧬 Loading Biology...</span>
  </div>
);

// STUNNING Beaker Loader for Chemistry
const BeakerLoader = ({ size }) => (
  <div className="beaker-loader">
    <div className="beaker">
      <div className="beaker-liquid">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
        <div className="bubble bubble-4"></div>
        <div className="bubble bubble-5"></div>
      </div>
    </div>
    <span className="loading-text">🧪 Loading Chemistry...</span>
  </div>
);

// STUNNING Gear Loader for Physics
const GearLoader = ({ size }) => (
  <div className="gear-loader">
    <div className="gear gear-1">
      <div className="gear-teeth">
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`tooth tooth-${i + 1}`}></div>
        ))}
      </div>
    </div>
    <div className="gear gear-2">
      <div className="gear-teeth">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`tooth tooth-${i + 1}`}></div>
        ))}
      </div>
    </div>
    <span className="loading-text">⚙️ Loading Physics...</span>
  </div>
);

// REALISTIC Grass Growing Loader for Agriculture
const GrassLoader = ({ size }) => (
  <div className="grass-loader">
    <div className="grass-container">
      {[...Array(20)].map((_, i) => (
        <div key={i} className={`grass-blade blade-${i + 1}`}></div>
      ))}
    </div>
    <span className="loading-text">🌾 Loading Agriculture...</span>
  </div>
);

// STUNNING Medical Cross Loader
const MedicalLoader = ({ size }) => (
  <div className="medical-loader">
    <div className="medical-cross">
      <div className="cross-vertical"></div>
      <div className="cross-horizontal"></div>
      <div className="heartbeat-line"></div>
    </div>
    <span className="loading-text">🏥 Loading Medical...</span>
  </div>
);

// STUNNING Default Atomic Loader
const AtomicLoader = ({ size }) => (
  <div className="atomic-loader">
    <div className="atom">
      <div className="nucleus"></div>
      <div className="orbit orbit-1">
        <div className="electron"></div>
      </div>
      <div className="orbit orbit-2">
        <div className="electron"></div>
      </div>
    </div>
    <span className="loading-text">⚛️ Loading...</span>
  </div>
);

export default ContextualLoader;
