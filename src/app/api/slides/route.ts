import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Slider from "@/models/Slider";
import mongoose from "mongoose";
import { describe } from "node:test";

const slideSchema = new mongoose.Schema({
    inmageUrl: String,
    title: String,
    description: String,
});

const Slide = mongoose.models.Slide || mongoose.model('Slide', slideSchema);

export async function GET() {
    try {
        await connectDB();
        const slides = await Slider.find({});

        return NextResponse.json(slides);
    } catch (error) {
        console.log("error ffetching slides",error);
        return NextResponse.json({error: "error fetching slides"}, {status: 500});
    }
}