import { motion } from "framer-motion";

export default function LoadingSpinner() {
  return (
    <section className="h-screen flex justify-center items-center w-full bg-white/60 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center"
      >
        <div className="
          animate-spin 
          rounded-full 
          h-16 w-16 
          border-4 
          border-purple-300 
          border-t-purple-600
          shadow-md shadow-purple-200
        "></div>

        <p className="mt-4 text-purple-700 font-semibold text-lg">
          Loading, please wait...
        </p>
      </motion.div>
    </section>
  );
}
