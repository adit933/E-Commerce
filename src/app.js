import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import {router as cartRouter} from "./routes/cart.routes.js"
import { router as categoryRouter} from "./routes/category.routes.js"
import { router as paymentRouter} from "./routes/payment.routes.js"
import { router as productRouter} from "./routes/product.routes.js"
import { router as reviewRouter} from "./routes/review.routes.js"
import { router as wishlistRouter} from "./routes/wishlist.routes.js"
import { router as userRouter} from "./routes/user.routes.js"
import { router as orderRouter} from "./routes/order.routes.js"

const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json({limit : "16kb"}))

app.use(express.urlencoded({extended : true , limit : "16kb"}))

app.use(express.static("../public"))

app.use(cookieParser())

app.use("/api/v1/users" , userRouter)

app.use("/api/v1/category" , categoryRouter)

app.use("/api/v1/payment" , paymentRouter)

app.use("/api/v1/cart" , cartRouter)

app.use("/api/v1/product" , productRouter)

app.use("/api/v1/review" , reviewRouter)

app.use("/api/v1/wishlist" , wishlistRouter)

app.use("/api/v1/order" , orderRouter)

export { app }