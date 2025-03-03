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
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-8  text-center text-red-600 z-10 ">
                Our Latest Additions
            </h2>


            {/* loading state   */}
            
            {loading ? (
                <p className="text-gray-500 text-lg z-10"  >Loading Books ...</p>
            ) : books.length === 0 ? (
                <p className="text-gray-500 text-lg z-10"  >No books found.</p>
            ) : (
                <div className="grid gird-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 z-10">
                    {books.map((book) => (
                        <div key={book._id} className="relative rounded-lg p-6 flex flex-col items-center text-center">
                            <div className="relative w-full h-80 md:h-[400px] md:w-[400px] mb-4">
                                <Image 
                                    src={book.imageUrl}
                                    alt={book.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-md"
                                />


                            </div>

                            <h3 className="text-lg font-semibold mb-2">
                                {book.title}
                            </h3>

                            <p className="text-gray-700 mb-4">
                                ${book.price.toFixed(2)}
                            </p>

                            <button className="bg-[#FFEED6] hover:bg-[#F7B86D] text-black font-bold py-3 px-6 md:py-4 md:px-12 rounded-full transition duration-300 ">
                                Add to Cart

                            </button>
                        </div>
                    ))}


                </div>
            ) }

         
        </div>
    );
}