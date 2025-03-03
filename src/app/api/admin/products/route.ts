import { NextResponse } from "next/server";
import connectDB from "@/utiils/db";
import Product from "@/models/Products";

export async function GET() {
  await connectDB();
  const products = await Product.find();
  return NextResponse.json({ products }, { status: 200 });
}

export async function POST(req: Request) {
    await connectDB();
    const { title, price, imageUrl } = await req.json();
  
    if (!title || !price || !imageUrl) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
  
    const newProduct = new Product({ title, price, imageUrl });
    await newProduct.save();
    return NextResponse.json({ message: "Product added successfully" }, { status: 201 });
  }
  
