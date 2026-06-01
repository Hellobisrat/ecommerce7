import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import { toast } from "sonner";

const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateProduct, getProductById } = useProducts();
  const [updating, setUpdating] = useState(false);

  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProductById(id);
      setForm(product);
    };
    fetchProduct();
  }, [id, getProductById]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      await updateProduct(id, form, token);
      toast.success("Product updated successfully");
      navigate("/admin/products");
    } catch (err) {
      toast.error("Failed to update product");
    } finally {
      setUpdating(false);
    }
  };

  if (!form.title) {
    return <div className="text-center mt-10">Loading product...</div>;
  }

  return (
    <div className="p-6 w-[500px] md:w-[750px] mx-auto">
      <h1 className="text-xl font-bold mb-4">Edit Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Product Name"
        />

        <input
          name="price"
          value={form.price || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Price"
        />

        <textarea
          name="description"
          value={form.description || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Description"
        />

        <input
          name="image"
          value={form.image || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Image URL"
        />

        <button
          disabled={updating}
          className={`w-full py-2 rounded text-white ${
            updating ? "bg-gray-400" : "bg-blue-600"
          }`}
        >
          {updating ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default AdminEditProduct;
