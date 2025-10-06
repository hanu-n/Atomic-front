import React, { useState } from 'react';
import { toast } from 'react-toastify';

const BulkImageUpload = ({ onImagesSelected }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState(['']);
  const [previews, setPreviews] = useState([]);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    
    // Create previews
    const newPreviews = [];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviews.push(e.target.result);
        if (newPreviews.length === files.length) {
          setPreviews(newPreviews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleUrlChange = (index, url) => {
    const newUrls = [...imageUrls];
    newUrls[index] = url;
    setImageUrls(newUrls);
  };

  const addUrlField = () => {
    setImageUrls([...imageUrls, '']);
  };

  const removeUrlField = (index) => {
    const newUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newUrls);
  };

  const handleSubmit = () => {
    const allImages = [...selectedFiles, ...imageUrls.filter(url => url.trim())];
    if (allImages.length === 0) {
      toast.error('Please select at least one image');
      return;
    }
    onImagesSelected(allImages);
    toast.success(`${allImages.length} images ready for upload`);
  };

  return (
    <div className="card mb-4">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">📸 Bulk Image Upload</h5>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <h6>📁 Upload Multiple Files</h6>
            <input
              type="file"
              className="form-control mb-3"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
            />
            
            {selectedFiles.length > 0 && (
              <div className="alert alert-info">
                <strong>{selectedFiles.length}</strong> files selected
              </div>
            )}

            <h6>🌐 Add Image URLs</h6>
            {imageUrls.map((url, index) => (
              <div key={index} className="input-group mb-2">
                <input
                  type="url"
                  className="form-control"
                  placeholder="Paste image URL..."
                  value={url}
                  onChange={(e) => handleUrlChange(index, e.target.value)}
                />
                {imageUrls.length > 1 && (
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => removeUrlField(index)}
                  >
                    ❌
                  </button>
                )}
              </div>
            ))}
            
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={addUrlField}
            >
              ➕ Add Another URL
            </button>
          </div>

          <div className="col-md-6">
            <h6>👁️ Preview</h6>
            <div className="row">
              {previews.map((preview, index) => (
                <div key={index} className="col-6 mb-2">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="img-thumbnail"
                    style={{ width: '100%', height: '100px', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
            
            {previews.length === 0 && (
              <div className="text-center text-muted">
                <i className="fas fa-images fa-2x mb-2"></i>
                <p>No images selected</p>
              </div>
            )}
          </div>
        </div>

        <hr />

        <div className="text-center">
          <button
            className="btn btn-success btn-lg"
            onClick={handleSubmit}
            disabled={selectedFiles.length === 0 && imageUrls.every(url => !url.trim())}
          >
            📤 Prepare {selectedFiles.length + imageUrls.filter(url => url.trim()).length} Images
          </button>
        </div>

        <div className="alert alert-warning mt-3">
          <h6>⚠️ Important Notes:</h6>
          <ul className="mb-0">
            <li>Maximum file size: 5MB per image</li>
            <li>Supported formats: JPG, PNG, WebP</li>
            <li>Recommended resolution: 800x800px or higher</li>
            <li>Images will be optimized automatically</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BulkImageUpload;
