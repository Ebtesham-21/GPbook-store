import { NextResponse } from "next/server";
import connectDB from "@/utiils/db";
import Product from "@/models/Products";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const { title, price, imageUrl } = await req.json();
  
  const updatedProduct = await Product.findByIdAndUpdate(params.id, { title, price, imageUrl }, { new: true });

  if (!updatedProduct) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Product updated successfully" }, { status: 200 });
}


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    await connectDB();
    const deletedProduct = await Product.findByIdAndDelete(params.id);
  
    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
  
    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  }
  