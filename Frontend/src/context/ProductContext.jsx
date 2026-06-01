import { createContext, useState, useEffect, useCallback } from "react";
import { ProductService } from "../services/productService.js"
import { toast } from "sonner";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Fetch all products
  const fetchProducts = useCallback(async () => {
    try {
      setLoadingProducts(true);
      const { data } = await ProductService.getAll();
      setProducts(data);
    } catch (err) {
      toast.error("Failed to fetch products");
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Get product by ID
  const getProductById = async (id) => {
    try {
      const { data } = await ProductService.getById(id);
      return data;
    } catch {
      toast.error("Failed to load product");
      return null;
    }
  };

  // Create product
  const createProduct = async (productData, token) => {
    try {
      const { data } = await ProductService.create(productData, token);
      setProducts((prev) => [...prev, data]);
      toast.success("Product created");
      return data;
    } catch {
      toast.error("Failed to create product");
    }
  };

  // Update product
  const updateProduct = async (id, productData, token) => {
    try {
      const { data } = await ProductService.update(id, productData, token);
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? data : p))
      );
      toast.success("Product updated");
      return data;
    } catch {
      toast.error("Failed to update product");
    }
  };

  // Delete product
  const deleteProduct = async (id, token) => {
    try {
      await ProductService.remove(id, token);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product deleted");
    } catch {
      toast.error("Failed to delete product");
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loadingProducts,
        fetchProducts,
        getProductById,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

