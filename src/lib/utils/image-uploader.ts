import cloudinary from './cloudinary';

export async function uploadImage(path: string) {
    if (path.includes("cloudinary")) return path;
    try {
        const cloudinaryResponse = await cloudinary.uploader.upload(path, {
            format: 'webp'
        });
        return cloudinaryResponse.secure_url;
    } catch (error) {
        console.log('error uploading image', error);
        throw error;
    }
}
