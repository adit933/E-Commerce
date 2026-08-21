import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware";
import { 
    cancelOrder,
    createOrder,
    deleteOrder,
    getAllOrders,
    getMyOrder,
    getOrderById,
    getSingleOrder,
    markOrderDelivered,
    markOrderPaid,
    updateOrderStatus,
 } from "../controllers/order.controller";
import { isAdmin } from "../middleware/admin.middleware";

const router = Router()

router.route("/orders").post(verifyJWT , createOrder)

router.route("/orders").get(verifyJWT , getMyOrder)

router.route("/orders/:orderId").get(verifyJWT, isAdmin , getOrderById) // to get a specific order of a customer

router.route("/orders/:orderId").patch(verifyJWT , cancelOrder)

router.route("/orders/allOrders").get(verifyJWT , isAdmin , getAllOrders) // to get aLL the orders

router.route("/orders/single/:orderId").get(verifyJWT , getSingleOrder)

router.route("/orders/:orderId").post(verifyJWT , isAdmin , updateOrderStatus)

router.route("/orders/paid/:orderId").post(verifyJWT , isAdmin , markOrderPaid)

router.route("/orders/delivered/:orderId").post(verifyJWT , isAdmin , markOrderDelivered)

router.route("/orders/:orderId").delete(verifyJWT , isAdmin , deleteOrder)
