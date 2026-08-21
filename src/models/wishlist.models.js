import mongoose , {Schema} from "mongoose"

const wishListSchema = new Schema(
    {
        user : {
            type : Schema.Types.ObjectId,
            ref : "User",
            required : true
        },

        product : {
            type : Schema.Types.ObjectId,
            ref : "Product",
            required : true
        }
    },
    {
        timestamps : true
    }
)

wishListSchema.index( // this is for checking the uniquesness of the the combination of user and product so that duplication does not
    //occur
    {
        user : 1,
        product : 1
    },
    {
        unique : true
    }
)

export const WishList = mongoose.model("WishList" , wishListSchema)