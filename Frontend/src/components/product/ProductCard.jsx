import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

const ProductCard = ({ filteredProducts }) => {
  const { addToCart } = useCart();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {filteredProducts.map((product) => {
        return (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="
              relative group
              bg-white/60 backdrop-blur-md
              border border-purple-200/40
              shadow-lg shadow-purple-100
              rounded-2xl p-5
              flex flex-col justify-between
              hover:shadow-purple-300/50
              transition
            "
          >
            <button className="absolute top-3 right-3 p-2 rounded-full bg-white/70 shadow hover:bg-white transition ">
              <Heart className="w-5 h-5 text-pink-500 group-hover:scale-110 transition" />
            </button>

            <Link
              to={`/product/${product._id}`}
              className="flex flex-col items-center"
            >
              <p className="font-semibold text-slate-900 text-center line-clamp-2 h-[50px]">
                {product.title}
              </p>
              <img
                src={`https://images.weserv.nl/?url=${product.image.replace("https://", "")}`}
                alt={product.title}
                className="w-full h-48 object-cover rounded-lg mt-3"
              />
            </Link>

            <div className="flex flex-col items-center gap-2 mt-4">
              <p className="text-sm text-slate-600">Price: ${product.price}</p>

              <motion.button
                onClick={() => addToCart(product)}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-600 text-white font-semibold
                  px-2 py-2 rounded-lg
                  shadow-md shadow-purple-300
                  opacity-0 group-hover:opacity-100
                  translate-y-3 group-hover:translate-y-0
                "
              >
                Add to Cart
              </motion.button>

              <Link
                to={`/product/${product._id}`}
                className="bg-blue-500 text-white font-semibold
                  px-4 py-2 shadow-blue-300
                  hover:bg-blue-600 transition
                "
              >
                See Detail
              </Link>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default React.memo(ProductCard);
