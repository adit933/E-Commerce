/* 

wishlistController.js

├── addToWishlist()
├── removeFromWishlist()
├── getWishlist()
├── clearWishlist()
└── checkWishlist() 

*/

import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { Product } from "../models/product.models.js";
import { WishList } from "../models/wishlist.models.js";

const addToWishlist = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const { productId } = req.params;

  const existing_product = await Product.findOne({
    _id : productId,
  });

  if (!existing_product) {
    throw new ApiError(404, "No Such Product Exists !!!");
  }

  const existing_wishlist = await WishList.findOne({
    $and: [
      {
        user: userId,
      },

      {
        product: productId,
      },
    ],
  });

  if (existing_wishlist) {
    throw new ApiError(409, "Your wishList already Exists !!!");
  }

  const createdWishList = await WishList.create({
    user: userId,
    product: productId,
  });

  if (!createdWishList) {
    throw new ApiError(500, "Unable to Create Your WishList !!!");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        createdWishList,
        "wishList created Successfully !!!",
      ),
    );
});

const removeFromWishlist = asyncHandler(async(req , res) => {
    
    const userId = req.user?._id

    const {productId} = req.params

    const product = await Product.findById(productId)

    if(!product)
    {
        throw new ApiError(404 , "No Such Product Exists !!!")
    }

    const wishList = await WishList.findOneAndDelete({
        user : userId,
        product : productId
    })

    if(!wishList)
    {
        throw new ApiError(404 , "No such WishList exists !!!")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            wishList,
            "WishList Deleted Successfully !!!"
        )
    )
})


const getWishlist = asyncHandler(async(req , res) => {

    const userId = req.user?._id

    const fetched_wishList = await WishList.find({
        user : userId
    }).populate("product")

    let message = ""

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            fetched_wishList,
            (fetched_wishList.length === 0) ? "Currently Empty !!! " : "Wishlist Fetched Successfully !!!"
        )
    )
})

const clearWishList = asyncHandler(async(req , res) => {

    const userId = req.user?._id;

    const wishlist = await WishList.deleteMany({
        user : userId
    })

    if(!wishlist)
    {
        throw new ApiError(404 , "No wishList Found !!!")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            wishlist,
            "WishList Removed Successfully !!!"
        )
    )
})

const checkWishList = asyncHandler(async(req , res) => {
    
    const userId = req.user?._id

    const {productId} = req.params

    const product = await Product.findById(productId)

    if(!product)
    {
        throw new ApiError(404 , "No Such Product Exists !!!")
    }

    const required_product = await WishList.findOne({
        user : userId,
        product : productId
    })

    let checkedWishList = false

    if(required_product)
    {
        checkedWishList = true
    }
    else
    {
        checkedWishList = false
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            checkedWishList,
            (checkedWishList) ? "Product present in the wishList" : "Product absent in the wishList"
        )
    )
})

export {
    addToWishlist,
    removeFromWishlist,
    getWishlist,
    clearWishList,
    checkWishList
}