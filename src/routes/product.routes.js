import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
    createProduct,
    deleteProduct,
    filterByCategory,
    filterProducts,
    getAllProducts,
    getAllProductsForAdmin,
    getFeaturedProducts,
    getProductById,
    searchProducts,
    toggleFeaturedProduct,
    toggleIsActive,
    updateProduct,
    } from "../controllers/product.controller.js"

const router = Router()

router.route("/products").get(getAllProducts) // query parameters need not to be mentioned in the router definition
//also no verifyjwt beacuse it constututes the landing page of the website

router.route("/products").post(verifyJWT , isAdmin ,

        upload.fields([{
            name : "image",
            maxCount : 1
        }]),

    createProduct)

router.route("/products/search").get(searchProducts)

router.route("/products/featured").get(getFeaturedProducts)

router.route("/products/filter").get(filterProducts)

router.route("/products/admin").get(verifyJWT , isAdmin , getAllProductsForAdmin)

router.route("/products/category/:categoryId").get(filterByCategory)

router.route("/products/:productId").get(verifyJWT , isAdmin ,getProductById)

router.route("/products/edit/:productId").patch(verifyJWT , isAdmin , 
    
    upload.fields([{
        name : "image",
        maxCount : 1
    }]),
    
    updateProduct)

router.route("/products/:productId").delete(verifyJWT , isAdmin , deleteProduct)

router.route("/products/:productId/featured").patch(verifyJWT , isAdmin , toggleFeaturedProduct)

router.route("/products/:productId/isActive").patch(verifyJWT , isAdmin , toggleIsActive)



export {router}