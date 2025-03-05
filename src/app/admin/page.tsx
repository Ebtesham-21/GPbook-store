"use client";

import { useEffect, useState } from "react";
import AdminAnalytics from "@/components/admin/AdminAnalytics";

interface Slider {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface Product {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
}

export default function AdminDashboard() {
  // Slider State
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [sliderTitle, setSliderTitle] = useState("");
  const [sliderDescription, setSliderDescription] = useState("");
  const [sliderImage, setSliderImage] = useState<File | null>(null);
  const [editingSlider, setEditingSlider] = useState<Slider | null>(null);

  // Product State
  const [products, setProducts] = useState<Product[]>([]);
  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState<File | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [message, setMessage] = useState("");

  // Fetch Sliders and Products
  useEffect(() => {
    fetchSliders();
    fetchProducts();
  }, []);

  const fetchSliders = async () => {
    const res = await fetch("/api/admin/slider");
    const data = await res.json();
    setSliders(data.sliders);
  };

  const fetchProducts = async () => {
    const res = await fetch("/api/admin/products");
    const data = await res.json();
    setProducts(data.products);
  };

  // Handle Image Upload to Cloudinary
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "bookstore_uploads");

    const res = await fetch("https://api.cloudinary.com/v1_1/dpiy18xkg/image/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.secure_url;
  };

  // Handle Slider Submission
  const handleSliderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!sliderTitle || !sliderDescription || !sliderImage) {
      setMessage("All fields are required for the slider");
      return;
    }

    try {
      const imageUrl = await uploadImage(sliderImage);

      const sliderData = { title: sliderTitle, description: sliderDescription, imageUrl };

      const response = editingSlider
        ? await fetch(`/api/admin/slider/${editingSlider._id}`, {
            method: "PUT",
            body: JSON.stringify(sliderData),
            headers: { "Content-Type": "application/json" },
          })
        : await fetch("/api/admin/slider", {
            method: "POST",
            body: JSON.stringify(sliderData),
            headers: { "Content-Type": "application/json" },
          });

      if (response.ok) {
        setMessage(editingSlider ? "Slider updated successfully" : "Slider added successfully");
        fetchSliders();
        setSliderTitle("");
        setSliderDescription("");
        setSliderImage(null);
        setEditingSlider(null);
      } else {
        setMessage("Failed to add/update slider");
      }
    } catch (error) {
      setMessage("Error uploading image");
    }
  };

  // Handle Product Submission
  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productTitle || !productPrice || !productImage) {
      setMessage("All fields are required for the product");
      return;
    }

    try {
      const imageUrl = await uploadImage(productImage);

      const productData = { title: productTitle, price: parseFloat(productPrice), imageUrl };

      const response = editingProduct
        ? await fetch(`/api/admin/products/${editingProduct._id}`, {
            method: "PUT",
            body: JSON.stringify(productData),
            headers: { "Content-Type": "application/json" },
          })
        : await fetch("/api/admin/products", {
            method: "POST",
            body: JSON.stringify(productData),
            headers: { "Content-Type": "application/json" },
          });

      if (response.ok) {
        setMessage(editingProduct ? "Product updated successfully" : "Product added successfully");
        fetchProducts();
        setProductTitle("");
        setProductPrice("");
        setProductImage(null);
        setEditingProduct(null);
      } else {
        setMessage("Error occurred. Please try again.");
      }
    } catch (error) {
      setMessage("Error uploading image");
    }
  };

  // Handle Delete
  const handleDeleteSlider = async (id: string) => {
    await fetch(`/api/admin/slider/${id}`, { method: "DELETE" });
    setSliders(sliders.filter((slider) => slider._id !== id));
  };

  const handleDeleteProduct = async (id: string) => {
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    setProducts(products.filter((product) => product._id !== id));
  };

  return (
    <div className="container mx-auto p-8">


      <h1 className="text-3xl mb-6 font-bold">Admin Dashboard</h1>

      {message && <p className="text-red-500 mb-4">{message}</p>}


      {/* Analytics section */}
      <AdminAnalytics/>

      {/* Slider Management */}
      <div className="border p-4 mb-8">
        <h2 className="text-2xl mb-4">Manage Sliders</h2>
        <form onSubmit={handleSliderSubmit} className="mb-4">
          <input type="text" value={sliderTitle} onChange={(e) => setSliderTitle(e.target.value)} placeholder="Title" className="block w-full border p-2 mb-2" />
          <textarea value={sliderDescription} onChange={(e) => setSliderDescription(e.target.value)} placeholder="Description" className="block w-full border p-2 mb-2" />
          <input type="file" onChange={(e) => e.target.files && setSliderImage(e.target.files[0])} className="mb-2" />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">{editingSlider ? "Update Slider" : "Add Slider"}</button>
        </form>

        {sliders.map((slider) => (
          <div key={slider._id} className="border p-4 flex justify-between items-center">
            <h3 className="text-lg">{slider.title}</h3>
            <p>{slider.description}</p>
            <img src={slider.imageUrl} alt={slider.title} className="w-24 h-24 object-cover rounded" />
            <button onClick={() => setEditingSlider(slider)} className="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
            <button onClick={() => handleDeleteSlider(slider._id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
          </div>
        ))}
      </div>

      {/* Product Management */}
      <div className="border p-4">
        <h2 className="text-2xl mb-4">Manage Products</h2>
        <form onSubmit={handleProductSubmit} className="mb-4">
          <input type="text" value={productTitle} onChange={(e) => setProductTitle(e.target.value)} placeholder="Title" className="block w-full border p-2 mb-2" />
          <input type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} placeholder="Price" className="block w-full border p-2 mb-2" />
          <input type="file" onChange={(e) => e.target.files && setProductImage(e.target.files[0])} className="mb-2" />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">{editingProduct ? "Update Product" : "Add Product"}</button>
        </form>

        {products.map((product) => (
          <div key={product._id} className="border p-4 flex justify-between items-center">
            <h3 className="text-lg">{product.title}</h3>
            <p>${product.price}</p>
            <img src={product.imageUrl} alt={product.title} className="w-24 h-24 object-cover rounded" />
            <button onClick={() => setEditingProduct(product)} className="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
            <button onClick={() => handleDeleteProduct(product._id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
