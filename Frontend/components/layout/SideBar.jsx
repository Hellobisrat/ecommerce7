import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar, categories, activeCategory, onSelect }) => {
  return (
    <div className="md:w-64 ">
      {/* Toggle Button (Mobile Only) */}
      <button
        onClick={toggleSidebar}
        className="md:hidden bg-purple-600 text-white px-4 py-2 rounded-lg mb-4 flex items-center gap-2"
      >
        Categories {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>

      {/* Sidebar Content */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden md:overflow-visible"
      >
        <div className="bg-white/6 backdrop:blur-xl space-y-6 p-5 rounded-xl shadow-lg border border-purple-200/40 h-screen">
          <h2 className="text-xl font-bold text-purple-700 mb-4">Categories</h2>

          <ul className="space-y-8">
            <li
              onClick={() => onSelect("all")}
              className={`cursor-pointer px-3 py-2 rounded-lg transition ${
                activeCategory === "all"
                  ? "bg-purple-600 text-white"
                  : "hover:bg-purple-200 text-purple-700"
              }`}
            >
              All Products
            </li>
            {categories.map((cat) => (
              <li
                key={cat}
                onClick={() => onSelect(cat)}
                className={`cursor-pointer px-3 py-2 rounded-lg transition ${
                  activeCategory === cat
                    ? "bg-purple-600 text-white"
                    : "hover:bg-purple-200 text-purple-700"
                }`}
              >
                {cat}
              </li>
            ))}
            
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default Sidebar;
