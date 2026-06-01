import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";
import { motion } from "framer-motion";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const ProductDetail = () => {
  const { id } = useParams();
  const { getProductById } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
 

  const [product, setProduct] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
   useEffect(() => {
  const fetchProduct = async () => {
    const product = await getProductById(id);
    setProduct(product);
  };

  fetchProduct();
}, [id,getProductById]);


  if (!product) return <LoadingSpinner/>

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto p-6 mt-10 grid grid-cols-1 md:grid-cols-2 gap-10"
    >
      {/* Left: Product Image */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-purple-200/40   flex justify-center"
      >
        <motion.img
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
          src={product.image}
          alt={product.title}
          className="w-80 h-80 object-contain "
        />
      </motion.div>

      {/* Right: Product Info */}
      <div className="space-y-5 rounded-xl shadow border border-slate-50 p-6">
        <h1 className="text-3xl font-bold text-purple-700">{product.title}</h1>

        <p className="text-slate-600 text-lg">{product.description}</p>

        <p className="text-xl font-semibold text-purple-600">
          Price: ${product.price}
        </p>

        <p className="text-sm text-slate-500">
          Category:{" "}
          <span className="font-semibold text-purple-500">
            {product.category}
          </span>
        </p>

        <button
          onClick={() => addToCart(product,1)}
          className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md shadow-purple-300 hover:bg-purple-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
