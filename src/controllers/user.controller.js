import {asyncHandler} from "../utils/AsyncHandler.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import mongoose from "mongoose"
import { User } from "../models/user.models.js"
import jwt from "jsonwebtoken"
import crypto from "crypto"

//for creating admin manually update one of the accounts in the mongo db atlas

/*
    logoutUser
refreshAccessToken
changePassword
getCurrentUser
updateProfile
updateAvatar
add/update/delete address
forgotPassword
resetPassword
role-based authorization middleware
*/

async function generateAccessandRefreshToken(userId) {
    try {
            const user = await User.findOne({
            _id : userId
        })

            const accessToken = await user.generateAccessToken()
            const refreshToken = await user.generateRefreshToken()

            user.refreshToken = refreshToken

            await user.save({validateBeforeSave : false}) // involves databse process

            return {accessToken , refreshToken}
    }
     catch (error) {
        throw new ApiError(500 , `Something went Wrong !!!   Error :- ${error}` )
    }

}

const userRegister = asyncHandler(async (req , res) => {
    //get user details from frontend
   //validation - not empty     
   //check if user already exist: username or email
   //check for images
   //check for avatar 
   //if there then upload to cloudinary
   //create user objects - creation of entry in db
   //remove password and refresh token field from response
   //check for user creation
   //return res

   const {username , email , password , fullName , phoneNumber , address} = req.body

   if(!username || username.trim() === "")
   {
    throw new ApiError(400 , "Username is required!!!")
   }

   if(!email || email.trim() === "")
   {
    throw new ApiError(400 , "Email is required!!!")
   }

   if(!password || password.trim() === "")
   {
    throw new ApiError(400 , "Password is required!!!")
   }

   if(!fullName || fullName.trim() === "")
   {
    throw new ApiError(400 , "Full Name is required!!!")
   }

   if(!phoneNumber || phoneNumber.trim() === "")
   {
    throw new ApiError(400 , "PhoneNumber is required!!!")
   }

   if(!address)
   {
    throw new ApiError(400 , "Address is required!!!")
   }

   const existedUser = await User.findOne({
    $or : [{username} , {email}]
   })

   if(existedUser)
   {
    throw new ApiError(409 , "User with the following username or email already exists !!!")
   }

   const avatarLocalFilePath = req.files?.avatar[0]?.path
   
   if(!avatarLocalFilePath)
   {
    throw new ApiError(400 , "Avatar file is Required !!!")
   }

   const avatar = await uploadOnCloudinary(avatarLocalFilePath)

   if(!avatar)
   {
    throw new ApiError(500 , "Image upload failed !!!")
   }

   const user = await User.create({
        username : username.toLowerCase(),
        email : email,
        password : password,
        fullName : fullName,
        avatar : avatar?.url,
        phoneNumber : phoneNumber,
        address : address,
        role : "user",
        isVerified : true
   })
   

   const createdUser = await User.findById(user?._id).select("-password -refreshToken")


   if(!createdUser)
   {
    throw new ApiError(500 , "Failed to Create User !!!")
   }

   return res
   .status(201)
   .json(
    new ApiResponse(
        200,
        createdUser,
        "User Created Successfully!!!"
    )
   )
})

const loginUser = asyncHandler(async (req , res) => {
    const {username , email , password} = req.body

    if(!(username || email))
    {
        throw new ApiError(400 , "Username or Email is required !!!")
    }

    if(!password)
    {
        throw new ApiError(400 , "Password is required !!!")
    }

    const user = await User.findOne({
        $or : [
            {
                username : username
            },
            {
                email : email,
            }
        ]
    })

    if(!user)
    {
        throw new ApiError(404 , "User Not Found !!!")
    }

    if(!(await user.isPasswordCorrect(password)))
    {
        throw new ApiError(401 , "Invalid Password !!!")
    }

    const {accessToken , refreshToken} = await generateAccessandRefreshToken(user?._id)

    const loggedInUser = await User.findById(user?._id).select("-password -refreshToken")

    const options = {
        httpOnly : true,
        secure : true
    }

    return res
    .status(200)
    .cookie("accessToken" , accessToken , options)
    .cookie("refreshToken" , refreshToken , options)
    .json(
        new ApiResponse(
            200,
            loggedInUser,
            "User Logged In Successfully !!!"
        )
    )

})

const logOutUser = asyncHandler(async (req , res) => {
    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set : {
                refreshToken : undefined
            }
        },
        {
            new : true
        }
    )

    const options = {
        httpOnly : true,
        secure : true
    }

    return res
    .status(200)
    .clearCookie("accessToken" , options)
    .clearCookie("refreshToken" , options)
    .json(
        new ApiResponse(
            200,
            {},
            "User Logged Out Successfully !!!!"
        )
    )
})

const refreshAccessToken = asyncHandler(async (req , res) => {
    
    const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken

    if(!incomingRefreshToken)
    {
        throw new ApiError(401 , "Refresh Token Missing !!!")
    }

    const decodedRefreshToken = jwt.verify(incomingRefreshToken , process.env.REFRESH_TOKEN_SECRET)

    if(!decodedRefreshToken)
    {
        throw new ApiError(401 , "Invalid Token !!!")
    }

    const user = await User.findById(decodedRefreshToken?._id).select("-password -refreshToken")

    if(!user)
    {
        throw new ApiError(404 , "Invalid RefreshToken User Doesnt Exist !!!")
    }

    if(user.refreshToken !== incomingRefreshToken)
    {
        throw new ApiError(401 , "Refresh Token Expired or Used !!!")
    }

    const {accessToken , refreshToken} = await generateAccessandRefreshToken(user._id)

    const options = {
        httpOnly : true,
        secure : true
    }

    return res
    .status(200)
    .cookie("accessToken" , accessToken , options)
    .cookie("refreshToken" , refreshToken , options)
    .json(
        new ApiResponse(
            200,
            user,
            "Access Token Refreshed Successfully !!! "
        )
    )


})

const getCurrentUser = asyncHandler(async (req , res) => { // gets the details of the currently logged in user
    const user = await User.findById(req.user?._id).select("-password -refreshToken")

    if(!user)
    {
        throw new ApiError(404 , "User Does not Exists !!!")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200 , 
            user,
            "Current User Fetched Successfully !!!"
        )
    )
})

const getUserById = asyncHandler(async (req , res) => {
//get any user from its id
    const user = await User.findById(req.params.id)

    if(!user)
    {
        throw new ApiError(404 , "No Such User Exists !!!")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user,
            "User Fetched Successfully !!!"
        )
    )
})

const updateProfile = asyncHandler(async(req , res) => {
    const {username , fullName , phoneNumber , address} = req.body

    const updateField = {} // for opyionally changing the fields of the user

    if(fullName)
    {
        updateField.fullName = fullName
    }

    if(username)
    {
        updateField.username = username
    }

    if(phoneNumber)
    {
        updateField.phoneNumber = phoneNumber
    }

    if(address)
    {
        updateField.address = address
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set : updateField
        },
        {
            new : true
        }
    )

    if(!user)
    {
        throw new ApiError(404 , "No Such User Exists !!!")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user,
            "User Profile Updated Successfully !!!"
        )
    )

})

const changePassword = asyncHandler(async (req ,  res) => {
    const {oldPassword , newPassword} = req.body

    if(!(oldPassword && newPassword))
    {
        throw new ApiError(400 , "Both Old and New Password are required !!!")
    }

    const user = await User.findById(req.user?._id)

    if(!user)
    {
        throw new ApiError(404 , "No Such User Exists !!!")
    }

    const validatePassword = await user.isPasswordCorrect(oldPassword)

    if(!validatePassword)
    {
        throw new ApiError(400 , "Invalid Old Password !!!")
    }

    user.password = newPassword
    await user.save({validateBeforeSave : false})

    const updatedUser = await User.findById(req.user?._id).select("-password -refreshToken")

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            updatedUser,
            "Password changed Successfully !!!"
        )
    )

})

const forgotPassword = asyncHandler(async (req , res) => {
    const {email} = req.body

    if(!email)
    {
        throw new ApiError(400 , "Email is Required !!!")
    }

    const user = await User.findOne({
        email : email
    })

    if(!user)
    {
        throw new ApiError(404 , "No Such User Exists !!!")
    }

    const resetToken = crypto.randomBytes(32).toString("hex")

    console.log(resetToken);

    user.passwordResetToken = resetToken
    user.passwordResetExpiry = Date.now() + 10 * 60 * 1000

    await user.save({validateBeforeSave : false})

    // const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                resetToken // only for dev
            },
            "Reset Token Generated Successfully !!!"
        )
    )

})

const resetPassword = asyncHandler(async (req , res) => {

    const {token , newPassword} = req.body

    if(!(token && newPassword))
    {
        throw new ApiError(400 , "Both Token and Password are Required!!!")
    }

    const user = await User.findOne({
        passwordResetToken : token,
        passwordResetExpiry : {
            $gt : Date.now()
        }
    })

    if(!user)
    {
        throw new ApiError(404 , "User Not Found !!!")
    }

    user.password = newPassword // password changed

    user.passwordResetToken = undefined
    user.passwordResetExpiry = undefined

    await user.save()

    const updatedUser = await User.findById(user?._id).select("-password -refreshToken")

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            updatedUser,
            "Password reset Successfull !!!"
        )
    )

})

const addAddress = asyncHandler(async (req , res) => {

    const {street , city , state , country , pincode} = req.body
    

    if(!street?.trim())
    {
        throw new ApiError(400 , "Street needs to be mentioned !!!")
    }

    if(!city?.trim())
    {
        throw new ApiError(400 , "City needs to be mentioned !!!")
    }

    if(!state?.trim())
    {
        throw new ApiError(400 , "State needs to be mentioned !!!")
    }

    if(!country?.trim())
    {
        throw new ApiError(400 , "Country needs to be mentioned !!!")
    }

    if(!pincode?.trim())
    {
        throw new ApiError(400 , "Pincode needs to be mentioned !!!")
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $push: {
                address: {
                    street,
                    city,
                    state,
                    country,
                    pincode,
                    isDefault: false
                }
            }
        },
        { new: true }
    ).select("-password -refreshToken")

    if(!user)
    {
        throw new ApiError(404 , "No Such User Exists !!!")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user,
            "New Password Added Successfully !!!"
        )
    )
    
})

const setDefault = asyncHandler(async(req , res) => {

    const userId = req.user?._id
    const {addressId} = req.params

    if(!addressId)
    {
        throw new ApiError(400 , "No Address Id !!!")
    }

    const user = await User.findOne({
        _id : userId
    })

    if(!user)
    {
        throw new ApiError(404 , "No Such User Exists !!!")
    }

    // const selectedAddress = await User.findOne({
    //     _id : userId,
    //     "address._id" : addressId
    // })  wrong

    const selectedAddress = user.address.id(addressId)

    if(!selectedAddress)
    {
        throw new ApiError(404 , "No Such Address Exists")
    }
    

    user.address.forEach(addr => {
        addr.isDefault = false
    })

    selectedAddress.isDefault = true

    await user.save({validateBeforeSave : false})

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user,
            "Address changed to Default Successfully !!!"
        )
    )
})

const getAddress = asyncHandler(async(req , res) => {
    const userId = req.user?._id

    const user = await User.findById(userId)

    if(!user)
    {
        throw new ApiError(404 , "No Such User Exists !!!")
    }

    const requiredAdress = user.address

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            requiredAdress,
            "Address fetched Successfully !!!"
        )
    )
})

const updateAddress = asyncHandler(async (req , res) => {
    const userId = req.user?._id

    const {addressId} = req.params

    const {street , city , state , country , pincode} = req.body

    const updateField  = {}

    if(street?.trim())
    {
        updateField["address.$.street"] = street
    }

    if(city?.trim())
    {
        updateField["address.$.city"] = city
    }

    if(state?.trim())
    {
        updateField["address.$.state"] = state
    }

    if(country?.trim())
    {
        updateField["address.$.country"] = country
    }

    if(pincode?.trim())
    {
        updateField["address.$.pincode"] = pincode
    }

    const updatedAddress = await User.findOneAndUpdate(
        {
            _id : userId,
            "address._id" : addressId
        },

        {
            $set : updateField
        },

        {
            new : true
        }
    )

    if(!updatedAddress)
    {
        throw new ApiError(404 , "No Such Value Exists !!!")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            updatedAddress,
            "Address Updated Successfully !!!"
        )
    )
})

const deleteAddress = asyncHandler(async(req , res) => {

    const userId = req.user?._id

    const {addressId} = req.params

    if(!addressId)
    {
        throw new ApiError(400 , "Invalid Address Id!!!")
    }

    // const deletedAddress = await User.findOneAndDelete( // wrong because removes the entire user document wherever the condition matches
    //for nested array of objects use $pull
    //     {
    //         _id : userId,
    //         "address._id" : addressId
    //     }
    // )

    const deletedAddress = await User.findByIdAndUpdate(
        userId,
        {
            $pull: {
                address: { _id: addressId }
            }
        },

        {
            new : true
        }
    )

    if(!deletedAddress)
    {
        throw new ApiError(404 , "No Such Value Exists !!!")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Address deleted Successfully !!!"
        )
    )
})




export {
    userRegister,
    loginUser,
    logOutUser,
    refreshAccessToken,
    getCurrentUser,
    getUserById,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    addAddress,
    setDefault,
    getAddress,
    updateAddress,
    deleteAddress
}

