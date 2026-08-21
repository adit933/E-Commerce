import { Product } from "./product.controller.js"
import { asyncHandler } from "../utils/AsyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js" 
import { Payment } from "../models/payment.models.js"
import mongoose from "mongoose"
import { Order } from "../models/order.models.js"
import crypto from "crypto"


const createPayment = asyncHandler(async(req , res) => {

    const userId = req.user?._id
    const {orderId} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(orderId))
    {
        throw new ApiError(400 , "Invalid Order ID")
    }

    const order = await Order.findById(orderId)

    if(!order)
    {
        throw new ApiError(404 , "No such Order Exists !!!")
    }

    if(order.orderStatus === "Cancelled")
    {
        throw new ApiError(400 , "Order Cancelled cannot generate Payment !!!")
    }

    if(userId.toString() !== order.user.toString())
    {
        throw new ApiError(400, "Unauthorized to Generate Payment !!!")
    }

    const existingPayment = await Payment.findOne({
        order : orderId
    })

    if(existingPayment)
    {
        throw new ApiError(400 , "Payment already Exists !!! ")
    }

    const paymentId = `PAY_${crypto.randomUUID()}`

    const amount = order.totalPrice

    const method = order.paymentMethod

    const status = method === "COD" ? "pending" : "completed"

    const payment = await Payment.create({
        user : userId,
        order : orderId,
        paymentID : paymentId,
        amount : amount,
        method : method
    })

    if(!payment)
    {
        throw new ApiError(400 , "Failed to create Payment !!! ")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            payment,
            "Successfully created the payment !!! "
        )
    )
})


const getMyPayment = asyncHandler(async(req , res) => {
    const userId = req.user?._id

    const payment = await Payment.find(
        {
            user : userId
        }
    )

    if(payment.length === 0)
    {
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                payment,
                "No Payment record Exists  !!!"
            )
        )
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            payment,
            "Payment Details Fetched Successfully !!!"
        )
    )
})

const getPaymentById = asyncHandler(async(req , res) => {

    const {orderId} = req.params

    if(!mongoose.Types.ObjectId.isValid(orderId))
    {
        throw new ApiError(400 , "Invalid Order ID")
    }

    const order = await Order.findById(orderId)

    if(!order)
    {
        throw new ApiError(404 , "No such Order Exists !!!")
    }

    const myPayment = await Payment.findOne(
        {
            order : orderId
        }
    )

    if(!myPayment)
    {
        throw new ApiError(404 , "No Such Payment Exists !!!")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            myPayment,
            "Payment Fetched Successfully !!!"
        )
    )
    
})

const markPaymentCompleted = asyncHandler(async(req , res) => {
    const {orderId} = req.params
    const {paymentId} = req.params

    if(!mongoose.Types.ObjectId.isValid(orderId))
    {
        throw new ApiError(400 , "Invalid Order ID")
    }

    const order = await Order.findById(orderId)

    if(!order)
    {
        throw new ApiError(404 , "No such Order Exists !!!")
    }

    if(!mongoose.Types.ObjectId.isValid(paymentId))
    {
        throw new ApiError(400 , "Invalid Payment ID")
    }

    const payment = await Payment.findOne({ // O-A & P-A && O-B & P-B  user selects O-A & P-B both exists but inconsistent 
        // so payment corresponding to that particluar order should exist
        _id : paymentId,
        order : orderId
    })

    if(!payment)
    {
        throw new ApiError(404 , "No such Payment Exists !!!")
    }

    if(order.isPaid === true || payment.status === "completed")
    {
        throw new ApiError(400 , "Order already Paid !!! ")
    }

    if(order.paymentMethod === "UPI" || order.paymentMethod === "Net Banking" || order.paymentMethod === "Credit Card" ||
            order.paymentMethod === "Debit Card"
        )
        {
            if(order.orderStatus === "Cancelled")
            {
                payment.status = "refunded"
                await payment.save()
                throw new ApiError(400, "Order cancelled. Payment failed. Anything deducted will be refunded");
            }
            else
            {
                payment.status = "completed"
                order.isPaid = true
                order.paidAt = new Date()

                await payment.save() // for making changes in actual database
                await order.save()
            }
        }
        else
        {
            if(order.orderStatus === "Delivered")
            {
                payment.status = "completed"
                order.isPaid = true;
                order.paidAt = new Date();
                await payment.save() // for making changes in actual database
                await order.save()
            }
            else if(order.orderStatus === "Cancelled")
            {
                payment.status = "failed"
                await payment.save()
                throw new ApiError(400, "Order cancelled. Payment failed.");
            }
            else
            {
                throw new ApiError(
                    400,
                    "COD payment can only be marked after delivery."
                );
            }
        }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Payment Successfull !!!"
        )
    )

})

const markPaymentAsFailed = asyncHandler(async(req , res) => {
    const {orderId} = req.params
    const {paymentId} = req.params

    if(!mongoose.Types.ObjectId.isValid(orderId))
    {
        throw new ApiError(400 , "Invalid Order ID")
    }

    const order = await Order.findById(orderId)

    if(!order)
    {
        throw new ApiError(404 , "No such Order Exists !!!")
    }

    if(!mongoose.Types.ObjectId.isValid(paymentId))
    {
        throw new ApiError(400 , "Invalid Payment ID")
    }

    const payment = await Payment.findOne({ // O-A & P-A && O-B & P-B  user selects O-A & P-B both exists but inconsistent 
        // so payment corresponding to that particluar order should exist
        _id : paymentId,
        order : orderId
    })

    if(!payment)
    {
        throw new ApiError(404 , "No Such Payment Exists !!!")
    }

    if(order.isPaid && payment.method === "COD" && order.orderStatus === "Delivered") // for cod orders only
    {
        throw new ApiError(400 , "Cash On Delivered Ordered cannot be cancelled !!!")
    }

    if(order.isPaid)
{
    throw new ApiError(400,"Order is already paid.");
}

if(payment.status !== "pending")
{
    throw new ApiError(400,"Only pending payments can be marked as failed.");
}

if(order.orderStatus !== "Processing")
{
    throw new ApiError(
        400,
        "Only processing orders can have failed payments."
    );
}

    order.orderStatus = "Cancelled"
    payment.status = "failed"

    await order.save()
    await payment.save()

    return res
    .status(200)
    .json(
        200,
        payment,
        "Payment marked failed successfully !!!"
    )

})


const markPaymentRefund = asyncHandler(async(req , res) => {
    const {orderId} = req.params
    const {paymentId} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(orderId))
    {
        throw new ApiError(400 , "Invalid Order ID")
    }

    const order = await Order.findById(orderId)

    if(!order)
    {
        throw new ApiError(404 , "No such Order Exists !!!")
    }

    if(!mongoose.Types.ObjectId.isValid(paymentId))
    {
        throw new ApiError(400 , "Invalid Payment ID")
    }

    const payment = await Payment.findOne({ // O-A & P-A && O-B & P-B  user selects O-A & P-B both exists but inconsistent 
        // so payment corresponding to that particluar order should exist
        _id : paymentId,
        order : orderId
    })

    if(!payment)
    {
        throw new ApiError(404 , "No Such Payment Exists !!!")
    }

    if(order.paymentMethod === "COD" )
    {
        throw new ApiError(400 , "No refund for Cash on Delivery products")
    }

    if(payment.status !== "failed" || payment.status !== "refunded")
    {
        
    }

    if(isPaid && order.orderStatus !== "Cancelled")
    {

    }  
})

export {
    createPayment,
    getMyPayment,
    getPaymentById,
    markPaymentCompleted,
    markPaymentAsFailed,
    markPaymentRefund
}