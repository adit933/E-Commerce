import { Router } from "express";
import { isAdmin } from "../middleware/admin.middleware";
import { verifyJWT } from "../middleware/auth.middleware";
import { 
    createReview,
    deleteReview,
    getProductReviews,
    updateReview,
 } from "../controllers/review.controller";

const router = Router()

router.route("/reviews/:productId").post(verifyJWT , createReview)

router.route("/reviews/:productId").get(getProductReviews)

router.route("/reviews/:productId").post(verifyJWT , updateReview)

router.route("/reviews/:productId").delete(verifyJWT , deleteReview)

export {router}