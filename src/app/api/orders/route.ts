import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";


export async function POST(req: Request) {
    await connectDB();
    const body = await req.json();
    const newOrder = await Order.create(body);
    return NextResponse.json(newOrder, { status: 201 });
}

export async function GET() {
    await connectDB();
    const orders = await Order.find({});
    return NextResponse.json(orders);
}