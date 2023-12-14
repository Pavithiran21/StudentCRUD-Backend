import express from 'express';
import mongoose from 'mongoose';
import userRoute from './Routes/userRoute.js';
import studentRoute from './Routes/studentRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';


const app = express();
app.use(express.json());

app.use(cors());

dotenv.config();

const URL = process.env.URL;
mongoose.set("strictQuery", false);
mongoose.connect(URL,{
    useNewUrlParser:true,
    useUnifiedTopology: true 
    
},()=>{
    
    console.log("MongoDB is Connected");
});




app.use('/api/users',userRoute);
app.use('/api/student',studentRoute);


const PORT = process.env.PORT || 5002

app.listen(PORT,()=> console.log(`Server running at ${PORT}`));