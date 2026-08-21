import bcrypt from "bcrypt"
import { User } from "../models/user.models"

const createAdmin = async () => {

    const existingAdmin = await User.findOne({
        role : "admin"
    })

    if(existingAdmin)
    {
        console.log("Admin Already Exists !!!");
        return;
    }

    const admin = await User.create({
        username : process.env.ADMIN_USERNAME,
        email : process.env.ADMIN_EMAIL,
        password : process.env.ADMIN_PASSWORD,
        fullName : process.env.ADMIN_FULLNAME,
        phoneNumber : process.env.ADMIN_PHONE,
        role : "admin"
    })

    if(!admin)
    {
        console.log("Some Error Occured Admin was not Created !!!");
    }

    console.log("Initial Admin Created Successfully !!!");
}

export default createAdmin