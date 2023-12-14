import mongoose from 'mongoose';
const {Schema} = mongoose;
const StudentSchema = new Schema({
    studentname:{
        type:String,
        require:true
    },
    reg_no:{
        type:Number,
        require:true,
    },
    dob: {
        type: String,
        required: true,
    },
   
    gender:{
        type: String,
        require:true,
        enum:["Male","Female"]
    },

    email:{
        type:String,
        require:true,
    },
    phone:{
        type:Number,
        require:true,
    },
    subject1:{
        type:Number,
        require:true,
    },
    subject2:{
        type:Number,
        require:true,
    },
    subject3:{
        type:Number,
        require:true,
    },
    subject4:{
        type:Number,
        require:true,
    },
    subject5:{
        type:Number,
        require:true,
    },
    Total:{
        type:Number,
    },
    Average:{
        type:Number,
    },
    Result:{
        type:String,
        require:false,
        enum:["Pass","Fail"]
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }, 

});


export default mongoose.model("students",StudentSchema);


