import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

const verifyJWT = asyncHandler(async (req , res , next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer " , "")

        if(!token)
        {
            throw new ApiError(401 , "Unauthorized Request !!!")
        }

        const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if(!user)
        {
            throw new ApiError(401 , "Invalid Access !!!")
        }

        req.user = user

        next()
    } 
    catch (error) {
        throw new ApiError(401 , error?.message || "Invalid Access Token !!!")
    }
})


const verifyAdminJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.adminAccessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized Admin Request!");
        }

        const decodedToken = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );

        const admin = await User.findById(decodedToken?._id)
            .select("-password -refreshToken");

        if (!admin) {
            throw new ApiError(401, "Invalid Admin Access!");
        }

        if (admin.role !== "admin") {
            throw new ApiError(403, "Admin Access Required!");
        }

        req.user = admin;

        next();

    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }

        throw new ApiError(
            401,
            error?.message || "Invalid Admin Access Token!"
        );
    }
});


export {verifyJWT , verifyAdminJWT}