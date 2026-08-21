import mongoose , {Schema} from "mongoose"

const paymentSchema = new Schema(
    {
        user : {
            type : Schema.Types.ObjectId,
            ref : "User",
            required : true
        },

        order : {
            type : Schema.Types.ObjectId,
            ref : "Order",
            required : true
        },

        paymentID : {
            type : String,
            required : true,
            unique : true
        },

        status : {
            type : String,
            enum : ["pending", "completed", "failed", "refunded"],
            default : "pending"
        },

        amount : {
            type : Number,
            required : true,
            min : 0
        },

        method : {
            type : String,
            enum : ["COD" , "UPI" , "Credit Card" , "Debit Card" , "Net Banking"],
            required : true
        }
    },
    {
        timestamps : true
    }
)

export const Payment = mongoose.model("Payment" , paymentSchema)