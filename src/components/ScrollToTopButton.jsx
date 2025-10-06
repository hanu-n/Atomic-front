import { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button after user scrolls down 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // smooth scrolling
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="scroll-to-top btn btn-success position-fixed"
          style={{
            bottom: "40px",
            right: "40px",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            fontSize: "24px",
            zIndex: 1000,
          }}
        >
          ↑
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;

