import mongoose , {Schema} from "mongoose"
import slugify from "slugify"
const categorySchema = new Schema(
    {
        name : {
            type : String,
            unique : true,
            required : true,
            trim : true
        },

        slug : {
            type : String,
            unique : true
        },

        description : {
            type : String,
            required : true,
            trim : true
        },

        isActive : {
            type : Boolean,
            default : true
        }
    },{
        timestamps : true
    }
)

//for better reading of url
categorySchema.pre("save" , async function(next) {
    if(!this.isModified("name"))
        return next()

    this.slug = await slugify(this.name , {
        replacement: '-',  // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: false,      // convert to lower case, defaults to `false`
        strict: false,     // strip special characters except replacement, defaults to `false`
        locale: 'vi',      // language code of the locale to use
        trim: true         // trim leading and trailing replacement chars, defaults to `true`
    })
})

export const Category = mongoose.model("Category" , categorySchema)