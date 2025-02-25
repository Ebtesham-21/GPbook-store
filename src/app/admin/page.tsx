"use client";

import { useEffect, useState } from "react";

interface Slider {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export default function AdminPage() {
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [message, setMessage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [editingSlider, setEditingSlider] = useState<Slider | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const res = await fetch("/api/admin/slider");
        if (!res.ok) throw new Error(`Failed to fetch sliders: ${res.statusText}`);
        const data = await res.json();
        setSliders(data.sliders);
      } catch (error) {
        console.error("Error fetching sliders:", error);
        setMessage("Error fetching sliders. Please try again later.");
      }
    };

    fetchSliders();
  }, []);

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/admin/slider/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setMessage("Slider deleted successfully");
      setSliders(sliders.filter((slider) => slider._id !== id));
    } else {
      setMessage("Failed to delete slider");
    }
  };

  const handleEdit = (slider: Slider) => {
    setTitle(slider.title);
    setDescription(slider.description);
    setImage(null);
    setEditingSlider(slider);
    setShowEditModal(true);
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      setMessage("All fields are required");
      return;
    }

    let imageUrl = editingSlider?.imageUrl || "";

    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "bookstore_uploads");
      formData.append("cloud_name", "dpiy18xkg");

      try {
        const cloudRes = await fetch("https://api.cloudinary.com/v1_1/dpiy18xkg/image/upload", {
          method: "POST",
          body: formData,
        });

        const cloudData = await cloudRes.json();
        imageUrl = cloudData.secure_url;
      } catch (error) {
        setMessage("Error uploading image");
        return;
      }
    }

    const updatedSlider: Slider = {
      _id: editingSlider?._id ?? "", // Ensure _id is always a string
      title,
      description,
      imageUrl,
    };

    const response = await fetch(`/api/admin/slider/${editingSlider?._id}`, {
      method: "PUT",
      body: JSON.stringify(updatedSlider),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    if (response.ok) {
      setMessage("Slider updated successfully");
      setSliders(
        sliders.map((slider) =>
          slider._id === editingSlider?._id ? updatedSlider : slider
        )
      );
      setShowEditModal(false);
    } else {
      setMessage(result.error || "Failed to update slider");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !image) {
      setMessage("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "bookstore_uploads");
    formData.append("cloud_name", "dpiy18xkg");

    try {
      const cloudRes = await fetch("https://api.cloudinary.com/v1_1/dpiy18xkg/image/upload", {
        method: "POST",
        body: formData,
      });

      const cloudData = await cloudRes.json();
      const newSlider = { title, description, imageUrl: cloudData.secure_url };

      const response = await fetch("/api/admin/slider", {
        method: "POST",
        body: JSON.stringify(newSlider),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setMessage("Slider added successfully");
        setTitle("");
        setDescription("");
        setImage(null);
        const addedSlider = await response.json();
        setSliders([...sliders, addedSlider]);
      } else {
        setMessage("Failed to add slider");
      }
    } catch (error) {
      setMessage("Error uploading image");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl mb-4">Admin Panel - Manage Sliders</h1>

      <form onSubmit={handleSubmit} className="mb-6 border p-4">
        <h2 className="text-xl mb-2">Add New Slider</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="block w-full border p-2 mb-2"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="block w-full border p-2 mb-2"
        />
        <input type="file" onChange={handleImageChange} className="mb-2" />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Upload Slider
        </button>
      </form>

      <div className="space-y-4">
        {sliders.map((slider) => (
          <div key={slider._id} className="border p-4">
            <h3 className="text-xl">{slider.title}</h3>
            <p>{slider.description}</p>
            <img src={slider.imageUrl} alt={slider.title} width={150} />
            <div className="mt-2 space-x-2">
              <button onClick={() => handleEdit(slider)} className="bg-blue-500 text-white px-4 py-2 rounded">
                Edit
              </button>
              <button onClick={() => handleDelete(slider._id)} className="bg-red-500 text-white px-4 py-2 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showEditModal && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Edit Slider</h2>
            <form onSubmit={handleUpdateSubmit}>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="block w-full border p-2 mb-2"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="block w-full border p-2 mb-2"
              />
              <input type="file" onChange={handleImageChange} className="mb-2" />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Update Slider
              </button>
            </form>
            <button onClick={() => setShowEditModal(false)} className="mt-2 text-gray-700">
              Cancel
            </button>
          </div>
        </div>
      )}

      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
}
