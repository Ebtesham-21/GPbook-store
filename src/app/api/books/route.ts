import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Book from "@/models/Book";

export async function GET() {
    await connectDB();
    const books = await Book.find({});
    return NextResponse.json(books);
}


export async function POST(req: Request) {
    await connectDB();
    const book = await req.json();
    const newBook = await Book.create(book);
    return NextResponse.json(newBook, { status: 201 });
}