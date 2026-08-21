//the following is admin middleware it is used for authenticating whther a user who is trying to access admin functionalities 
//is actually an admin or not

import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/AsyncHandler";
   
const isAdmin = asyncHandler((req , res , next) => {

    if(req.user?.role !== "admin")
    {
        throw new ApiError(403 , "Admin Access Required !!!")
    }

    next()
})

export {isAdmin}