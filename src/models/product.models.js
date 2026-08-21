import mongoose , {Schema} from "mongoose"

const productSchema = new Schema({
    name : {
        type : String,
        required : true,
        trim : true,
    },

    description : {
        type : String,
        required : true,
        trim : true,
        minlength : 20,
        maxlength : 500
    },

    price : {
        type : Number,
        required : true,
        min : 0
    },

    discountPercentage : {
        type : Number,         
        min : 0
    },

    stock : {
        type : Number,
        required : true,
        min : 0
    },

    category : {
        type : Schema.Types.ObjectId,
        ref : "Category",
        required : true
    },

    images : [{ // an array because may have more than one view
        url : {
            type : String,
            default : "https://res.cloudinary.com/dakj3dyp1/image/upload/q_auto/f_auto/v1781596597/images_tluyx5.png"
        },

        public_id : {
            type : String,
            default : "images_tluyx5"
        }
    }],

    brand : {
        type : String,
        required : true,
        trim : true
    },

    rating : {
        type : Number,
        default : 0,
        min : 0,
        max : 5
    },

    numReviews : {
        type : Number,
        default : 0
    },

    isFeatured : {
        type : Boolean,
        default : false
    },

    isActive : {
        type : Boolean,
        default : false
    }
},{
    timestamps : true
})

export const Product = mongoose.model("Product" , productSchema)