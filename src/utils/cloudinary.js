import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async function (localFilePath) {
    try {
        if (!localFilePath) return null;
        console.log('localFilePath: ', localFilePath);

        // upload file on cloudinary
        const file = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        // file has been successfully uploaded
        console.log("file has been upload on cloudinary", file.url);
        fs.unlinkSync(localFilePath)

        return file;

    } catch (error) {
        console.error('Failed to upload file:', error);

        fs.unlinkSync(localFilePath)
        return null;
    }
}

export { uploadOnCloudinary }