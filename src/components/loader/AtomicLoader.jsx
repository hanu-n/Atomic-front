// src/components/AtomicLoader.jsx
import React, { useState, useEffect } from "react";
import '../../assets/css/AtomicLoader.css'

const AtomicLoader = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing...");
  const [dots, setDots] = useState("");

  useEffect(() => {
    const loadingMessages = [
      "Initializing...",
      "Loading products...",
      "Preparing catalog...",
      "Almost ready..."
    ];

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    const textInterval = setInterval(() => {
      setLoadingText(prev => {
        const currentIndex = loadingMessages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, 800);

    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".");
    }, 500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
      clearInterval(dotsInterval);
    };
  }, []);

  return (
    <div className="atomic-loader-container">
      {/* Animated background particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
      </div>
      
      <div className="loading-screen">
        <div className="atom-loader">
          <div className="nucleus">
            <div className="nucleus-core"></div>
            <div className="nucleus-pulse"></div>
          </div>
          <div className="orbit orbit-1">
            <div className="electron electron-1"></div>
          </div>
          <div className="orbit orbit-2">
            <div className="electron electron-2"></div>
          </div>
          <div className="orbit orbit-3">
            <div className="electron electron-3"></div>
          </div>
          <div className="orbit orbit-4">
            <div className="electron electron-4"></div>
          </div>
        </div>
        
        <div className="loading-content">
          <h1 className="brand">
            <span className="brand-letter">A</span>
            <span className="brand-letter">t</span>
            <span className="brand-letter">o</span>
            <span className="brand-letter">m</span>
            <span className="brand-letter">i</span>
            <span className="brand-letter">c</span>
            <span className="brand-space"> </span>
            <span className="brand-letter">M</span>
            <span className="brand-letter">A</span>
            <span className="brand-letter">S</span>
          </h1>
          
          <p className="tagline">Quality Material Supply for better Education</p>
          
          <div className="loading-text-container">
            <span className="loading-text">{loadingText}</span>
            <span className="loading-dots">{dots}</span>
          </div>
          
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${Math.min(progress, 100)}%` }}>
              <div className="progress-shine"></div>
            </div>
            <div className="progress-percentage">{Math.round(Math.min(progress, 100))}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtomicLoader;
