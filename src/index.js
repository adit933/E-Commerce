import dotenv from "dotenv"
import connectDB from "./db/index.js"
import { app } from "./app.js"
import createAdmin from "./db/createAdmin.js"


dotenv.config({path : "./env"})

connectDB()
.then(() => {
    app.on("error" , (error) => {
        console.log("error : " , error);
        process.exit(1)
    })

     createAdmin() // admin to be created before server
    

    const port = process.env.PORT || 8000
    app.listen(port , () => {
        console.log("Server is Working on port : ", port);
    })
})
.catch((error) => {
    console.log("Mongo DB connection failed try again !!!");
})