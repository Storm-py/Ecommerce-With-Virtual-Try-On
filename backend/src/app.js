import dotenv from "dotenv";

dotenv.config();
import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
  origin: (origin, callback) => {
    
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      'http://localhost:3000',                
      'https://ecommerce-website-self-five.vercel.app',
    ];

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));



app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))
app.use(urlencoded({extended:true}))


import userRouter from './routes/userRoutes.js'
import adminRouter from './routes/adminRoutes.js'

app.use("/api/v1/users",userRouter)
app.use("/api/v1/admin",adminRouter)




export {app}