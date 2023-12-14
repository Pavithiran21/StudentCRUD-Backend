
import mongoose from 'mongoose';
const {Schema} = mongoose;

const UserSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type: String,
        default:"student",
        enum:["admin","student"],
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isVerified:{
        type:Boolean,
        required: true,
        default: false
    },
  
    activeToken:{
        type:String,
        require:false,
        
    },

    activeExpires:{
        type:Date
    },
    resetToken:{
        type:String,
        require:false,
        
    },
    resetExpires:{
        type:Date
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    },  
},
{
    timestamps: true
});



export default mongoose.model('users', UserSchema);
