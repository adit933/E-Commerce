import { Router } from "express";
import { verifyJWT , verifyAdminJWT} from "../middleware/auth.middleware.js";
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
 } from "../controllers/order.controller.js";
import { isAdmin } from "../middleware/admin.middleware.js";

const router = Router()

router.route("/orders").post(verifyJWT , createOrder)

router.route("/orders").get(verifyJWT , getMyOrder)

router.route("/orders/:orderId").get(verifyAdminJWT, isAdmin , getOrderById) // to get a specific order of a customer

router.route("/orders/:orderId").patch(verifyJWT , cancelOrder)

router.route("/orders/allOrders").get(verifyAdminJWT , isAdmin , getAllOrders) // to get aLL the orders

router.route("/orders/single/:orderId").get(verifyJWT , getSingleOrder)

router.route("/orders/:orderId").post(verifyAdminJWT , isAdmin , updateOrderStatus)

router.route("/orders/paid/:orderId").post(verifyAdminJWT , isAdmin , markOrderPaid)

router.route("/orders/delivered/:orderId").post(verifyAdminJWT , isAdmin , markOrderDelivered)

router.route("/orders/:orderId").delete(verifyAdminJWT , isAdmin , deleteOrder)

export {router}
