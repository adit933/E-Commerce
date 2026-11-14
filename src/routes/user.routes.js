import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js"
import { 
    userRegister , 
    loginUser, 
    logOutUser, 
    refreshAccessToken, 
    getCurrentUser,
    getUserById, 
    updateProfile, 
    changePassword, 
    forgotPassword, 
    resetPassword, 
    addAddress, 
    setDefault, 
    getAddress, 
    updateAddress, 
    deleteAddress, 
    getAdminDashBoardStats,
    loginAdmin,
    logOutAdmin,
    getCurrentAdmin} from "../controllers/user.controller.js";
import { verifyJWT , verifyAdminJWT } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";
// import AdminLogin from "../../E-commerce_frontend/src/admin/pages/AdminLoginPage.jsx";

const router = Router()

router.route("/register").post(

    upload.fields([
        {
            name : "avatar",
            maxCount : 1
        }
    ]),
    userRegister
)

router.route("/login").post(loginUser)

router.route("/admin/login").post(loginAdmin)

router.route("/logout").post(verifyJWT , logOutUser)

router.post("/admin/logout", verifyAdminJWT, isAdmin , logOutAdmin);

router.route("/dashBoard").get(verifyAdminJWT , isAdmin , getAdminDashBoardStats)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/user").get(verifyJWT , getCurrentUser)

router.route("/admin").get(verifyAdminJWT, getCurrentAdmin);

router.route("/profile").patch(verifyJWT , updateProfile)

router.route("/password/change").post(verifyJWT , changePassword)

router.route("/password/forgot").post(forgotPassword)

router.route("/password/reset").post(resetPassword)

router.route("/address").post(verifyJWT , addAddress)

router.route("/address/:addressId/default").patch(verifyJWT , setDefault)

router.route("/address").get(verifyJWT , getAddress)

router.route("/address/:addressId").patch(verifyJWT , updateAddress)

router.route("/address/:addressId").delete(verifyJWT , deleteAddress)

router.route("/:userId").get(verifyAdminJWT , isAdmin , getUserById)

export {router}