"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface OrderForm {
    name: string;
    email: string;
    phone: string;
    address: string;
}

export default function OrderPage() {
    const router = useRouter();
    const [product, setProduct] = useState<{title: string; price: number}  | null  > (null);
    const [formData, setFormData] = useState<OrderForm>({name: "", email: "", phone: "", address: ""});
    const [message, setMessage] = useState("");

    useEffect(() => {
        const storedProduct = localStorage.getItem("selectedProduct");
        if (storedProduct) {
            setProduct(JSON.parse(storedProduct));
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!formData.name || !formData.email || !formData.phone || !formData.address) {
            setMessage("All fields are required");
            return;
    }

    setMessage("Order placed successfully");
    localStorage.removeItem("selectedProduct");
    setTimeout(() => {
        router.push("/");
    }, 2000);
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-md mt-12">
        <h2 className="text-3xl font-bold text-center mb-6">
            Finalize Your Order

        </h2>

        {product ? (
            <div className="mb-6 p-4 border rounded-md">
                <h3 className="text-xl font-semibold">{product.title}</h3>
                <p className="text-gray-700">Price: ${product.price.toFixed(2)}</p>


            </div>
        ) : (
            <p className="text-red-500 text-center">No product selected.</p>
        ) }


        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange = {handleChange}
                className="w-full p-3 border rounded-md"
            />

            <input 
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-md"
            />

            <input 
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border rounded-md"
            />

            <input 
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-3 border rounded-md"
            
            />


            {message && <p className="text-red-500">{message}</p>}

            <button type= "submit" className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 " >
                Place Order

            </button>

        </form>

    </div>
  );
}