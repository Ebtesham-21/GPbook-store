import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import nextConnect from "next-connect";
import { uploadImageToCloudinary } from "@/utiils/cloudinary";
import { connectDB } from "@/utiils/db";
import Slider from "@/models/Slider";


const upload = multer({ dest: "uploads/" });

const handler = nextConnect();

handler.use(upload.single("image"));

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await connectDB();
        const imageUrl = await uploadImageToCloudinary(req.file);
        const newSlider = new Slider({
            imageUrl,
            title: req.body.title,
            description: req.body.description,
        });

        await newSlider.save();

        res.status(200).json({ message: "Slider updated successfully", slider: newSlider });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error updating slider" });
    }
});

export default handler;