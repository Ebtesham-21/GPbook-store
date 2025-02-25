import { NextResponse } from "next/server";
import connectToDatabase from "@/utiils/db";
import Slider from "@/models/Slider";
import { deleteImageFromCloudinary, uploadImageToCloudinary } from "@/utiils/cloudinary";

async function connectToDB() {
    await connectToDatabase();
}

// GET request
export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params; // ✅ FIXED: No need to await params

    try {
        await connectToDB();
        const slider = await Slider.findById(id);
        if (!slider) {
            return NextResponse.json({ error: "Slider not found" }, { status: 404 });
        }
        return NextResponse.json(slider);
    } catch (error) {
        return NextResponse.json({ error: "Error fetching slider" }, { status: 500 });
    }
}

// PUT request (Update slider)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const { title, description, imageUrl } = await request.json();

    try {
        await connectToDB();
        const slider = await Slider.findById(id);
        if (!slider) {
            return NextResponse.json({ error: "Slider not found" }, { status: 404 });
        }

        // Check if the image was updated
        if (imageUrl && imageUrl !== slider.imageUrl) {
            if (slider.publicId) {
                await deleteImageFromCloudinary(slider.publicId); // ✅ FIXED: Proper deletion function
            }
        }

        // Update slider data
        slider.title = title;
        slider.description = description;
        slider.imageUrl = imageUrl;

        await slider.save();
        return NextResponse.json({ message: "Slider updated successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Error updating slider" }, { status: 500 });
    }
}

// DELETE request
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        await connectToDB();
        const slider = await Slider.findById(id);
        if (!slider) {
            return NextResponse.json({ error: "Slider not found" }, { status: 404 });
        }

        // Delete image from Cloudinary if exists
        if (slider.publicId) {
            await deleteImageFromCloudinary(slider.publicId); // ✅ FIXED: Proper deletion
        }

        // Remove slider from database
        await Slider.deleteOne({ _id: id }); // ✅ FIXED: `deleteOne()` is used instead of `remove()`
        
        return NextResponse.json({ message: "Slider deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Error deleting slider" }, { status: 500 });
    }
}
