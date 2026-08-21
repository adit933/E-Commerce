import mongoose , {Schema} from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const userSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        index : true,
        minlength : 3,
        maxlength : 20,
        match: /^[a-zA-Z0-9_]+$/ // regex valiation meaning string should begin with numbers digits and underscores and nothing else
    },
    
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // format specifier for email to prevent the invalid emials from entering
    },

    password : {
        type : String,
        required : true,
        minlength : 8,
        trim : true,
        match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/ 
    },

    fullName : {
        type : String,
        required : true,
        trim : true,
        minlength : 2,
        maxlength : 50,
        match : /^[a-zA-Z\s]+$/
    },

    avatar : {
       url : {
            type : String,
            default : "https://res.cloudinary.com/dakj3dyp1/image/upload/q_auto/f_auto/v1781540178/avatardefault_92824_h0qg5l.webp"
       },
       public_id : {
            type : String,
            default : "avatardefault_92824_h0qg5l"
       }
    },

    phoneNumber: {
    type: String,
    required: true,
    match: [/^\+[1-9]\d{1,14}$/, "Please enter a valid phone number"]
    },

    address : [{
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
        },

        isDefault : {
            type : Boolean,
            default : false
        }

    }],

    role : {
        type : String,
        required : true,
        enum : ["user" , "admin"],
        default : "user"
    },

    refreshToken : [{
        type : String,
        createdAt : Date
    }],


    //for forgot password logic
    passwordResetToken : {
        type : String,
        default : undefined
    },

    
    passwordResetExpiry : {
        type : Date,
        default : undefined 
    },

    isVerified : {
        type : Boolean,
        default : null
    }
},
    {
        timestamps : true
   }
)

userSchema.pre("save" , async function(next) { // hashing password

    if(!this.isModified("password"))
        return 

    this.password = await bcrypt.hash(this.password , 10)
    
})

userSchema.methods.isPasswordCorrect = async function(password)
{
    return await bcrypt.compare(password , this.password)
}


userSchema.methods.generateAccessToken = async function(){
    return await jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.username,
            role : this.role
        },

        process.env.ACCESS_TOKEN_SECRET,

        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = async function(){
    return await jwt.sign(
        {
            _id : this._id,
        },

        process.env.REFRESH_TOKEN_SECRET,

        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User" , userSchema)
 
//tokens are remaining