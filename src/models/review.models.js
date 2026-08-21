import mongoose , {Schema} from "mongoose"

const reviewSchema = new Schema(
    {
        user : {
            type : Schema.Types.ObjectId,
            ref : "User"
        },

        product : {
            type : Schema.Types.ObjectId,
            ref : "Product",
            required : true
        },

        rating : {
            type : String,
            trim : true,
            min : 1,
            max : 5,
            required : true
        },

        comment : {
            type : String,
            trim : true
        }
    },
    {
        timestamps : true
    }
)

export const Review = mongoose.model("Review" , reviewSchema)