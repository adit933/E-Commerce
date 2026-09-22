import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";
import { 
    createPayment,
    getMyPayment,
    getPaymentById,
    markPaymentAsFailed,
    markPaymentCompleted,
    markPaymentRefund,
 } from "../controllers/payment.controller.js";

const router = Router()

router.route("/payments/:orderId").post(verifyJWT , createPayment)

router.route("/payments").get(verifyJWT , getMyPayment)

router.route("/payments/:orderId").post(verifyJWT , isAdmin , getPaymentById)

router.route("/payments/:orderId/:paymentId/complete").post(verifyJWT , isAdmin , markPaymentCompleted)

router.route("/payments/:orderId/:paymentId/failed").post(verifyJWT , isAdmin , markPaymentAsFailed)

router.route("/payments/:orderId/:paymentId/refund").post(verifyJWT , isAdmin , markPaymentRefund)

export {router}