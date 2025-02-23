"use client";
import { useState } from "react";


export default function AdminPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [message, setMessage] = useState('');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!image || !title || !description){
            setMessage("All fields are required");
            return;
        }

        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "bookstore_uploads");
        formData.append("cloud_name", "dpiy18xkg");


        try {
            const res = await fetch('https://api.cloudinary.com/v1_1/dpiy18xkg/image/upload', {
                method: 'POST',
                body: formData,
            
        });

        const data = await res.json();
        const imageUrl = data.secure_url;

        const response = await fetch('/api/admin/slider', {
            method: 'POST',
            body: JSON.stringify({ title, description, imageUrl }),
            headers: {
                'Content-Type': 'application/json',
            },
        
    });

    const result = await response.json();
    if(response.ok) {
        setMessage('Slider updated successfully');
    } else {
        setMessage(result.error || 'Failed to update slider');
    }
} catch (error) {
    setMessage('Error uploading image');
}
};

return (
    <div className="container mx-auto p-8">
        <h1 className="text-2xl mb-4">
            Admin Panel - Update Slider
        </h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-sm font-medium">Title</label>
                <input 
                    type="text"
                    value = {title}
                    onChange = {(e) => setTitle(e.target.value)}
                    className="mt-2 w-full border p-2"
                    placeholder="Enter slider title"
                />
                
            </div>
            <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 w-full border p-2"
            placeholder="Enter slider description"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="mt-2"
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Upload Slider
        </button>
      </form>

      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
}

   
