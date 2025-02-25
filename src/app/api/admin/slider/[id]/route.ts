import { NextResponse } from "next/server";
import connectToDatabase from "@/utiils/db";
import Slider from "@/models/Slider";
import {deleteImageFromCloudinary, uploadImageToCloudinary} from "@/utiils/cloudinary";

async function connectToDB() {
    await connectToDatabase();
}

export async function GET(request: Request, {params}: {params: {id: string}}) {
    const {id} = await params;

    try {
        await connectToDB();
        const slider = await Slider.findById(id);
        if(!slider) {
            return NextResponse.json({error: 'Slider not found'}, {status: 404});
        }
        return NextResponse.json(slider);
    } catch (error) {
        return NextResponse.json({error: 'Error fetching slider'}, {status: 500});
    }
}



// put request

export async function PUT(request: Request, {params}: {params: {id: string}}) {
    const {id} = params;
    const {title, description, imageUrl} = await request.json();

    try {
        await connectToDB();
        const slider = await Slider.findById(id);
        if(!slider) {
            return NextResponse.json({error: 'Slider not found'}, {status: 404});
        }

        if(imageUrl && imageUrl !== slider.imageUrl) {
            await uploadImageToCloudinary.v2.uploader.destroy(slider.PublicId);
        }

        slider.title = title;
        slider.description = description;
        slider.imageUrl = imageUrl;

        await slider.save();

        return NextResponse.json({message: 'Slider updated successfully'});
    } catch (error) {
        return NextResponse.json({error: 'Error updating slider'}, {status: 500});
    }
}

export async function DELETE(request: Request, {params}: {params: {id: string}}) {
    const {id} = params;

    try {
        await connectToDB();
        const slider = await Slider.findById(id);
        if(!slider) {
            return NextResponse.json({error: 'Slider not found'}, {status: 404});
        }

        if(slider.publicId) {
            await deleteImageFromCloudinary(slider.publicId);
        }

        await slider.remove();

        
        return NextResponse.json({message: 'Slider deleted successfully'});
        
    } catch (error) {
        return NextResponse.json({error: 'Error deleting slider'}, {status: 500});
    }
}


