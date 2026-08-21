import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/admin.middleware";
import {
    addToWishlist,
    checkWishList,
    clearWishList,
    getWishlist,
    removeFromWishlist,

 } from "../controllers/wishList.controller";

const router = Router()

router.route("/wishlist/:productId").post(verifyJWT , addToWishlist)

router.route("/wishlist/:productId").delete(verifyJWT , removeFromWishlist)

router.route("/wishlist").get(verifyJWT , getWishlist)

router.route("/wishlist").delete(verifyJWT , clearWishList)

router.route("/wishlist/checked/:productId").patch(verifyJWT , checkWishList)

export {router}