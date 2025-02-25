import { NextResponse } from "next/server";
import connectDB from "@/utiils/db";
import Slider from "@/models/Slider";
import { uploadImageToCloudinary } from "@/utiils/cloudinary";

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

export async function GET() {
    try {
        await connectDB();
        const sliders = await Slider.find();
        return NextResponse.json({sliders});
    } catch (error) {
        return NextResponse.json({error: "Error fetching sliders"}, {status: 500});
    }
}

export async function PUT(request: Request) {
    const {_id, title, description, imageUrl} = await request.json();

    try {
        await connectDB();

        const slider = await Slider.findById(_id);
      
        if(!slider) {
            return NextResponse.json({error: "Slider not found"}, {status: 404});
        }

        slider.title = title;
        slider.description = description;
        slider.imageUrl = imageUrl;

        await slider.save();


        return NextResponse.json({message: 'Slider updated successfully', slider});

    } catch (error) {
        return NextResponse.json({error: 'Error updating slider'}, {status: 500});
    }
}


export async function DELETE(request: Request) {
    const { id } = request.nextUrl?.pathname.split('/').pop() || {};

    if(!id) {
        return NextResponse.json({error: 'Slider ID is required'}, {status: 400});
    }

    try {
        await connectDB();

        const slider = await Slider.findById(id);

        if(!slider) {
            return NextResponse.json({error: 'Slider not found'}, {status: 404});
        }

        if(slider.publicId) {
            await uploadImageToCloudinary.v2.uploader.destroy(slider.PublicId);
        }

        await slider.remove();

        return NextResponse.json({message: "Slider deleted successfully"});

    } catch (error) {
        return NextResponse.json({error: 'Error deleting slider'}, {status: 500});
    }
}

