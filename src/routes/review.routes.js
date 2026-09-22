import { Router } from "express";
import { isAdmin } from "../middleware/admin.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { 
    createReview,
    deleteReview,
    getProductReviews,
    updateReview,
 } from "../controllers/review.controller.js";

const router = Router()

router.route("/reviews/:productId").post(verifyJWT , createReview)

router.route("/reviews/:productId").get(getProductReviews)

router.route("/reviews/:productId").post(verifyJWT , updateReview)

router.route("/reviews/:productId").delete(verifyJWT , deleteReview)

export {router}