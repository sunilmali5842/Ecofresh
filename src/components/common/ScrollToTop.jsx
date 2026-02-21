import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [pathname]);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-8 right-8 z-50 
      transition-all duration-300 ease-in-out
      ${isVisible
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <div className="w-10 h-10 cursor-pointer flex items-center justify-center rounded-full 
        bg-green-600 text-white shadow-lg 
        hover:bg-green-700 hover:scale-110 transition duration-300">
        <FaArrowUp size={16} />
      </div>
    </button>
  );
}
