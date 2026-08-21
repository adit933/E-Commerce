import mongoose , {Schema} from "mongoose"

const cartSchema = new Schema(
    {
        user : {
            type : Schema.Types.ObjectId,
            ref : "User"
        },

        items : [
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
        ]
    },
    {
        timestamps : true
    }
)

export const Cart = mongoose.model("Cart" , cartSchema)