"use client";

import {useEffect, useState} from "react";

interface Slider {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
}

export default function AdminPage() {
    const [sliders, setSliders] = useState<Slider[]>([]);
    const [message, setMessage] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [imageUrl, setImage] = useState<File | null>(null);

    useEffect(() => {
        const fetchSliders = async () => {
            try {
                const res = await fetch ("/api/admin/slider");
                if(!res.ok)
                    throw new Error('Failed fetching sliders');
                const data = await res.json();
                setSliders(data.sliders);
            } catch (error) {
                console.log("error fetching sliders: ", error);
            }
        };
        fetchSliders();
    }, []);


    const handleDelete = async (id: string) => {
        const response = await fetch(`/api/admin/slider/${id}`, {
            method: 'DELETE',
        });

        if(response.ok) {
            setMessage('Slider deleted successfully');
            setSliders(sliders.filter(slider => slider._id !== id));
        } else {
            setMessage("failed to delete slider");
        }


    };

    const handleEdit = {id: string} => {
        console.log(`Edit slider with ID: ${id}`);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!image || !title || !description) {
            setMessage('All fields are required');
            return;
        }

        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "bookstore_uploads");
        formData.append("cloud_name", "dpiy18xkg");

        try {
            const cloudRes = await fetch("https://api.cloudinary.com/v1_1/dpiy18xkg/image/upload", {
                method: 'POST',
                body: formData,
            });

        const cloudData = await cloudRes.json();
        const imageUrl = cloudData.secure_url;

        const response = await fetch("/api/admin/slider", {
            method: "POST",
            body: JSON.stringify({title, description, imageUrl}),
            headers: {
                "Content-Type" : "application/json",

            },

        
        });

        const result = await response.json();
        if(response.ok) {
            setMessage("Slider created successfully");
            setSliders([...sliders, result.slider]);
        } else {
            setMessage(result.error || "Failed to add slider");
        }
    } catch (error) {
        setMessage("Error uploading image");
    }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            setImage(e.target.files[0]);
        }
    };


    return (
        <div className="container mx-auto p-8">
           <h1 className="text-2xl mb-4">
                Admin Panel - Manage Sliders
           </h1>
           
           
         {/* new slider form */}
        <form onSubmit={handleSubmit} className="mb-6 border p-4">
            <h2 className="text-xl mb-2">
                Add New Slider
            </h2>
            <input
                type="text"
                value={title}
                onChange = { (e) => setTitle(e.target.value)}
                placeholder="Title"
                className="block w-full border p-2 mb-2"
            />

            <textarea
                value={description}
                onChange = {(e) => setDescription(e.target.value)}
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
                    
                </div>
            ))}

        </div>
        </div>
    )


}