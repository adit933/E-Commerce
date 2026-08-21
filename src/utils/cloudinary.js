import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"


// console.log(process.env.CLOUDINARY_CLOUD_NAME);
// console.log(process.env.CLOUDINARY_API_KEY);
// console.log(process.env.CLOUDINARY_API_SECRET);

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log(cloudinary.config());


const uploadOnCloudinary = async(localFilePath) => {

    if(!localFilePath) return null

    try {
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type : "auto"
        })

        console.log("File Uploaded Successfully : ",response.url);
        return response

        //once succesfully uploaded then unlink it later
    } 
    catch (error) {
        console.log(error);
        fs.unlinkSync(localFilePath)
        // process.exit(1) dangerous beacuse it will stop the server with upload failure

        return null
    }
}

export { uploadOnCloudinary }
