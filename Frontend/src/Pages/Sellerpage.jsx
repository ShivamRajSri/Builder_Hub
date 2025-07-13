import React, { useState } from "react";
import { Input } from "../Components/Input";
import { Button } from "../Components/Button";

export default function SellerPage() {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: URL.createObjectURL(files[0]) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:3000/seller/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log("Product saved:", result);
        alert("Product added successfully!");
        setFormData({ title: "", price: "", image: "" });
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
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />
        <Button type="submit">Submit</Button>
      </form>

      {formData.image && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Preview:</h3>
          <img
            src={formData.image}
            alt="Preview"
            className="mt-2 w-full h-48 object-cover rounded-xl"
          />
        </div>
      )}
    </div>
  );
}