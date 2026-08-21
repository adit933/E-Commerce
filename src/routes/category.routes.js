import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/admin.middleware";
import { 
    createCategory,
    deleteCategory,
    getAllCategories,
    toggleIsActive,
    updateCategory,
 } from "../controllers/category.controller";

const router = Router()

router.route("/category").post(verifyJWT , isAdmin , createCategory)

router.route("/category").get(getAllCategories)

router.route("/category/:categoryId").patch(verifyJWT , isAdmin , updateCategory)

router.route("/category/:categoryId").delete(verifyJWT , isAdmin , deleteCategory)

router.route("/category/:categoryId/toggle").patch(verifyJWT , isAdmin , toggleIsActive)

export {router}