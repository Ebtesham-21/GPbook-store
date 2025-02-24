import { NextResponse } from "next/server";
import {connectToDatabase} from "@/utils/db";
import Slider from "@/models/Slider";

export async function GET(request: Request, {params}: {params: {id: string}}) {
    const {id} = params;
    await connectToDatabase();
    try {
        const slider = await Slider.findById(id);
        if(!slider){
            return NextResponse.json({error: 'Slider not found'}, {status: 404});
        }
        return NextResponse.json(slider);
    } catch (error) {
        return NextResponse.json({error: 'Failed to get slider'}, {status: 500});
    }
}