"use client";

import { useEffect, useState } from "react";

interface TopBook {
    _id: string;
    title: string;
    price: number;
    imageUrl: string;
    sales: number;
}


export default function AdminAnalytics() {
    const [topBooks, setTopBooks] = useState<TopBook[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTopBooks();
    }, []);

    const fetchTopBooks = async () => {
        try {
            const res = await fetch("/api/admin/top-books");
            const data = await res.json();
            setTopBooks(data.topBooks);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching top books:", error);
            setLoading(false);
        }
    };


    return (
        <div className="container mx-auto p-8">
            <h2 className="text-3xl font-bold mb-6">
                Analytics Dashboard
            </h2>

            {loading ? (
                <p>Loading Data...</p>
            ) : (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-2xl font-semibold mb-4">
                        Top-Selling Books

                    </h3>
                    <table className="w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-3">
                                    Image
                                </th>
                                <th className="border p-3">
                                    Title
                                </th>
                                <th className="border p-3">
                                    Price
                                </th>
                                <th className="border p-3">
                                    Sales
                                </th>
                            </tr>
                        </thead>
                        

                    </table>


                </div>
            ) }

        </div>
    )
}