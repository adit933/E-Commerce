import mongoose , {Schema} from "mongoose"

const orderSchema = new Schema(
    {
        user : {
            type : Schema.Types.ObjectId,
            ref : "User",
            required : true
        },

        orderItems : [
            {
                product : {
                    type : Schema.Types.ObjectId,
                    ref : "Product",
                    required : true
                },

                price : {
                    type : Number,
                    required : true,
                    min : 0
                },

                quantity : {
                    type : Number,
                    required : true,
                    min : 1
                }
            }
        ],

        shippingAddress : 
            {
                fullName : {
                    type : String,
                    required : true,
                    trim : true
                },

                phone : {
                    type: String,
                    required: true,
                    match: [/^\+[1-9]\d{1,14}$/, "Please enter a valid phone number"]
                },

                street : {
                    type : String,
                    required : true,
                },

                city : {
                    type : String,
                    required : true
                },

                state : {
                    type : String,
                    required : true
                },

                country : {
                    type : String,
                    required : true
                },

                pincode : {
                    type : String,
                    required : true
                }
            },

            paymentMethod : {
                type : String,
                enum : ["COD" , "UPI" , "Credit Card" , "Debit Card" , "Net Banking"],
                required : true,
                default : "COD"
            },

            paymentStatus : {
                type : Boolean,
                required : true,
                default : false
            },

            itemsPrice : {
                type : Number,
                required : true
            },

            shippingPrice : {
                type : Number,
                default : 0,
                min : 0
            },

            taxPrice : {
                type : Number,
                default : 0,
                min : 0
            },

            totalPrice : {
                type : Number,
                default : 0,
                min : 0
            },

            orderStatus : {
                type : String,
                enum : [
                    "Processing",
                    "Shipped",
                    "Delivered",
                    "Cancelled"
                ],
                default : "Processing"
            },

            deliveredAt : { // time at which delivered
                type : Date
            },

            isPaid : {
                type : Boolean,
                default : false
            },

            paidAt : {
                type : Date
            }
    },
    {
        timestamps : true
    }
)


export const Order = mongoose.model("Order" , orderSchema)