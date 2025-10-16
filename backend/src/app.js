import dotenv from "dotenv";

dotenv.config();
import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const allowedOrigins = process.env.CORS_ORIGIN.split(',');
console.log(allowedOrigins);

const app = express()
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET','POST','PUT','DELETE','PATCH'],
}))


app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))
app.use(urlencoded({extended:true}))


import userRouter from './routes/userRoutes.js'
import adminRouter from './routes/adminRoutes.js'

app.use("/api/v1/users",userRouter)
app.use("/api/v1/admin",adminRouter)




export {app}