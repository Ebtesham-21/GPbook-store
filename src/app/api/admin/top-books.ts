import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Products";

export async function GET() {
    await connectDB();

    const salesData = await Order.aggregate([
        {$group: {_id: "$productId", totalSales: {$sum: 1}}},
        {$sort: {count: -1}},
        {$limit: 5}
    ]);

    const books = await Promise.all (
        salesData.map(async (sale) => {
            const book = await Product.findById(sale._id);
            return {
                ...book._doc, sales: sale.count
            };
        })
    );

    return NextResponse.json({ topBooks: books});
}