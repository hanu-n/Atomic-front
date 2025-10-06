import React, { useState } from 'react';

const ImageUploadHelper = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    if (url) {
      setImagePreview(url);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const imageSources = [
    {
      name: "Unsplash",
      url: "https://unsplash.com",
      description: "High-quality free images",
      searchTerms: ["laboratory", "scientific equipment", "chemistry lab"]
    },
    {
      name: "Pexels",
      url: "https://pexels.com",
      description: "Free stock photos",
      searchTerms: ["lab equipment", "medical devices", "research"]
    },
    {
      name: "Shopify Burst",
      url: "https://burst.shopify.com",
      description: "Ecommerce-focused images",
      searchTerms: ["products", "equipment", "tools"]
    },
    {
      name: "Freepik",
      url: "https://freepik.com",
      description: "Free and premium images",
      searchTerms: ["laboratory", "scientific", "medical"]
    }
  ];

  return (
    <div className="card mb-4">
      <div className="card-header bg-info text-white">
        <h5 className="mb-0">🖼️ Image Upload Helper</h5>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <h6>📁 Upload from Computer</h6>
            <input
              type="file"
              className="form-control mb-3"
              accept="image/*"
              onChange={handleFileUpload}
            />
            
            <h6>🌐 Use Image URL</h6>
            <div className="input-group mb-3">
              <input
                type="url"
                className="form-control"
                placeholder="Paste image URL here..."
                value={imageUrl}
                onChange={handleUrlChange}
              />
              <button 
                className="btn btn-outline-secondary"
                onClick={() => setImageUrl('')}
              >
                Clear
              </button>
            </div>
          </div>
          
          <div className="col-md-6">
            <h6>👁️ Preview</h6>
            {imagePreview ? (
              <div className="text-center">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="img-thumbnail"
                  style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
                />
                <div className="mt-2">
                  <small className="text-muted">
                    ✅ Image ready for upload
                  </small>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted">
                <i className="fas fa-image fa-3x mb-2"></i>
                <p>No image selected</p>
              </div>
            )}
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-12">
            <h6>🎯 Recommended Image Sources</h6>
            <div className="row">
              {imageSources.map((source, index) => (
                <div key={index} className="col-md-6 mb-3">
                  <div className="card border-0 bg-light">
                    <div className="card-body p-3">
                      <h6 className="card-title">
                        <a 
                          href={source.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-decoration-none"
                        >
                          {source.name} ↗️
                        </a>
                      </h6>
                      <p className="card-text small text-muted">
                        {source.description}
                      </p>
                      <div className="small">
                        <strong>Search terms:</strong>
                        <br />
                        {source.searchTerms.map((term, i) => (
                          <span key={i} className="badge bg-secondary me-1 mb-1">
                            {term}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="alert alert-info">
          <h6>💡 Pro Tips:</h6>
          <ul className="mb-0">
            <li>Use high-resolution images (at least 800x800px)</li>
            <li>Keep file sizes under 2MB for faster loading</li>
            <li>Use consistent lighting and backgrounds</li>
            <li>Include multiple angles for complex products</li>
            <li>Consider using AI tools like DALL-E or Midjourney for custom images</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadHelper;
