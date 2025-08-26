import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import authRouter from './routes/authRoutes.js';
import connectDB from './config/mongodb.js';
import userRouter from "./routes/userRoutes.js";

const app=express();
const port=process.env.Port || 4000
connectDB();

const allowedOrigins=['https://mern-authenticaton-frontend-wgv1.onrender.com']

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins,credentials:true}))
app.use(express.urlencoded({ extended: true }));

//API Endpoints
app.get('/',(req,res)=>res.send("API WORKING FINE"))
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)

app.listen(port, () => console.log(`Server running on port ${port}`));
