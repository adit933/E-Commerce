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
    deleteAddress } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";

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

router.route("/logout").post(verifyJWT , logOutUser)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/user").get(verifyJWT , getCurrentUser)

router.route("/profile").patch(verifyJWT , updateProfile)

router.route("/password/change").post(verifyJWT , changePassword)

router.route("/password/forgot").post(forgotPassword)

router.route("/password/reset").post(resetPassword)

router.route("/address").post(verifyJWT , addAddress)

router.route("/address/:addressId/default").patch(verifyJWT , setDefault)

router.route("/address").get(verifyJWT , getAddress)

router.route("/address/:addressId").patch(verifyJWT , updateAddress)

router.route("/address/:addressId").delete(verifyJWT , deleteAddress)

router.route("/:userId").get(verifyJWT , isAdmin , getUserById)

export {router}