import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(req: Request) {
    await connectDB();
    const { name, email, phone, address, productId} = await req.json();

    if(!name || !email || !phone || !address || !productId) {
        return NextResponse.json({error: 'All fields are required'}, {status: 400});
    }

    const newOrder = new Order ({name, email, phone, address, productId});
    await newOrder.save();

    return NextResponse.json({message: 'Order placed successfully'});
}