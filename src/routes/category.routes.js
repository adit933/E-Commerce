import { Router } from "express";
import { verifyJWT , verifyAdminJWT} from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";
import { 
    createCategory,
    deleteCategory,
    getAllActiveCategoriesAdmin,
    getAllCategories,
    getAllCategoriesAdmin,
    getCategoryById,
    isActiveCategory,
    searchCategory,
    toggleIsActive,
    updateCategory,
 } from "../controllers/category.controller.js";

const router = Router()

router.route("/category").post(verifyAdminJWT , isAdmin , createCategory)

router.route("/category").get(getAllCategories)

router.route("/admin/category").get(verifyAdminJWT , isAdmin , getAllActiveCategoriesAdmin)

router.route("/admin/categories").get(verifyAdminJWT , isAdmin , getAllCategoriesAdmin)

router.route("/category/search").get(searchCategory)

router.route("/category/isActive").get(isActiveCategory)

router.route("/admin/category/:categoryId").get(verifyAdminJWT , isAdmin , getCategoryById)

router.route("/category/:categoryId").patch(verifyAdminJWT , isAdmin , updateCategory)

router.route("/category/delete/:categoryId").delete(verifyAdminJWT , isAdmin , deleteCategory)

router.route("/category/:categoryId/toggle").patch(verifyAdminJWT , isAdmin , toggleIsActive)



export {router}