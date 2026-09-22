import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";
import {
    addToWishlist,
    checkWishList,
    clearWishList,
    getWishlist,
    removeFromWishlist,

 } from "../controllers/wishList.controller.js";

const router = Router()

router.route("/wishlist/:productId").post(verifyJWT , addToWishlist)

router.route("/wishlist/:productId").delete(verifyJWT , removeFromWishlist)

router.route("/wishlist").get(verifyJWT , getWishlist)

router.route("/wishlist").delete(verifyJWT , clearWishList)

router.route("/wishlist/checked/:productId").patch(verifyJWT , checkWishList)

export {router}