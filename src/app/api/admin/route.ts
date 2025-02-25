import { NextResponse } from "next/server";
import connectDB from "@/utiils/db";
import Slider from "@/models/Slider";

export async function GET() {
    try {
        await connectDB();
        const sliders = await Slider.find({});
        return NextResponse.json({sliders}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: 'Error fetching sliders'}, {status: 500});
    }
}


export async function POST(req: Request) {
    try {
        await connectDB();
        const {title, description, imageUrl} = await req.json();

        if(!title || !description || !imageUrl) {
            return NextResponse.json({error: 'All fields are required'}, {status: 400});
        }

        const newSlider = new Slider ({
            title, description, imageUrl});

        await newSlider.save();
        
        return NextResponse.json({message: 'Slider created successfully', slider: newSlider}, {status: 201});

    } catch (error) {
        return NextResponse.json({error: 'Error creating slider'}, {status: 500});
    }
}