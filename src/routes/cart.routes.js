import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware";
import { 
    addToCart,
    getCart,
    removeCart,
    removeFromCart,
    updateCartItem,
 } from "../controllers/cart.controller";

const router = Router()

router.route("/carts").post(verifyJWT , addToCart)

router.route("/carts/fetch").get(verifyJWT , getCart)

router.route("/carts/:itemId").patch(verifyJWT , updateCartItem)

router.route("/carts/:itemId").delete(verifyJWT , removeFromCart)

router.route("/carts").delete(verifyJWT , removeCart)

export {router}