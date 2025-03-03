"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Book {
    _id: string;
    title: string;
    price: number;
    imageUrl: string;
}

export default function LatestAddition() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const res = await fetch("/api/admin/products");
            const data = await res.json();
            setBooks(data.products);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching books:", error);
            setLoading(false);
        }
    };

    return (
        <div className="w-full px-6 md:px-20 py-8 my-12 bg-[#FFEED6] flex flex-col items-center relative " >
            {/* bg shape */}
            <div className="absolute bottom-0 w-full h-1/2 bg-[#DE3D3A] rounded-3xl z-0 mx-auto max-w[calc(100%-40px)] md:max-w-[calc(100%-164px)]"/>

            {/* title */}
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-8   " ></h2>

        </div>
    )
}