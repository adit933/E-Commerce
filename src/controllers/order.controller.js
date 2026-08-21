import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { Product } from "../models/product.models.js";
import { Order } from "../models/order.models.js";
import { Cart } from "../models/cart.models.js";
import mongoose from "mongoose";

const SHIPPING_CHARGE = 100;
const FREE_SHIPPING_ABOVE = 1000;
const GST_PERCENTAGE = 18;

const createOrder = asyncHandler(async(req , res) => {
    const userId = req.user?._id

    const fetchedItems = await Cart.findOne(
        {
            user : userId
        }
    )

    if(!fetchedItems)
    {
        throw new ApiError(500 , "Unable to fetch orders !!! ")
    }

    if(fetchedItems.items.length === 0)//to check whether cart is empty i.e no of products in the cart = 0
    {
        throw new ApiError(400 , "The Cart is Empty !!!")
    }

    const getUser = await User.findOne(
        {
            _id : userId
        }
    )

    if(!getUser)
    {
        throw new ApiError(500 , "Unable to fetch User details !!! ")
    }

    const {paymentMethod} = req.body

    if(!paymentMethod)
    {
        throw new ApiError(400 , "Payment is Required !!! ")
    }

    let sum = 0
    fetchedItems.items.forEach(pr => {
        sum = sum +  (pr.price * pr.quantity) 
    })

    const shippingPrice = sum > FREE_SHIPPING_ABOVE ? 0 : SHIPPING_CHARGE

    const taxPrice = Number((sum * GST_PERCENTAGE / 100).toFixed(2));

    const total = Number(sum + (taxPrice) + shippingPrice)

    const addressObject = {}

    getUser.address.forEach(addr => {
        if(addr.isDefault === true)
        {
            addressObject.fullName = getUser.fullName
            addressObject.phone = getUser.phoneNumber
            addressObject.street = addr.street,
            addressObject.city = addr.city,
            addressObject.state = addr.state,
            addressObject.country = addr.country,
            addressObject.pincode = addr.pincode
        }
    })

    //if there is no default address then it will create and error

    if(Object.keys(addressObject).length === 0)
    {
        throw new ApiError(400 , "Default Address not found !!! ")
    }
    

    const createdOrder = await Order.create({
        user : userId,
        orderItems : fetchedItems.items,
        shippingAddress : addressObject,
        paymentMethod : paymentMethod,
        itemsPrice : sum,
        shippingPrice : shippingPrice,
        taxPrice : taxPrice,
        totalPrice : total

    })

    if(!createdOrder)
    {
        throw new ApiError(400 , "Unable to place Order !!! ")
    }

    fetchedItems.items = [] // after the order has been created the cart should be emptied and saved to database

    await fetchedItems.save()

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            createdOrder,
            "Order Created Successfully !!!"
        )
    )
})

const getMyOrder = asyncHandler(async(req , res) => {

    const userId = req.user?._id
    
    const myOrders = await Order.find({
        user : userId
    }).populate("orderItems.product")
    .sort({createdAt : -1})

    let message = ""

    if(myOrders.length === 0)
    {
        message = "Currently No Order"
    }
    else
    {
        message = "Orders fetched Successfully !!! "
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            myOrders,
            message
        )
    )
})

const getOrderById = asyncHandler(async(req , res) => { // for admin

    const {orderId} = req.params

    if(!mongoose.Types.ObjectId.isValid(orderId))
    {
        throw new ApiError(400 , "Invalid Order !!! ")
    }

    const getOrder = await Order.findOne(
        {
            _id : orderId,
        }
    ).populate("user")
    .populate("orderItems.product")

    if(!getOrder)
    {
        throw new ApiError(404 , "No such order found !!! ")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            getOrder,
            "Order Fetched Successfully !!!"
        )
    )
})

const cancelOrder = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const { orderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        throw new ApiError(400, "Invalid Order!!!");
    }

    const order = await Order.findOne({
        _id: orderId,
        user: userId
    });

    if (!order) {
        throw new ApiError(404, "No such Order exists!!!");
    }

    if (order.orderStatus !== "Processing") { // orders in processing status can be cancelled not in any other status
        throw new ApiError(
            400,
            `Order cannot be cancelled because it is ${order.orderStatus}.`
        );
    }

    order.orderStatus = "Cancelled";
    await order.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            order,
            "Order cancelled successfully."
        )
    );
});

const getAllOrders = asyncHandler(async(req , res) => { // for admin to view 20 orders per page from newest order to oldest
    const userId = req.user?._id

    const page = Number(req.query.page) || 1

    const limit = 20

    const skip = (page - 1) * limit

    const allOrders = await Order.find()
    .populate("orderItems.product")
    .populate("user")
    .sort({createdAt : -1})
    .skip(skip)
    .limit(20)

    let message = ""

    if(allOrders.length === 0)
    {
        message = "No Order !!!"
    }
    else
    {
        message = "Orders fetched Successfully !!!"
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            allOrders,
            message
        )
    )
})

const getSingleOrder = asyncHandler(async(req , res) => {
    const userId = req.user?._id
    const {orderId} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(orderId))
    {
        throw new ApiError(400 , "Invalid Order request !!!")
    }

    const singleOrder = await Order.findOne(
        {
            user : userId,
            _id : orderId
        }
    )

    if(!singleOrder)
    {
        throw new ApiError(404 , "No Such Order Exists !!! ")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            singleOrder,
            "Order Fetched Successfully !!!"
        )
    )
})

const updateOrderStatus = asyncHandler(async(req , res) => {

    const {orderId} = req.params
    const {orderStatus} = req.body
    
    if(!mongoose.Types.ObjectId.isValid(orderId))
    {
        throw new ApiError(400 , "Invalid Order Id !!!" )
    }

    if(!orderStatus)
    {
        throw new ApiError(400 , "Order Status Required !!! ")
    }

    if(!(orderStatus === "Processing" || orderStatus === "Shipped" || orderStatus === "Delivered" || orderStatus === "Cancelled"))
    {
        throw new ApiError(400 , "Invalid Order Status !!! ")
    }

    const updatedOrderStatus = await Order.findOne(
        {
            _id : orderId
        }
    )

    if(!updatedOrderStatus)
    {
        throw new ApiError(404 , "No such Order Exists !!! ")
    }

    updatedOrderStatus.orderStatus = orderStatus
    if (orderStatus === "Delivered") {
    updatedOrderStatus.isDelivered = true;
    updatedOrderStatus.deliveredAt = new Date();
}
else {
    updatedOrderStatus.isDelivered = false;
    updatedOrderStatus.deliveredAt = undefined;
}
    await updatedOrderStatus.save()

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            updatedOrderStatus,
            "Order Status Updated Successfully !!!"
        )
    )
})

const markOrderPaid = asyncHandler(async (req , res) => {
    const {orderId} = req.params

    if(!mongoose.Types.ObjectId.isValid(orderId))
    {
        throw new ApiError(400 , "Invalid Object !!! ")
    }

    const order = await Order.findOne(
        {
            _id : orderId
        }
    )

    if(!order)
    {
        throw new ApiError(404 , "Order Not found !!! ")
    }

    if(order.isPaid === true)
    {
        throw new ApiError(400 , "Order already Paid !!! ")
    }

    if(order.paymentMethod === "UPI" || order.paymentMethod === "Net Banking" || order.paymentMethod === "Credit Card" ||
        order.paymentMethod === "Debit Card"
    )
    {
        if(order.orderStatus === "Cancelled")
        {
            throw new ApiError(400, "Order cancelled. Payment failed.");
        }
        else
        {
            order.isPaid = true
            order.paidAt = new Date()
        }
    }
    else
    {
        if(order.orderStatus === "Delivered")
        {
            order.isPaid = true;
            order.paidAt = new Date();
        }
        else if(order.orderStatus === "Cancelled")
        {
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

    await order.save()

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            order,
            "Payment Made Successfully !!! "
        )
    )
})

const markOrderDelivered = asyncHandler(async(req , res) => {

    const {orderId} = req.params

    if(!mongoose.Types.ObjectId.isValid(orderId))
    {
        throw new ApiError(400 , "Invalid Object !!!")
    }

    const order = await Order.findById(orderId)

    if(!order)
    {
        throw new ApiError(404 , "No Such Order Exists !!! ")
    }

    if(order.orderStatus === "Delivered")
    {
        throw new ApiError(400 , "Order Already Delivered !!! ")
    }

    if(order.orderStatus === "Cancelled")
    {
        throw new ApiError(400 , "Order Cancelled !!! . Not Elligible for delivery !!!")
    }

    if(order.orderStatus !== "Shipped")
    {
        throw new ApiError(400 , "Only Shipped Order can be changed to Delivered !!!")
    }

    

        order.orderStatus = "Delivered"
        order.deliveredAt = new Date()

    await order.save()

    return res
    .status(200)
    .json(

        new ApiResponse(
            200,
            order,
            "Order Delivered Successfully !!! "
        )
    )
})

const deleteOrder = asyncHandler(async(req , res) => {
    const {orderId} = req.params

    if(!mongoose.Types.ObjectId.isVallid(orderId))
    {
        throw new ApiError(400 , "Invalid Order !!!")
    }

    const deletedOrder = await Order.findByIdAndDelete(orderId)

    if(!deletedOrder)
    {
        throw new ApiError(404 , "No Such Object Exists !!!")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            deletedOrder,
            "Order Deleted Successfully !!! "
        )
    )
})


export {
    createOrder,
    getMyOrder,
    getOrderById,
    cancelOrder,
    getAllOrders,
    getSingleOrder,
    updateOrderStatus,
    markOrderPaid,
    markOrderDelivered,
    deleteOrder
}