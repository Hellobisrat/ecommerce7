import { useProducts } from  "../../hooks/useProducts.js"
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import Button from "../../components/ui/Button.jsx"

const AdminProductList = () => {
  const { products, deleteProduct, loading } = useProducts();
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      const token = localStorage.getItem("token");
      setDeletingId(id);
      await deleteProduct(id, token);
      setDeletingId(null);
      toast.success("Product deleted");
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };
  if (loading) {
    return <div className="text-center mt-10">Loading products...</div>;
  }

  if (!loading && products.length === 0) {
    return <div className="text-center mt-10">No products found</div>;
  }

  return (
    <div className="p-6 w-[700px] md:w-[850px] mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold mb-4">Manage Products</h1>
        <Link
          to="/admin/add-product"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          + Add Product
        </Link>
      </div>

      <div className="space-y-4">
        {products.map((p) => (
          <div
            key={p._id}
            className="flex justify-between items-center p-4 border rounded"
          >
            <div className="flex items-center gap-4">
              <img
                src={p.image}
                alt={p.title}
                className="w-8 h-8 object-cover rounded"
              />
              <h2 className="font-semibold">{p.title}</h2>
              <p className="text-sm text-gray-500">${p.price}</p>

              <p className="text-xs text-gray-500">Category: {p.category}</p>
              <p className="text-xs text-gray-500">Stock: {p.stock}</p>
            </div>

            <div className="flex gap-3">
              <Link
                to={`/admin/products/${p._id}/edit`}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                <Button>Edit</Button>
              </Link>

              <Button
                disabled={deletingId === p._id}
                onClick={() => handleDelete(p._id)}
                variant="danger"
              >
                {deletingId === p._id ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProductList;
