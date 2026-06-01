import { useState } from "react";
import { API } from "../../api/axios.js";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AdminAddProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(100);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const navigate = useNavigate();

  const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

  console.log(UPLOAD_PRESET);
  console.log(CLOUD_NAME);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadToCloudinary = async () => {
    console.log("Uploading to Cloudinary...", CLOUD_NAME, UPLOAD_PRESET);
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await res.json();
    console.log("Cloudinary response:", data);
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageUrl = await uploadToCloudinary();
      const token = localStorage.getItem("token");

      await API.post(
        "/products",
        { title, description, price, category, stock, image: imageUrl },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      toast.success("Product created successfully");
      navigate("/"); // ✅ correct place
    } catch (error) {
      console.log("ERROR:", error.response?.data || error.message);
      toast.error("Failed to create product");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full border p-2 rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Category"
          className="w-full border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Stock"
          className="w-full border p-2 rounded"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        {imagePreview && (
          <img
            src={imagePreview}
            alt="loaded "
            className="w-40 h-40 object-cover rounded"
          />
        )}

        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default AdminAddProduct;
