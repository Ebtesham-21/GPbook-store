import { NextResponse } from "next/server";
import connectDB from "@/utiils/db";
import Slider from "@/models/Slider";

export async function POST(req: Request){
    const {title, description, imageUrl} = await req.json();
    await connectDB();

    try {
        const newSlider = new Slider ({
            imageUrl,
            title,
            description,
        });

        await newSlider.save();

        return NextResponse.json({message: "Slider updated successfully"});
    } catch (error) {
        console.error('Error saving slider to database:', error);
        return NextResponse.json({ error: 'Failed to add slider' }, { status: 500 });
    }
}