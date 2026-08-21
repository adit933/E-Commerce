import { Cart } from "../models/cart.models.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import mongoose from "mongoose";
import { Product } from "../models/product.models.js";


const addToCart = asyncHandler(async(req, res) => {

    const userId = req.user?._id
    const {productId , quantity} = req.body

    if(!mongoose.Types.ObjectId.isValid(productId))
    {
        throw new ApiError(400 , "Invalid Product Selected !!!")
    }

    const product = await Product.findById(productId)

    if(!product)
    {
        throw new ApiError(404 , "No Such Product Exists !!!")
    }

    const price = product.price

    const existingCart = await Cart.findOne({
        user : userId
    })

    if(quantity == null)
    {
        throw new ApiError(400 , "Invalid Quantity !!!")
    }
    
    if(price == null)
    {
        throw new ApiError(400 , "Invalid Price !!!")
    }

    const numericQuantity = Number(quantity)
    const numericPrice = Number(price)

    if(isNaN(numericQuantity))
    {
        throw new ApiError(400 , "Invalid Quantity Input !!!")
    }

    if(numericQuantity <= 0)
    {
        throw new ApiError(400 , "Quantity cannot be Negative !!! ")
    }

    if(isNaN(numericPrice))
    {
        throw new ApiError(400 , "Price cannot be Negative !!!")
    }

    if(numericPrice < 0)
    {
        throw new ApiError(400 , "Price cannot be Negative !!! ")
    }

    let cart = await Cart.findOne({user : userId})

    if(!existingCart)
    {
        cart = await Cart.create({
            user : userId,
            items : [{
                product : productId,
                quantity : numericQuantity,
                price : numericPrice
            }]
        })
    }
    else
    {
         cart.items.push({
            product : productId,
            quantity : numericQuantity,
            price : numericPrice
        }) 

        await cart.save({validateBeforeSave : false})
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            cart,
            "Cart Created Successfully !!!"
        )
    )
})

const getCart = asyncHandler(async(req , res) => {

    const userId = req.user?._id

    // if(!mongoose.Types.ObjectId.isValid(cartId))
    // {
    //     throw new ApiError(400 , "Invalid object Id !!!")
    // }

    const currentCart = await Cart.findOne(
    {
        user : userId
    }
    ).populate("items.product")

    if(!currentCart)
    {
        throw new ApiError(404 , "Cart does Not exists !!! ")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            currentCart,
            "Cart fetched Successfully !!! "
        )
    )
})

const updateCartItem = asyncHandler(async(req , res) => {
    const {quantity} = req.body
    const userId = req.user?._id
    const {itemId} = req.params

    if(!mongoose.Types.ObjectId.isValid(itemId))
    {
        throw new ApiError(400 , "Not a valid Item !!!")
    }

    if(quantity === undefined)
    {
        throw new ApiError(400 , "Quantity should be provided !!! ")
    }

    const numericQuantity = Number(quantity)

    if(isNaN(numericQuantity))
    {
        throw new ApiError(400 , "Enter a Valid quantity")
    }

    if(numericQuantity < 0)
    {
        throw new ApiError(400 , "Quantity cannot be negative !!!")
    }

    const updatedCart = await Cart.findOneAndUpdate(
        {
            user : userId,
            "items._id" : itemId
        },
        {
            $set : {
                "items.$.quantity" : numericQuantity
            }
        },
        {
            new : true
        }
    )

    if(!updatedCart)
    {
        throw new ApiError(404 , "Cart Not Found !!!")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            updatedCart,
            "Cart Updated Successfully !!!"
        )
    )
})

const removeFromCart = asyncHandler(async(req , res) => {
  
    const userId = req.user?._id
    const {itemId} = req.params

    if(!mongoose.Types.ObjectId.isValid(itemId))
    {
        throw new ApiError(400 , "Not a valid Item !!!")
    }

    const removedItem = await Cart.findOneAndUpdate(
        {
            user : userId,
            "items._id" : itemId
        },
        {
            $pull : {
                items : {
                    _id : itemId
                }
            }
        },
        {
            new : true
        }
    )

    if(!removedItem)
    {
        throw new ApiError(404 , "The following item does not exist in the cart")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            removedItem,
            "Item removed Successfully from the cart !!!"
        )
    )
    
})

const removeCart = asyncHandler(async(req , res) => {

    const userId = req.user?._id
    
    const removedCart = await Cart.findOneAndDelete({
        user : userId
    })

    if(!removedCart)
    {
        throw new ApiError(404 , "The following cart does not exists !!! ")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            removedCart,
            "Cart removed Successfully !!!"
        )
    )

})

export {
    addToCart,
    getCart,
    updateCartItem,
    removeFromCart,
    removeCart
}

