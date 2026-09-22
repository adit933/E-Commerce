// createReview
// getProductReviews
// getReviewById
// updateReview
// deleteReview

import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.models.js";
import { Review } from "../models/review.models.js";

const createReview = asyncHandler(async(req , res) => {
    
    const userId = req.user?._id

    const {rating , comment} = req.body

    const {productId} = req.params

    const product = await Product.findById(productId)

    if(!product)
    {
        throw new ApiError(404 , "No Such Product Exists !!!")
    }

    const numericRating = Number(rating)

    if(!Number.isInteger(numericRating) || (numericRating > 5 || numericRating < 1))
    {
        throw new ApiError(401 , "Invalid Review !!!")
    }

    const create_review = await Review.create({
        user : userId,
        product : productId,
        rating : numericRating,
        comment : comment
    })

    if(!create_review)
    {
        throw new ApiError(400 , "Review Not Created !!!")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(
            201,
            create_review,
            "Review created Successfully !!!"
        )
    )
})

const getProductReviews = asyncHandler(async(req , res) => {
    
    const {productId} = req.params

    if(!productId)
    {
        throw new ApiError(404 , "Product Not Found !!!")
    }

    const reviews = await Review.find({
        product : productId
    }).populate("user")

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            reviews,
            (reviews.length === 0) ? "No Reviews Exist !!!" : "The following are the Reviews !!!"
        )
    )
})

const updateReview = asyncHandler(async(req , res) => {

    const userId = req.user?._id
    const {productId} = req.params

    const {rating , comment} = req.body

    if(!productId)
    {
        throw new ApiError(400 , "Invalid Product Id !!!")
    }

    const product = await Product.findById(productId)

    if(!product)
    {
        throw new ApiError(400 , "No Such Product Exists !!!")
    }

    const numericRating = Number(rating)

    if(!Number.isInteger(numericRating) || (numericRating > 5 || numericRating < 1))
    {
        throw new ApiError(401 , "Invalid Review !!!")
    }

    const review = await Review.findOne({
        user : userId,
        product : productId
    })

    if(!review)
    {
        throw new ApiError(400 , "No Such Review Exists !!!")
    }

    review.rating = numericRating
    review.comment = comment

    await review.save()

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            review,
            "Review Updated Successfully !!!"
        )
    )
})

const deleteReview = asyncHandler(async(req , res) => {

    const userId = req.user?._id
    const {productId} = req.params

    if(!productId)
    {
        throw new ApiError(400 , "Invalid ProductId !!!")
    }

    const product = await Product.findById(productId)

    if(!product)
    {
        throw new ApiError(404 , "No Such Product Exists !!!")
    }

    const deleted_product = await Review.findOneAndDelete({
        user : userId,
        product : productId
    })

    if(!deleted_product)
    {
        throw new ApiError(404 , "No Such Product Exists !!!")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            deleted_product,
            "Product Deleted Successfully !!!"
        )
    )
})

export {
    createReview,
    getProductReviews,
    updateReview,
    deleteReview
}