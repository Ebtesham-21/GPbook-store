import cloudinary from 'cloudinary';
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const uploadImageToCloudinary = async (file: Express.Multer.File) => {
    try {
        const result = await cloudinary.v2.uploader.upload(file.path);
        return {imageUrl: result.secure.url, publicId: result.public.id};
    } catch (error) {
        throw new Error("Error uploading image");
    }
};

export const deleteImageFromCloudinary = async (publicId: string) => {
    try {
        await cloudinary.v2.uploader.destroy(publicId);
    } catch (error) {
        throw new Error("error deleting image from cloudinary");
    }
};