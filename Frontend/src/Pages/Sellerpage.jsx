import React, { useState } from "react";
import { Input } from "../Components/Input";
import { Button } from "../Components/Button";

export default function SellerPage() {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    images: [], // Array of File objects
  });

  const [previewImages, setPreviewImages] = useState([]); // For displaying image previews

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "images") {
      const fileList = Array.from(files);
      setFormData((prev) => ({ ...prev, images: fileList }));

      // Generate previews from selected files
      const previews = fileList.map((file) => URL.createObjectURL(file));
      setPreviewImages(previews);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("price", formData.price);
    data.append("description", formData.description);
 
    formData.images.forEach((img) => {
      data.append("images", img);
    });

    try {
      const response = await fetch("http://localhost:3000/seller/add", {
        method: "POST",
        body: data,
      });
      if (response.ok) {
        const result = await response.json();
        console.log("Product saved:", result);
        alert("Product added successfully!");
        setFormData({ title: "", price: "", description: "", images: [] });
        setPreviewImages([]);
      } else {
        console.error("Failed to submit product");
        alert("Error adding product");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Add Your Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Product Title"
        />
        <Input
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <Input
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          onChange={handleChange}
        />
        <Button type="submit">Submit</Button>
      </form>

      {previewImages.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Preview:</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {previewImages.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Preview ${idx}`}
                className="w-full h-40 object-cover rounded-xl"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}