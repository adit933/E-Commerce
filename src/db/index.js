import mongoose from "mongoose"
import { DB_Name } from "../constants.js"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`)
        console.log("Mongo DB database connected Successfully !!!!  DB Host : " , connectionInstance.connection.host);
    } catch (error) {
        console.log("error : " , error);
        process.exit(1)
    }
}

export default connectDB // export like default when your file has simple one task or only one operation to perform and not many