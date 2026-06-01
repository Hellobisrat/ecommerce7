import React, { useState, useEffect } from "react";

import { useProducts } from "../hooks/useProducts.js"
import LoadingSpinner from "../components/ui/LoadingSpinner.jsx"
import ProductCard from "../components/product/ProductCard.jsx"
import Sidebar from "../components/layout/SideBar.jsx";
import SearchBar from "../components/layout/SearchBar";

const Home = () => {
  const { products, loading } = useProducts();

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  console.log("BACKEND PRODUCTS:", products);

  const itemsPerPage = 8;

  const categories = [...new Set(products.map((p) => p.category))];

  // Filter by category + search
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "all" || product.category === activeCategory;

    const matchesSearch = product.title
      .toLowerCase()
      .includes(query.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true); // always open on desktop
      }
    };

    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] min-h-screen gap-6 p-4 mt-6">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        categories={categories}
        activeCategory={activeCategory}
        onSelect={(cat) => {
          setActiveCategory(cat);
          setCurrentPage(1);
        }}
      />

      {/* Main Content */}
      <div>
        <SearchBar onSearch={(value) => setQuery(value)} />

        <ProductCard filteredProducts={currentProducts} />

        {/* Pagination */}
        <div className="flex justify-center mt-10 gap-3">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg disabled:bg-gray-300"
          >
            Prev
          </button>

          {Array.from({
            length: Math.ceil(filteredProducts.length / itemsPerPage),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === index + 1
                  ? "bg-purple-700 text-white"
                  : "bg-purple-200 text-purple-700"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={
              currentPage === Math.ceil(filteredProducts.length / itemsPerPage)
            }
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
